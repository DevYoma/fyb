import { useEffect, useState } from "react";
// import { supabase } from "../supabaseClient";
import { supabase } from "../../supabase/supabaseClient";

const Dashboard = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      const { data, error } = await supabase.auth.getUser();
      if (error) {
        console.error("Error fetching user:", error.message);
        return;
      }
      setUser(data.user);
    };

    fetchUser();
  }, []);

  return (
    <div>
      <h1>Welcome, {user?.user_metadata?.full_name || "Class Rep"}!</h1>
      <p>Email: {user?.email}</p>
      <p>Role: {user?.user_metadata?.role}</p>
      {/* Other metadata  && class info*/}
    </div>
  );
};

export default Dashboard;
