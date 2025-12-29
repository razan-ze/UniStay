import React from "react"
import '../styles/Footer.css';
export const Footer=()=>{
   return(
  <footer className="footer text-center py-3">
        {/* // text-center: center text
        // py-3: vertical padding */}
        <p className="mb-0 text-muted">
          © {new Date().getFullYear()} <span className="text-olive fw-semibold">UniStay</span> | Smart Dorm Living
          {/* // mb-0: remove bottom margin
          // text-muted: gray text
          // text-olive + fw-semibold: custom green + semi-bold */}
        </p>
      </footer>
   );
}
