import { useState } from "react";
import "./Form.css";

const Form = () => {
  const [showForm, setShowForm] = useState(true);
  const [status, setStatus] = useState("empty");
  const [answer, setAnswer] = useState("");

  const formDisabled = status === "submitting" || status === "success";
  const buttonDisabled = !showForm || status === "empty";

  const submitForm = async (answer) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (answer.toLowerCase() === "istanbul") {
          resolve();
        } else {
          reject(new Error("Good guess but a wrong answer. Try again!"));
        }
      }, 1500);
    });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setStatus("submitting");
    try {
      await submitForm(answer);
      setStatus("success");
    } catch (err) {
      setStatus("error");
    } finally {
      setShowForm(false);
    }
  };

  const handleTextAreaChange = (e) => {
    setAnswer(e.target.value);
    setStatus(e.target.value.length === 0 ? "empty" : "typing");
  };

  return (
    <>
      {showForm && (
        <form onSubmit={handleFormSubmit}>
          <h2>City Quiz</h2>
          <p>What city is located on two continents?</p>
          <textarea
            value={answer}
            onChange={handleTextAreaChange}
            disabled={formDisabled}
          />
          <br />
          <button type="submit" disabled={buttonDisabled}>
            Submit
          </button>
          {status === "submitting" && <p>Loading...</p>}
        </form>
      )}
      {status === "error" && (
        <p id="error">Good guess but a wrong answer. Try again!</p>
      )}
      {status === "success" && <h1 id="success">That's right!</h1>}
    </>
  );
};

export default Form;
