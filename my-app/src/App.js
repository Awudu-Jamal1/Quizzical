import React from "react";
import Question from "./component/Question";

function App() {
  const [fetched, setFetched] = React.useState([]);
  const [solution, setSolution] = React.useState([]);
  const [show, setShow] = React.useState(false);
  const [next, setNext] = React.useState([0, 4]);

  React.useEffect(() => {
    const getQuiz = async () => {
      let response = await fetch(
        "https://opentdb.com/api.php?amount=12&type=multiple"
      );
      let quest = await response.json();
      let result = await quest.results;
      setFetched(result);
    };
    getQuiz();
  }, []);

  const solutions = (i, a, reply) => {
    let m = solution.find((e) => e.value === i);
    const ans = {
      value: i,
      answer: a,
      reply: reply,
    };
    setSolution((prev) =>
      m
        ? prev.map((e) => {
            return e.value === i ? { ...e, reply: reply } : e;
          })
        : [...prev, ans]
    );
  };
  const handleNext = () => {
    setNext([next[1], next[1] + 4]);
  };

  const handlePrev = () => {
    setNext([next[0] - 4, next[0]]);
  };

  const evaluteHandler = () => {
    setShow(true);
  };
  const restartHandler = () => {
    window.location.reload(false);
  };

  const disabled = solution.length === 12 ? true : false;

  const allQuestions = fetched.map((quest, i) =>
    i >= next[0] && i < next[1] ? (
      // <li key={i} >
      <Question
        key={i}
        value={i}
        show={show}
        quest={quest}
        solutions={solutions}
      /> /*</li>*/
    ) : (
      ""
    )
  );
  return (
    <div className="App">
      <div className="mainApp">
        <ol> {allQuestions}</ol>
      </div>

      <div className="movebox">
        <div>
          {next[0] !== 0 && <button onClick={handlePrev}>Previous</button>}
        </div>
        <div>
          {show ? (
            <button onClick={restartHandler}>Restart</button>
          ) : disabled ? (
            <button onClick={evaluteHandler}> Evalute</button>
          ) : (
            ""
          )}
        </div>

        <div>
          {next[1] !== 12 && <button onClick={handleNext}> Next</button>}
        </div>
      </div>
    </div>
  );
}

export default App;
