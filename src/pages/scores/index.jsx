import React, {useState, useEffect, Fragment} from 'react';
import axios from 'axios'

const Scores = () => {
  const [scores, setScores] = useState([]);

  useEffect(()=>{
    axios.get("/scoreboard/")
    .then((results)=>setScores(results.data))
  }, []);

  return(
   <div className="container">
    <h2 className="mb-2 mt-5 text-center"> Score Board</h2>
    <table className="table table-striped">
      <thead>
        <tr>
          <th>Player 1</th>
          <th>Player 2</th>
          <th>Winner</th>
          <th>Time</th>           
        </tr>
      </thead>
      <tbody>
        {scores.map((score) => (
          <tr key={score.id}>
            <td>{score.player1}</td>
            <td>{score.player2}</td>
            <td>{score.winner}</td>
            <td>{score.time}</td>                   
          </tr>
        ))}
      </tbody>
    </table>
  </div>
 )
}
  

export default Scores;