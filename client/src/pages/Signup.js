
import React from "react"; // Import React
import SignupForm from "../components/Signupform"; // Import SignupForm component
import { Footer } from "../components/Footer"; // Import Footer


const Signup = () => {
  return (
    <div>
 

        <SignupForm /> {/* Render signup form */}
  
      <Footer /> {/* Footer at the bottom */}
    </div>
  );
};

export default Signup; // Export SignupPage