const express = require("express");
const mysql = require("mysql");
const cors = require("cors");
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const db=require("./config/database");

const app = express();
const port = process.env.PORT || 5000;


app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.json({
    message: "UniStay API is running 🚀",
    version: "1.0.0",
    endpoints: {
      auth: {
        signup: "POST /signup",
        login: "POST /login"
      },
      dorms: {
        getAll: "GET /dorms",
        getOne: "GET /dorm/:id",
        add: "POST /addDorm",
        delete: "DELETE /dorms/:id",
        byOwner: "GET /dorms/owner/:owner_id",
        search: "GET /dorms/search?q="
      },
      favorites: {
        add: "POST /addFavorite",
        getByUser: "GET /favorites/:userId"
      }
    }
  });
});

// ================= MULTER =================

const storage = multer.diskStorage({
 destination: (req, file, cb) => {
  cb(null,'uploads/dorms/');
},
  filename: (req, file, cb) => {
    cb(null, file.originalname + "_" + Date.now() + path.extname(file.originalname));
  }
});
const upload = multer({ storage: storage });

// Serve static files from uploads
app.use("/uploads", express.static(path.join(__dirname, "uploads")));


// ================= AUTH ===========================

// SIGNUP
app.post("/signup", (req, res) => {
  const { username, password, address, phone, role } = req.body;

  // Check if username already exists
  const checkQuery = "SELECT id FROM users WHERE username = ?";
  db.query(checkQuery, [username], (err, data) => {
    if (err) return res.status(500).json(err);

    if (data.length > 0) {
      return res.status(400).json({
        success: false,
        message: "Username already exists"
      });
    }

    // Insert new user if username is unique
    const insertQuery =
      "INSERT INTO users (username, password, address, phone, role) VALUES (?,?,?,?,?)";

    db.query(insertQuery, [username, password, address, phone, role], (err, result) => {
      if (err) return res.status(500).json(err);

      res.json({
        success: true,
        user: {
          id: result.insertId,
          username,
          address,
          phone,
          role,
        },
      });
    });
  });
});


// LOGIN
app.post("/login", (req, res) => {
  const { username, password, role } = req.body; // role sent from frontend

  const q = "SELECT id, username, address, phone, role FROM users WHERE username = ? AND password = ? AND role = ?";

  db.query(q, [username, password, role], (err, data) => {
    if (err) return res.status(500).json(err);

    if (data.length === 0) {
      return res.status(401).json({
        success: false,
        message: "Invalid credentials or role",
      });
    }

    res.json({
      success: true,
      user: data[0], // contains id, username, address, phone, role
    });
  });
});



// ================= DORMS ==========================

app.post("/addDorm", upload.array("images", 10), (req, res) => {
  const owner_id = Number(req.body.owner_id);

  if (!owner_id) {
    return res.status(400).json({
      success: false,
      message: "Owner ID is missing or invalid",
    });
  }

  console.log("Owner ID received:", owner_id);

  const {
    name,
    university,
    city,
    price,
    feature1,
    feature2,
    feature3,
    distance_to_university,
    telephone,
  } = req.body;

  const images = req.files
  ? req.files.map(file => `uploads/dorms/${file.filename}`).join(",")
  : null;

  const q = `
    INSERT INTO dorms
    (name, university, city, price,
     feature1, feature2, feature3,
     distance_to_university, images,
     telephone, owner_id)
    VALUES (?,?,?,?,?,?,?,?,?,?,?)
  `;

  db.query(
    q,
    [
      name,
      university,
      city,
      price,
      feature1,
      feature2,
      feature3,
      distance_to_university,
      images,
      telephone,
      owner_id
    ],
    (err, result) => {
      if (err) return res.status(500).json(err);

      res.json({
        success: true,
        dormId: result.insertId,
      });
    }
  );
});


// GET ALL DORMS
app.get("/dorms", (req, res) => {
  const q = "SELECT * FROM dorms";
  db.query(q, (err, data) => {
    if (err) return res.json(err);

    // Convert images to base64
    data.forEach(d => {
      if (d.images) {
        const filenames = d.images.split(",");
        const base64Images = filenames.map(filename => {
          const imagePath = path.join(__dirname, filename);
          if (fs.existsSync(imagePath)) {
            return fs.readFileSync(imagePath).toString('base64');
          } else {
            return null;
          }
        });
        d.images = base64Images;
      } else {
        d.images = [];
      }
    });

    return res.json(data);
  });
});

