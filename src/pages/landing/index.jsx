import React from "react";
import { Link } from 'react-router-dom';

import Menu from "./menu";

import "./styles.scss";

const LandingPage = () => {
	const menuOptions = [
		{ text: "Player vs Player", compId: 0, difficulty: 0 },
		{ text: "Player vs Comp(Easy)", compId: 2, difficulty: 1 },
		{ text: "Comp(Easy) vs Player", compId: 1, difficulty: 1 },
		{ text: "Player vs Comp(Moderate)", compId: 2, difficulty: 2 },
		{ text: "Comp(Moderate) vs Player", compId: 1, difficulty: 2 },
		{ text: "Player vs Comp(Hard)", compId: 2, difficulty: 2 },
		{ text: "Comp(Hard) vs Player", compId: 1, difficulty: 2 },
	];

	return (
		<div className="landing">
			<h1 className="landing__title">CONNECT 4</h1>
			<Menu menuOptions={menuOptions} />
			<Link to="/scores"><button className="btn btn-danger">Scores</button></Link>
		</div>
	);
};

export default LandingPage;
