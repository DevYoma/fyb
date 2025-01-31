import { useEffect, useState } from "react";
import { supabase } from "../supabase/supabaseClient";

// type the classId

type QuestionFormProps = {
    classId: string;
}

const QuestionForm = ({ classId }: QuestionFormProps) => {
  console.log(classId);
  const [questions, setQuestions] = useState<unknown[]>([]);
  const [newQuestion, setNewQuestion] = useState({
    text: "",
    type: "text",
    options: "",
  });

  const handleAddQuestion = () => {
    if (!newQuestion.text.trim()) return;

    setQuestions([...questions, newQuestion]);
    setNewQuestion({ text: "", type: "text", options: "" }); // Reset input
  };

  const handleSubmit = async () => {
    if (questions.length === 0) return alert("Add at least one question.");

    const formattedQuestions = questions.map((q) => ({
      class_id: classId,
      question_text: q.text,
      question_type: q.type,
      options:
        q.type === "radio" || q.type === "select"
          ? q.options.split(",").map((option: string) => option.trim()) // Create an array of options
          : null,
    }));

    const { error } = await supabase
      .from("questions")
      .insert(formattedQuestions);

    if (error) console.error("Error saving questions:", error);
    else alert("Questions saved successfully!");
  };

  useEffect(() => {
    const fetchQuestions = async () => {
      // Query to fetch questions based on class_id
      const { data, error } = await supabase
        .from("questions")
        .select("*")
        .eq("class_id", classId); // Filter by class_id

      if (error) {
        console.error("Error fetching questions:", error);
      } else {
        // Log the questions data to the console
        // Update the questions state with fetched data
        setQuestions(data);
        console.log("Questions for class", "classId", data);
      }
    };

    // Fetch questions when the component is mounted
    fetchQuestions();
  }, [classId]); // This runs when the classId prop changes

  console.log(questions.length)

  const handleUpdateQuestions = () => {

  }

  return (
    <div>
      <h2>Question Form</h2>

      {/* Show the form if no questions are set */}
      {questions.length === 0 ? (
        <div>
          <input
            type="text"
            placeholder="Enter question"
            value={newQuestion.text}
            onChange={(e) =>
              setNewQuestion({ ...newQuestion, text: e.target.value })
            }
          />
          <select
            value={newQuestion.type}
            onChange={(e) =>
              setNewQuestion({ ...newQuestion, type: e.target.value })
            }
          >
            <option value="text">Text</option>
            <option value="radio">Radio (Multiple Choice)</option>
            <option value="select">Dropdown</option>
          </select>
          {newQuestion.type !== "text" && (
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
          <button onClick={handleSubmit}>Save Questions</button>
        </div>
      ) : (
        <div>
          <h3>Questions for this class:</h3>
          <ul>
            {questions.map((q, index) => (
              <li key={index}>
                {q.question_text} ({q.question_type})
                {q.options &&
                  Array.isArray(q.options) &&
                  q.options.length > 0 && (
                    <p>Options: {q.options.join(", ")}</p>
                  )}
              </li>
            ))}
          </ul>
          <button onClick={handleUpdateQuestions}>Update Questions</button>
        </div>
      )}
    </div>
  );
};

export default QuestionForm;
