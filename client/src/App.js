import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Landing from "./pages/Landing";
import { StudentDashboard } from "./pages/student/StudentDashboard.js";
import { DormDetails } from "./pages/student/DormDetails.js";
import OwnerDashboard from './pages/owner/OwnerDashboard.js';
import { DormProviders } from "./context/students/DormContext.js";
import Login from './pages/Login.js';
import Signup from './pages/Signup.js';
import { AuthProvider } from "./context/AuthContext";
import { RoleProvider } from "./context/RoleContext";
import ViewProfile from "./pages/owner/profile/ViewProfile";
import EditProfile from "./pages/owner/profile/EditProfile";
import ViewStudentProfile from "./pages/student/profile/ViewStudentProfile";
import EditStudentProfile from "./pages/student/profile/EditStudentProfile";
import { Favorites } from "./pages/student/Favorites.js";
import { SearchResults } from "./components/students/SearchBarResult.js";
import AddDormForm from "./components/owner/AddDormForm.js";


const App = () => {


  return (
    <Router>
  
      <AuthProvider>
        <RoleProvider>
            <DormProviders>

              <Routes>
                <Route path="/" element={<Landing />} />
                <Route path="/student-dashboard" element={<StudentDashboard />} />
                <Route path="/dorm-details/:id" element={<DormDetails />} />
                <Route path="/favorites" element={<Favorites />} />
                <Route path="/search" element={<SearchResults />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
                 <Route path="/studentprofile" element={< ViewStudentProfile/>} />
                 <Route path="/editstudentprofile" element={<EditStudentProfile />} />
                <Route path="/owner-dashboard" element={<OwnerDashboard />} />
                <Route path="/add-dorm-form" element={<AddDormForm />} />
                <Route path="/profile" element={<ViewProfile />} />
                <Route path="/edit-profile" element={<EditProfile />} />


              </Routes>

            </DormProviders>
        </RoleProvider>
      </AuthProvider>
    </Router>
  );
}


export default App;
