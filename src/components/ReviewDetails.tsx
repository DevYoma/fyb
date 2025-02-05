import { useState } from "react";
import { supabase } from "../supabase/supabaseClient";
import { useNavigate } from "react-router";

type Props = {
  onSubmit: () => void;
  onEdit: () => void;
}

const ReviewDetails = ({ onEdit }: Props) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const formSessionData = sessionStorage.getItem("classMemberFormData");
  const parsedData = formSessionData ? JSON.parse(formSessionData) : {};
  // console.log(parsedData);

  const classId = sessionStorage.getItem("classId");

  const { name, email, ...responses } = parsedData;
  console.log(name, email, classId, responses);


  const onhandleSubmit = async() => {
    console.log("testing testing");
    try {
      setLoading(true);
      // Insert into Supabase
      const { error } = await supabase.from("class_members").insert([
        {
          name,
          email,
          class_id: classId,
          responses, // Stored as JSONB
        },
      ]);
      if (error) throw error;
      alert("Registration successful!");
      sessionStorage.clear();
      navigate("/success")  
    } catch (error) {
      console.log("Error submitting form", error);
      setLoading(false)
    }finally{
      setLoading(false);
    }
  }
  
  return (
    <div>
      <h1>Review Your Details</h1>
      <ul>  
        {Object.entries(parsedData).map(([key, value]) => (
          <li key={key}>
            <strong>{key}:</strong> {value}
          </li>
        ))}
      </ul>
      <button onClick={onEdit}>Edit</button>
      <button onClick={onhandleSubmit}>{loading ? "Loading..." : "Submit"}  </button>
    </div>
  );
};

export default ReviewDetails;
