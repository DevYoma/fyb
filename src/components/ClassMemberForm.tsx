import { useState } from "react";

type Prop = {
  onNext: (data?: unknown) => void;
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

const ClassMemberForm = ({ onNext }: Prop) => {
  // Retrieve form data from sessionStorage (if available);
  const savedFormData = sessionStorage.getItem("formData");
  const initailFormData = savedFormData ? JSON.parse(savedFormData) : {
    name: "",
    state: "",
    dob: "",
    favCourse: "",
    worstCourse: "",
    quote: "",
    bestLevel: "",
    hardestLevel: "", 
  }
  const [form, setForm] = useState<Partial<FormData>>(initailFormData);

  // console.log(form);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(form);
    onNext(form as FormData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <h1>Fill Your Details</h1>
      <input
        name="name"
        type="text"
        placeholder="Name"
        value={form.name}
        onChange={handleChange}
      />
      <input
        name="state"
        type="text"
        placeholder="State"
        value={form.state}
        onChange={handleChange}
      />
      <input name="dob" type="date" onChange={handleChange} value={form.dob}/>
      <input
        name="favCourse"
        type="text"
        placeholder="Favorite Course"
        value={form.favCourse}
        onChange={handleChange}
      />
      <input
        name="worstCourse"
        type="text"
        placeholder="Worst Course"
        value={form.worstCourse}
        onChange={handleChange}
      />
      <input
        name="quote"
        type="text"
        placeholder="Quote/Mantra"
        value={form.quote}
        onChange={handleChange}
      />
      <input
        name="bestLevel"
        type="text"
        placeholder="Best Level"
        value={form.bestLevel}
        onChange={handleChange}
      />
      <input
        name="hardestLevel"
        type="text"
        placeholder="Hardest Level"
        value={form.hardestLevel}
        onChange={handleChange}
      />
      <button type="submit">Next</button>
    </form>
  );
};

export default ClassMemberForm;
