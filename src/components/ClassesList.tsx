import { useEffect, useState } from "react";
import { supabase } from "../supabase/supabaseClient";
import TimeAgo from "./TimeAgo";

const ClassesList = () => {
  const [classes, setClasses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchClasses = async () => {
      setLoading(true);
      const { data, error } = await supabase.from("classes").select("*");

      if (error) {
        console.error("Error fetching classes:", error.message);
      } else {
        setClasses(data); // Set all classes
      }
      setLoading(false);
    };

    fetchClasses();
  }, []);

  if (loading) return <p>Loading classes...</p>;

  return (
    <div>
      <h1>Classes</h1>
      {classes.length === 0 ? (
        <p>No classes found!</p>
      ) : (
        <ul>
          {classes.map((classItem) => (
            <li key={classItem.id}>
              <strong>{classItem.class_name}</strong>
              <br />
              <span>
                Created: <TimeAgo timestamp={classItem.created_at} />
              </span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ClassesList;
