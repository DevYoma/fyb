import { useState } from "react"
import { supabase } from "../../supabase/supabaseClient";
import { useNavigate, Navigate } from "react-router"; 
import { useAuth } from "../../Context/AuthContext";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  
  const navigate = useNavigate();
  const { user } = useAuth();

  if (user) return <Navigate to="/dashboard" replace/>

  const handleLogin = async (e: React.FormEvent) => {
  e.preventDefault();
  setLoading(true);

  try {
    const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
      email: email.trim(),
      password,
    });

    console.log(authData);

    if (authError) throw authError;

    alert("Login successful!");
    navigate("/dashboard"); // Route to the dashboard upon successful login
  } catch (error) {
    alert(`Error: ${error.message}`);
    console.log(error)
  } finally {
    setLoading(false);
  }
};


  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <label>
          Email:
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)}/>
        </label>
        <br />
        <label>
          Password:
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)}/>
        </label>
        <br />
        <button type="submit">{loading ? "Loading..." : "Log In"}</button>
      </form>
    </div>
  );
}

export default Login