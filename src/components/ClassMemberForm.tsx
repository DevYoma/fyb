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
    const [loading, setLoading] = useState(false);
    const [form, setForm] = useState<Record<string, string>>({});
    const [questions, setQuestions] = useState<string[]>([]);

    const classCode = sessionStorage.getItem("classCode");
    const savedClassName = sessionStorage.getItem("className");
    const savedFormData = sessionStorage.getItem("classMemberFormData");
    const parsedFormData = savedFormData ? JSON.parse(savedFormData) : {};
    // console.log(classCode);

    const handleChange = (
      e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
    ) => {
      const { name, value } = e.target;
      setForm((prev) => ({
        ...prev,
        [name]: value,
      }));
    };

    // USEEFFECT TO CHECK IF FORMDATA HAS BEEN SAVED BEFORE(USER ON HANDLEEDIT)
    useEffect(() => {
      // if (savedFormData) {
      //   setForm(JSON.parse(savedFormData));
      // }
      if (parsedFormData) {
        setForm(parsedFormData);
      }
    }, []);

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
            .from("questions") 
            .select("*") // Fetch all columns 
            .eq("class_id", classId); // filter by class_id

          if (questionsError) throw questionsError;
          // console.log(questionsData)

          // Prepare the questions list
          const questionList = questionsData.map((q) => q); // Assuming the column name is 'question_text'
          setQuestions(questionList);

          setForm((prev) => {
            const updatedForm = { ...prev };

            // Ensure name and email fields exist
            updatedForm.name = prev.name || "";
            updatedForm.email = prev.email || "";

            // Initialize dynamic questions
            questionsData.forEach((q) => {
              if (!(q.question_text in prev)) {
                updatedForm[q.question_text] = "";
              }
            });

            return updatedForm;
          });

        } catch (error) {
          console.error("Error fetching questions:", error);
        }
      };

      fetchQuestions();
    }, [classCode]);

    const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault();
      setLoading(true);

      if (!classCode) {
        alert("Class code is missing!");
        setLoading(false);
        return;
      }

      try {
        // Fetch classId using classCode
        const { data: classData, error: classError } = await supabase
          .from("classes")
          .select("id")
          .eq("class_code", classCode)
          .single();

        if (classError || !classData) throw new Error("Class not found");

        const classId = classData.id;
        // ✅ Store classId in sessionStorage
        sessionStorage.setItem("classId", classId);

        // Separate form data into name, email, and responses
        const { name, email, ...responses } = form;

        console.log("Dynamic Details>>>>>", responses);
        sessionStorage.setItem("classMemberFormData", JSON.stringify(form));

        onNext();
      } catch (error) {
        console.error("Error submitting form:", error);
        setLoading(false);
      } finally {
        setLoading(false);
      }

      console.log("Form Response", form);
    };
    // console.log("Saved form Response", savedFormData);

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
            // value={parsedFormData ? parsedFormData.name : ""}
            value={form.name || ""}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            name="email"
            placeholder="Enter your email"
            // value={parsedFormData ? parsedFormData.email : ""}
            value={form.email || ""}
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
                    // checked={
                    //   (parsedFormData[q.question_text] ||
                    //     form[q.question_text]) === option
                    // }
                    checked={form[q.question_text] === option}
                    onChange={handleChange}
                  />
                  <label>{option}</label>
                </div>
              ))
            ) : q.question_type === "select" && q.options ? (
              <select
                name={q.question_text}
                // value={
                //   parsedFormData[q.question_text] || form[q.question_text] || ""
                // }
                value={form[q.question_text] || ""}
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
                // value={
                //   parsedFormData[q.question_text] || form[q.question_text] || ""
                // }
                value={form[q.question_text] || ""}
                onChange={handleChange}
              />
            )}
          </div>
        ))}
        <button type="submit">{loading ? "Loading..." : "Join Class"}</button>
      </form>
    );
  };

  export default ClassMemberForm;
