import React, { useState } from "react";
const Question = (props) => {
  console.log();
  const [response, setResponse] = useState("");

  const { question, correct_answer, incorrect_answers } = props.quest;

  if (incorrect_answers.length < 4) {
    const randomize = (a, b) => {
      let rans = Math.ceil(Math.random() * 4);

      a.splice(rans, 0, b);
    };
    randomize(incorrect_answers, correct_answer);
  }

  const handleResponse = (i, a, reply, btn) => {
    setResponse([reply, btn]);
    props.solutions(i, a, reply);
  };

  let correct = props.show ? correct_answer : "";
  console.log(response[1]);
  // console.log(show,correct)
  const decsion = response === correct_answer ? "Correct" : "Wrong";
  const objective = incorrect_answers.map((obj, i) => (
    <button
      disabled={props.show}
      className={`select-button ${
        correct === obj
          ? "right"
          : i === response[1]
          ? "selected-note"
          : "button-color"
      }`}
      onClick={() => handleResponse(props.value, correct_answer, obj, i)}
      key={i}
    >
      {obj}
    </button>
  ));
  return (
    <div className="main">
      <h4>
        {props.value + 1}. {question}
      </h4>

      <div className="box">
        {" "}
        <div className="objs">
          {objective}
          {props.show ? correct_answer : ""}
        </div>{" "}
      </div>
    </div>
  );
};

export default Question;
