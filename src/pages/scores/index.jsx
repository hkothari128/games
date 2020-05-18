import React, {useState, useEffect} from 'react';
import axios from 'axios'
import { Link } from 'react-router-dom';

const Scores = () => {
  const [scores, setScores] = useState([]);

  useEffect(()=>{
    axios.get("/scoreboard/")
    .then((results)=>setScores(results.data))
  }, []);

  return(
   <div className="container">
    <h2 className="mb-2 mt-5 text-center">
      Score Board
      <Link to="/">
        <i className="fas fa-home ml-2"></i>
      </Link>
    </h2>
    
    
    
    
    <table className="table table-striped">
      <thead>
        <tr>
          <th>Player1</th>
          <th>Player2</th>
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