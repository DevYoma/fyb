import React, { useEffect, useState } from "react";
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
  // const savedFormData = sessionStorage.getItem("formData"); >>>>>> might come back to use this
  const savedFormData = sessionStorage.getItem("classMemberFormData");
  const parsedFormData = savedFormData ? JSON.parse(savedFormData) : {};
  const savedClassName = sessionStorage.getItem("className");
  const classCode = sessionStorage.getItem("classCode")
  // console.log(classCode);

  const [form, setForm] = useState<Record<string, string>>({}); 
  const [questions, setQuestions] = useState<string[]>([]); 


  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev, 
      [name]: value
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!classCode) return alert("Class code is missing!"); 

    try {
      // Fetch classId using classCode
      const { data: classData, error: classError } = await supabase
        .from("classes")
        .select("id")
        .eq("class_code", classCode)
        .single();

      if (classError || !classData) throw new Error("Class not found");

      const classId = classData.id;

      // Separate form data into name, email, and responses
      const { name, email, ...responses } = form;

      console.log("Dynamic Details>>>>>", responses);
      sessionStorage.setItem("classMemberFormData", JSON.stringify(form));

      onNext(); 

      // // Insert into Supabase
      // const { error } = await supabase.from("class_members").insert([
      //   {
      //     name,
      //     email,
      //     class_id: classId,
      //     responses, // Stored as JSONB
      //   },
      // ]);

      // if (error) throw error;

      // alert("Registration successful!");
    } catch (error) {
       console.error("Error submitting form:", error);
    }

    console.log("Form Response", form)
  }
  console.log("Saved form Response", savedFormData)

  // USEEFFECT TO CHECK IF FORMDATA HAS BEEN SAVED BEFORE(USER ON HANDLEEDIT)
  useEffect(() => {
    if(savedFormData){
      setForm(JSON.parse(savedFormData))
    }
  }, [])

  // USEEFFECT TO FETCH QUESTIONS
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
        const questionList = questionsData.map((q) => q); // Assuming the column name is 'question_text'
        setQuestions(questionList);

        // Initialize form state
        let initialFormState: Record<string, string> = {
          // email: "", 
          // name: "" // making each class question have name and email fields (not dynamic)
        };

         if (parsedFormData) {
           // If user is returning from ReviewDetails, use parsedFormData
           initialFormState = {
             email: parsedFormData.email || "",
             name: parsedFormData.name || "",
           };

           // Add dynamic fields from parsedFormData
           Object.keys(parsedFormData).forEach((key) => {
             if (key !== "name" && key !== "email") {
               initialFormState[key] = parsedFormData[key];
             }
           });
         } else {
           // Otherwise, initialize empty form fields
           initialFormState = {
             email: "",
             name: "",
           };

           // Add empty fields for dynamic questions
           questionList.forEach((q) => {
             initialFormState[q.question_text] = "";
           });
         }

        questionList.forEach((q) => {
          initialFormState[q.question_text] = "";
        });
        setForm(initialFormState);
      } catch (error) {
        console.error("Error fetching questions:", error);
      }
    };

    fetchQuestions();
  }, [classCode]);

  // console.log(questions) >>>>>>>>>>>>>>>>>>>>>>>

  return (
    <form onSubmit={handleSubmit}>
      <h1>{savedClassName}</h1>
      <h3>Fill Your Details</h3>
      <div>
        <label htmlFor="name">Name</label>
        <input
          type="text"
          name="name"
          placeholder="Enter your Name"
          value={parsedFormData ? parsedFormData.name : ""}
          onChange={handleChange}
        />
      </div>
      <div>
        <label htmlFor="email">Email</label>
        <input
          type="email"
          name="email"
          placeholder="Enter your email"
          value={parsedFormData ? parsedFormData.email : ""}
          onChange={handleChange}
        />
      </div>
      {/* NB: NAME AND EMAIL SHOULD BE STATIC cuz all classes need this */}
      {questions.map((q, index) => (
        <div key={index}>
          <label>{q.question_text}</label>
          {q.question_type === "radio" && q.options ? (
            q.options.map((option: string) => (
              <div key={option}>
                <input
                  type="radio"
                  name={q.question_text}
                  value={option}
                  checked={(parsedFormData[q.question_text] || form[q.question_text]) === option}
                  onChange={handleChange}
                />
                <label>{option}</label>
              </div>
            ))
          ) : q.question_type === "select" && q.options ? (
            <select
              name={q.question_text}
              value={parsedFormData[q.question_text] || form[q.question_text] || ""}
              onChange={handleChange}
            >
              <option value="">Select an option</option>
              {q.options.map((option: string) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          ) : (
            <input
              name={q.question_text}
              type={q.question_type}
              placeholder={q.question_text}
              value={parsedFormData[q.question_text] || form[q.question_text] || ""}
              onChange={handleChange}
            />
          )}
        </div>
      ))}
      <button type="submit">Join Class</button>
    </form>
  );
};

export default ClassMemberForm;
