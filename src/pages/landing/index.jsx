import React from "react";
import { Link } from 'react-router-dom';

import Menu from "./menu";

import "./styles.scss";


const handleClick = ({ compId }) => {
	const state = { ...JSON.parse(localStorage.getItem("gameDetails")), compId };
	localStorage.setItem("gameDetails", JSON.stringify(state));
}

const LandingPage = () => {
	// const menuOptions = [
	// 	{ text: "Player vs Player", compId: 0, difficulty: 0 },
	// 	{ text: "Player vs Comp(Easy)", compId: 2, difficulty: 1 },
	// 	{ text: "Comp(Easy) vs Player", compId: 1, difficulty: 1 },
	// 	{ text: "Player vs Comp(Moderate)", compId: 2, difficulty: 2 },
	// 	{ text: "Comp(Moderate) vs Player", compId: 1, difficulty: 2 },
	// 	{ text: "Player vs Comp(Hard)", compId: 2, difficulty: 2 },
	// 	{ text: "Comp(Hard) vs Player", compId: 1, difficulty: 2 },
	// ];

	return (
		<div className="landing">
			<h1 className="landing__title">CONNECT 4</h1>
			<div className="row">
					<div className="col-xl-6  mb-2 mt-4 ml-auto mr-auto"> 
						<Link to="/game_details">
							<button className="btn btn-primary w-100" onClick={() => handleClick({ compId:0 })}>
								Player vs Player
							</button>						
						</Link>
					</div>
					<div className="col-xl-6  mb-2 mt-4 ml-auto mr-auto"> 
						
					<Link to="/game_details">
						<button className="btn btn-primary w-100"onClick={() => handleClick({ compId:2 })}>
							Player vs Comp
						</button>
					</Link>
					</div>
			</div>
			<div className="row">
				<div className="col-xl-6 ml-auto mr-auto mt-4">
					<Link to="/scores"><button className="btn btn-outline-primary w-100">Scores</button></Link>
				</div>
			</div>
		</div>
	);
};

export default LandingPage;
