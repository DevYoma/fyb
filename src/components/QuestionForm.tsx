  import { useEffect, useState } from "react";
  import { supabase } from "../supabase/supabaseClient";

  // type the classId

  type QuestionFormProps = {
      classId: string;
  }

  const QuestionForm = ({ classId }: QuestionFormProps) => {
    // console.log(classId);
    const [questions, setQuestions] = useState<unknown[]>([]);
    const [isAdding, setIsAdding] = useState(false);
    const [newQuestion, setNewQuestion] = useState({
      question_text: "",
      question_type: "text",
      options: "",
    });
    const [isEditing, setIsEditing] = useState(false);

    const handleAddQuestion = () => {
      if (!newQuestion.question_text.trim())
        return alert("Question text cannot be empty.");

      setQuestions([...questions, newQuestion]);
      setNewQuestion({ question_text: "", question_type: "text", options: "" }); // Reset form
    };
    
    // fetch existing questions from supabase when the component loads
    useEffect(() => {
      const fetchQuestions = async () => {
        const { data, error } = await await supabase
          .from("questions")
          .select("*")
          .eq("class_id", classId);
    
        if (error) {
          console.error("Error fetching questions:", error);
        } else {
          setQuestions(data);
          if (data.length > 0) setIsEditing(true);
          console.log(data)
        }
      };

      fetchQuestions();
    }, [classId]);

    // Save new questions or update existing ones
    const handleSaveOrUpdate = async () => {
      if (questions.length === 0)
        return alert("Please add at least one question.");

      const formattedQuestions = questions.map((q) => ({
        class_id: classId,
        question_text: q.question_text,
        question_type: q.question_type,
        options:
          q.question_type === "radio" || q.question_type === "select"
            ? Array.isArray(q.options) // ✅ Check if `options` is already an array
              ? q.options // ✅ Use it directly if it's an array
              : q.options.split(",").map((opt) => opt.trim()) // ✅ Convert string to array
            : null,
      }));

      // If editing, delete old questions first
      if (isEditing) {
        const { error: deleteError } = await supabase
          .from("questions")
          .delete()
          .eq("class_id", classId);

        if (deleteError) {
          console.error("Error deleting old questions:", deleteError);
          alert("Error updating questions. Check the console.");
          return;
        }
      }

      // Insert new questions
      const { error: insertError } = await supabase
        .from("questions")
        .insert(formattedQuestions);

      if (insertError) {
        console.error("Error saving questions:", insertError);
        alert("Error saving questions. Check the console.");
      } else {
        alert(
          isEditing
            ? "Questions updated successfully!"
            : "Questions saved successfully!"
        );
        setIsEditing(true);
      }
    };

    return (
      <div>
        <h2>Question Form</h2>

        {/* Input Form */}
        <div>
          <input
            type="text"
            placeholder="Enter question"
            value={newQuestion.question_text}
            onChange={(e) =>
              setNewQuestion({ ...newQuestion, question_text: e.target.value })
            }
          />
          <select
            value={newQuestion.question_type}
            onChange={(e) =>
              setNewQuestion({ ...newQuestion, question_type: e.target.value })
            }
          >
            <option value="text">Text</option>
            <option value="radio">Radio (Multiple Choice)</option>
            <option value="select">Dropdown</option>
          </select>
          {newQuestion.question_type !== "text" && (
            <input
              type="text"
              placeholder="Comma-separated options"
              value={newQuestion.options}
              onChange={(e) =>
                setNewQuestion({ ...newQuestion, options: e.target.value })
              }
            />
          )}
          <button onClick={handleAddQuestion}>Add Question</button>
        </div>

        {/* Questions List */}
        {questions.length > 0 && (
          <div>
            <h3>Questions for this class:</h3>
            <ul>
              {questions.map((q, index) => (
                // {console.log{questions}}
                <li key={index}>  
                  {q.question_text} ({q.question_type})
                  {q.question_type !== "text" && q.options && <p>Options: {q.options}</p>}
                </li>
              ))}
            </ul>
            <button onClick={handleSaveOrUpdate}>{isEditing ? "Update Questions" : "Save Questions"}</button>
          </div>
        )}
      </div>
    );
  };

  export default QuestionForm;
