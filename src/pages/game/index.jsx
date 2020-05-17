import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from 'axios';

import Board from "./components/board";
import Timer from "./components/timer";
// import PlayerSection from './components/player_section';
import { isWin } from "../../helpers";
import { Easy, Moderate, Hard } from "../../models";

import "./styles.scss";
import { useEffect } from "react";
import Status from "./components/game_status";

const Game = () => {
	const [playerId, updatePlayer] = useState(1);
	const [winner, setWinner] = useState(0);
	const [compState, setComputerState] = useState({});
	const [time, setTime] = useState();
	
	let AI;
	let AIName;
	switch (compState.difficulty) {
		case 1:
			AI = new Easy(compState.id);
			AIName = "Computer (Easy)";
			break;
		case 2:
			AI = new Moderate(compState.id);
			AIName = "Computer (Moderate)";
			break;
		case 3:
			AI = new Hard(compState.id);
			AIName = "Computer (Hard)";
			break;
	}
	// const computerId = 0;
	// const AI = null;
	useEffect(() => {
		setComputerState(JSON.parse(localStorage.getItem("compState")));
		console.log(compState, JSON.parse(localStorage.getItem("compState")));
	}, []);

	useEffect(() => {
		if(winner && time ) {
				const player1 = compState.id === 0 ? `Player 1`: compState.id === 2 ? 'Player': AIName;
				const player2 = compState.id === 0 ? `Player 2`: compState.id === 1 ? 'Player': AIName;
				const winnerName = compState.id === 0 ? `Player ${winner}`: compState.id !== winner ? 'Player': AIName;
				
				const score = {player1, player2, winner: winnerName, time};
				console.log(score,"score")
				axios.post("/scoreboard/", score).then((res)=>console.log(res));

		}
	}, [winner, time])

	
	// const AI = new Moderate(compState.compId);

	const togglePlayer = (playerId) => {
		updatePlayer(playerId == 1 ? 2 : 1);
	};

	return (
		<div className="game">
			{/* <PlayerSection playerId={ 1 } active={ !winner && playerId === 1 } /> */}
			<Status
				playerId={winner || playerId}
				winner={winner}
				compId={compState.id}
				compName={AIName}
			/>
			<Board
				playerId={playerId}
				togglePlayer={togglePlayer}
				isWin={isWin}
				setWinner={setWinner}
				running={!winner}
				computerTurn={playerId === compState.id}
				AI={AI}
			/>
			<Timer running={!winner} setTime={setTime} />
			{!!winner && (
				<Link to="/">
					<button>Play another game</button>
				</Link>
			)}
		</div>
	);
};

export default Game;