// GET SINGLE DORM (Detail Page)
app.get("/dorm/:id", (req, res) => {
  const id = req.params.id;
  const q = "SELECT * FROM dorms WHERE id = ?";
  db.query(q, [id], (err, data) => {
    if (err) return res.json(err);

    if (data.length > 0 && data[0].images) {
      const files = data[0].images.split(",");
      data[0].images = files.map(filename => {
        const imagePath = path.join(__dirname, filename);
        if (fs.existsSync(imagePath)) {
          return fs.readFileSync(imagePath).toString("base64");
        } else {
          return null;
        }
      });
    }

    res.json(data[0] || null);
  });
});

// DELETE DORM
app.delete("/dorms/:id", (req, res) => {
  const id = req.params.id;
  const getImages = "SELECT images FROM dorms WHERE id = ?";
  db.query(getImages, [id], (err, result) => {
    if (err) return res.json(err);

    let filenames = [];
    if (result.length > 0 && result[0].images) {
      filenames = result[0].images.split(",");
    }

    const del = "DELETE FROM dorms WHERE id = ?";
    db.query(del, [id], (err2) => {
      if (err2) return res.json(err2);

      // DELETE FILES
      filenames.forEach(filename => {
        const filePath = path.join(__dirname, filename);
        if (fs.existsSync(filePath)) {
          try { fs.unlinkSync(filePath); } catch (e) { console.error(e); }
        }
      });

      res.json("Dorm deleted");
    });
  });
});

// GET DORMS BY OWNER
app.get("/dorms/owner/:owner_id", (req, res) => {
  // Convert owner_id to number
  const ownerId = Number(req.params.owner_id);

  const q = "SELECT * FROM dorms WHERE owner_id = ?";
  db.query(q, [ownerId], (err, data) => {
    if (err) return res.status(500).json(err);

    // Convert images to Base64
    const formattedData = data.map(d => {
      if (d.images) {
        const filenames = d.images.split(",");
        d.images = filenames.map(filename => {
          const imagePath = path.join(__dirname, filename);
          return fs.existsSync(imagePath)
            ? fs.readFileSync(imagePath).toString("base64")
            : null;
        });
      } else {
        d.images = [];
      }
      return d;
    });

    return res.json(formattedData);
  });
});


// ================= FAVORITES ======================

// ADD FAVORITE
app.post("/addFavorite", (req, res) => {
  const { user_id, dorm_id } = req.body;
  const q = "INSERT INTO favorites (user_id,dorm_id) VALUES (?,?)";
  db.query(q, [user_id, dorm_id], (err) => {
    if (err) return res.json(err);
    res.json("Added to favorites");
  });
});
// GET FAVORITES BY USER (only first image)
app.get("/favorites/:userId", (req, res) => {
  const q = `
    SELECT dorms.*
    FROM dorms
    JOIN favorites ON dorms.id = favorites.dorm_id
    WHERE favorites.user_id = ?
  `;

  db.query(q, [req.params.userId], (err, data) => {
    if (err) return res.json(err);

    data.forEach(d => {
      if (d.images) {
        const firstFilename = d.images.split(",")[0];
        const imagePath = path.join(__dirname, firstFilename);
        if (fs.existsSync(imagePath)) {
          const base64Img = fs.readFileSync(imagePath).toString("base64");
          d.images = [`data:image/jpeg;base64,${base64Img}`]; // ✅ add data URL prefix
        } else {
          d.images = [];
        }
      } else {
        d.images = [];
      }
    });

    res.json(data);
  });
});


//-----------------------------------------------
//search api
// GET dorms by search query
app.get("/dorms/search", (req, res) => {
  const { q } = req.query; // ?q=someQuery
  const searchQuery = `%${q}%`;

  const sql = `
    SELECT * FROM dorms
    WHERE name LIKE ? OR city LIKE ? OR university LIKE ?
  `;

  db.query(sql, [searchQuery, searchQuery, searchQuery], (err, data) => {
    if (err) return res.status(500).json(err);

    data.forEach(d => {
      if (d.images) {
        const firstFilename = d.images.split(",")[0];
        const imagePath = path.join(__dirname, firstFilename);
        d.images = fs.existsSync(imagePath)
          ? [`data:image/jpeg;base64,${fs.readFileSync(imagePath).toString("base64")}`]
          : [];
      } else {
        d.images = [];
      }
    });

    res.json(data);
  });
});



// UPDATE USER
app.put("/users/:id", (req, res) => {
  const userId = req.params.id;
  const { address, phone } = req.body;

  const q = "UPDATE users SET address = ?, phone = ? WHERE id = ?";
  db.query(q, [address, phone, userId], (err) => {
    if (err) return res.status(500).json(err);

    // Return updated user
    const selectQ = "SELECT id, username, address, phone, role FROM users WHERE id = ?";
    db.query(selectQ, [userId], (err2, data) => {
      if (err2) return res.status(500).json(err2);
      res.json(data[0]);
    });
  });
});

// ================= SERVER =========================
app.listen(port, () => {
  console.log("Server running on port " + port);
});
