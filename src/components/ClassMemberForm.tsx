import { useEffect, useState } from "react";
import { supabase } from "../supabase/supabaseClient";

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
  const savedClassName = sessionStorage.getItem("className");
  const classCode = sessionStorage.getItem("classCode")
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
  // const [form, setForm] = useState<Partial<FormData>>(initailFormData);

  const [form, setForm] = useState<Record<string, string>>({}); 
  const [questions, setQuestions] = useState<string[]>([]); 

  // console.log(form);

  // const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   const { name, value } = e.target;
  //   setForm((prev) => ({ ...prev, [name]: value }));
  // };

  // const handleSubmit = (e: React.FormEvent) => {
  //   e.preventDefault();
  //   console.log(form);
  //   onNext(form as FormData);
  // };

  useEffect(() => {
    const fetchQuestions = async () => {
      if (!classCode) return;

      try {
        // Fetch classId using classCode
        const { data: classData, error: classError } = await supabase
          .from("classes")
          .select("id")
          .eq("class_code", classCode)
          .single();

        if (classError || !classData) throw new Error("Class not found");

        const classId = classData.id;
        // console.log(classId)

        // Fetch questions based on classId from the 'questions' table
        const { data: questionsData, error: questionsError } = await supabase
          .from("questions") // Assuming 'questions' is the correct table name
          .select("*") // Fetch all columns of the questions
          .eq("class_id", classId); // Filter by class_id

        if (questionsError) throw questionsError;
        // console.log(questionsData)

        // Prepare the questions list
        const questionList = questionsData.map((q) => q.question_text); // Assuming the column name is 'question_text'
        setQuestions(questionList);

        // Initialize form state
        const initialFormState: Record<string, string> = {};
        questionList.forEach((q) => {
          initialFormState[q] = "";
        });
        setForm(initialFormState);
      } catch (error) {
        console.error("Error fetching questions:", error);
      }
    };

    fetchQuestions();
  }, [classCode]);

  const handleChange = () => {

  }

  console.log(questions)

  return (
    <form>
      <h1>{savedClassName}</h1>
      <h3>Fill Your Details</h3>
      {/* <input
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
      /> */}



      {questions.map((q, index) => (
        <div key={index}>
          <label>{q.question_text} d</label>
          <input
            name={q.question_text}
            type={q.question_type}
            placeholder={q.question_text}
            value={form[q.question_text] || ""}
            onChange={handleChange}
          />
        </div>
      ))}
      <button type="submit">Next</button>
    </form>
  );
};

export default ClassMemberForm;
