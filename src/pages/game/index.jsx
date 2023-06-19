import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from 'axios';

import Board from "./components/board";
import Timer from "./components/timer";
// import PlayerSection from './components/player_section';
import { isWin } from "../../helpers";
import { Generic } from "../../models";

import "./styles.scss";
import { useEffect } from "react";
import Status from "./components/game_status";

const Game = () => {
	const [playerId, updatePlayer] = useState(1);
	const [winner, setWinner] = useState(0);
	const [gameDetails, setGameDetails] = useState({});
	const [time, setTime] = useState();
	
	const AI = gameDetails.compId && new Generic(gameDetails.compId, gameDetails.compDifficulty);
	const AIName = gameDetails.compId && `Comp (level ${gameDetails.compDifficulty})`;
	const playerNames = {
		1: gameDetails.player1,
		2: gameDetails.player2,
	};

	useEffect(() => {
		setGameDetails(JSON.parse(localStorage.getItem("gameDetails")));
	}, []);

	useEffect(() => {
		if(winner && time ) {
				const player1 = gameDetails.compId === 0 ? playerNames[1] : gameDetails.compId === 2 ? playerNames[1]: AIName;
				const player2 = gameDetails.compId === 0 ? playerNames[2]: gameDetails.compId === 1 ? playerNames[1]: AIName;
				const winnerName = gameDetails.compId === 0 ? playerNames[winner]: gameDetails.compId !== winner ? playerNames[1]: AIName;
				
				const score = {player1, player2, winner: winnerName, time};
				console.log(score,"score")
				axios.post(`https://c4backend-hkothari128.vercel.app/scoreboard/`, score).then((res)=>console.log(res));

		}
	}, [winner, time])

	
	// const AI = new Moderate(compState.compId);

	const togglePlayer = (playerId) => {
		updatePlayer(playerId == 1 ? 2 : 1);
	};

	return (
		<div className="game">
			{/* <PlayerSection playerId={ 1 } active={ !winner && playerId === 1 } /> */}
			<div className="row">
				<div className="col-12">
					<Status
						playerId={winner || playerId}
						winner={winner}
						compId={gameDetails.compId}
						compName={AIName}
						playerNames={playerNames}
					/>
				</div>
			</div>
			<div className="row text-center">
				<div className="d-flex col-md-6 ml-auto mr-auto">
					<Board
						playerId={playerId}
						togglePlayer={togglePlayer}
						isWin={isWin}
						setWinner={setWinner}
						running={!winner}
						computerTurn={playerId === gameDetails.compId}
						AI={AI}
					/>
				</div>
			</div>
			<div className="row">
				<div className="col-6 ml-auto mr-auto">
					<Timer running={!winner} setTime={setTime} />
				</div>
			</div>
			
			<div className="row ">
				<div className="col-xl-3 col-10 ml-auto mr-auto">
					<Link to="/">
						<button className="btn btn-primary w-100 mb-2" disabled={!winner}>Play another game</button>
					</Link>
				</div>
				<div className="col-xl-3 col-10 mr-auto ml-auto">
					<Link to="/scores">
						<button className="btn btn-primary w-100" disabled={!winner}>View Scoreboard</button>
					</Link>
				</div>
			</div>
		</div>
	);
};

export default Game;