import { useNavigate } from "react-router";

const Register = () => {
  const navigate = useNavigate();

  return (
    <div className="register-role-selection">
      <h1>Register</h1>
      <p>Choose your role to get started:</p>
      <div className="role-buttons">
        <button onClick={() => navigate("/register/class-rep")}>
          Register as Class Representative
        </button>
        <button onClick={() => navigate("/register/class-member")}>
          Register as Class Member
        </button>
      </div>
    </div>
  );
};

export default Register;
