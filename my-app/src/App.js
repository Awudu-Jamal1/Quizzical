import React from 'react';
import Question from './component/Question';


function App() {
  const [fetched,setFetched]=React.useState([])
  const [solution,setSolution] =React.useState([])
  const [show ,setShow] =React.useState(false)


  React.useEffect(()=>{
    const getQuiz=async() =>{
      let response =  await fetch('https://opentdb.com/api.php?amount=10&type=multiple')
      let quest=await response.json()
      let result = await quest.results
      setFetched(result)
    }
    getQuiz()



  },[])

  const solutions=(i,a,reply)=>{
    let m =solution.find(e=>e.value ===i)
const ans ={
  value:i,
  answer:a,
  reply:reply
}
setSolution(prev =>m?
   prev.map(e =>{
   return e.value ===i?
    {...e,reply:reply}:e

  }
  ):[ ...prev,ans ]

)

  }

  console.log(solution.length)
  const evaluteHandler=()=>{
   setShow(true)
  }
  const restartHandler=()=>{
    window.location.reload(false)
   }

  const  disabled = solution.length !==10 ? true:false

  const allQuestions = fetched.map((quest,i )=>i<5?<Question key={i} value={i} show={show}
  quest={quest} solutions={solutions} />:'')
  return (
    <div className="App">
     <div> {allQuestions}</div>
     <div>{show?<button  onClick={restartHandler} >Restart</button>:<button disabled={disabled}
     onClick={evaluteHandler} > Evalute</button>}</div>
    </div>
  );
}


export default App;
