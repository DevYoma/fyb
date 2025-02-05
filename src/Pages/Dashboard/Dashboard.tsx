import { useEffect, useState } from "react";
import { supabase } from "../../supabase/supabaseClient";
import { useAuth } from "../../Context/AuthContext";
import QuestionForm from "../../components/QuestionForm";
import { User } from '@supabase/supabase-js';

const Dashboard = () => {
  
  const [user, setUser] = useState<User | null>(null);
  const [classes, setClasses] = useState([]);
  const [classId, setClassId] = useState<string | null>(null);
  const { signOut } = useAuth();

  useEffect(() => {
    const fetchUser = async () => {
      const { data, error } = await supabase.auth.getUser();
      if (error) {
        console.error("Error fetching user:", error.message);
        return;
      }

      // Fetch classId from user's classes table
      const { data: classesTable, error: classesTableError } = await supabase
        .from("classes")
        .select("id")
        .eq("admin_id", data.user.id) // this works 
        .single(); // remove when admin can have multiple classes

        // console.log(typeof classesTable?.id);

      if (classesTableError) {
        console.error("Error fetching profile:", classesTableError);
        return;
      }

        setClassId(classesTable.id);

      setUser(data.user);
    };

    fetchUser();
  }, []);

  // console.log(user?.id)

  // Fetch the classes associated with the logged-in user
  useEffect(() => {
    if (user) {
      const fetchClasses = async () => {
        const { data, error } = await supabase
          .from("classes")
          .select("*")
          .eq("admin_id", user.id);

        if (error) {
          console.error("Error fetching classes:", error.message);
          return;
        }
        setClasses(data || []);
      };

      fetchClasses();
    }
  }, [user]);

  // console.log(classes);

  return (
    <div>
      <h1>Welcome, {user?.user_metadata?.full_name || "Class Rep"}!</h1>
      <p>Email: {user?.email}</p>
      <p>Role: {user?.user_metadata?.role}</p>
      {/* Other metadata  && class info*/}

      {/* Class Details */}
      <h2>Your Classes</h2>
      {classes.length > 0 ? (
        <ul>
          {classes.map((cls) => (
            <li key={cls.id}>
              <h3>{cls.class_name}</h3>
              <p>Session: {cls.session}</p>
              <p>School: {cls.school}</p>
              <p>Created: {new Date(cls.created_at).toLocaleString()}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>
          No classes created yet. Use the "Create New Class" button to get
          started!
        </p>
      )}

      {/* Create New Class Button */}
      {/* <button onClick={() => console.log("Open modal to create a new class")}>
        Create New Class
      </button> */}

      <button onClick={() => alert("Set Questions")}>Set Questions</button>

      {/* work on the above functionality ☝️ */}

      <button onClick={signOut}>Log Out</button>

      <QuestionForm classId={classId} />
    </div>
  );
};

export default Dashboard;
