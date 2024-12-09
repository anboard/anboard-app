import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Unauthorized: React.FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/auth/login"); // Replace '/login' with the correct path for your login page
    }, 2000); // 2000ms = 2 seconds

    // Cleanup the timer in case the component unmounts before the timeout is completed
    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <center>
      <div>
        <h1>403 - Unauthorized</h1>
        <p>You do not have permission to access this page.</p>
      </div>
    </center>
  );
};

export default Unauthorized;
