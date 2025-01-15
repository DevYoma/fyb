type Prop = {
    onNext: () => void;
}

import { useState } from "react";

const ClassCodeEntry = ({ onNext }: Prop) => {
  const [classCode, setClassCode] = useState("");

  const handleNext = (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    if (classCode.trim()) {
      // Assume validation is successful for now
      onNext(); 
    } else {
      alert("Please enter a valid class code.");
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
      <button type="submit">Next</button>
    </form>
  );
};

export default ClassCodeEntry;
