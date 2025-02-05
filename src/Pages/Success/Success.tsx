import { useEffect } from "react";
import { useNavigate } from "react-router";

const Success = () => {
  const navigate = useNavigate();   

  useEffect(() => {
    // Redirect after 3 seconds
    const timer = setTimeout(() => {
      navigate("/class-dashboard");
    }, 3000);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="success-container">
      <h1>🎉 Registration Successful!</h1>
      <p>Redirecting you to your Class Dashboard...</p>
    </div>
  );
};

export default Success;
