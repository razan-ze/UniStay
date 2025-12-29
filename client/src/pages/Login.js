
import React from "react"; // Import React
import LoginForm from "../components/LoginForm"; // Import LoginForm component
import { Footer } from "../components/Footer"; // Import Footer


const Login = () => {
  return (
    <div  >
     
        <LoginForm /> {/* Render login form */}
    
      <Footer /> {/* Footer at the bottom */}
    </div>
  );
};

export default Login; // Export LoginPage
