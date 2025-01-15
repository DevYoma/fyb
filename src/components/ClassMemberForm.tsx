type Prop = {
  onNext: (data?: any) => void;
};
  
export type FormData = {
  name: string;
  state: string;
  dob: string;
  favCourse: string;
  worstCourse: string;
  quote: string;
  bestLevel: string;
  hardestLevel: string;
}

import { useState } from "react";

const ClassMemberForm = ({ onNext }: Prop) => {
  const [form, setForm] = useState<FormData | any>({
    name: "",
    state: "",
    dob: "",
    favCourse: "",
    worstCourse: "",
    quote: "",
    bestLevel: "",
    hardestLevel: "",
  });

  console.log(form);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onNext();
  };

  return (
    <form onSubmit={handleSubmit}>
      <h1>Fill Your Details</h1>
      <input
        name="name"
        type="text"
        placeholder="Name"
        onChange={handleChange}
      />
      <input
        name="state"
        type="text"
        placeholder="State"
        onChange={handleChange}
      />
      <input name="dob" type="date" onChange={handleChange} />
      <input
        name="favCourse"
        type="text"
        placeholder="Favorite Course"
        onChange={handleChange}
      />
      <input
        name="worstCourse"
        type="text"
        placeholder="Worst Course"
        onChange={handleChange}
      />
      <input
        name="quote"
        type="text"
        placeholder="Quote/Mantra"
        onChange={handleChange}
      />
      <input
        name="bestLevel"
        type="text"
        placeholder="Best Level"
        onChange={handleChange}
      />
      <input
        name="hardestLevel"
        type="text"
        placeholder="Hardest Level"
        onChange={handleChange}
      />
      <button type="submit">Next</button>
    </form>
  );
};

export default ClassMemberForm;
