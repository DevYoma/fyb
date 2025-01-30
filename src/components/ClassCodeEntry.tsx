type Prop = {
  onNext: () => void;
}

import { useState } from "react";
import { supabase } from "../supabase/supabaseClient"

const ClassCodeEntry =  ({ onNext }: Prop) => {
  const [classCode, setClassCode] = useState("");
  // const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleNext = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from("classes")
        .select("class_code, class_name")
        .eq("class_code", classCode.trim())
        .single();

        console.log(classCode);
        console.log("Class details", data)
        // return data

      if (error) {
        setLoading(false);
        console.error("Error fetching class details", error.message); 
        // setError("Invalid class code")
        alert("Invalid class code");
        return;
      }

      // Save the classCode and className to sessionStorage
      sessionStorage.setItem("classCode", data.class_code);
      sessionStorage.setItem("className", data.class_name);

      onNext();
    } catch (error) {
      setLoading(false);
      console.error("Unexpected error:", error);
      // setError("Something went wrong, please try again later.");
    }finally{
      setLoading(false)
    }
  };

  return (
    <form onSubmit={handleNext}>
      <h1>Enter Class Code</h1>
      <input
        type="text"
        placeholder="Class Code"
        value={classCode}
        onChange={(e) => setClassCode(e.target.value)}
        required
      />
      <button type="submit">{loading ? "Loading..." : "Next"}</button>
    </form>
  );
};

export default ClassCodeEntry;
