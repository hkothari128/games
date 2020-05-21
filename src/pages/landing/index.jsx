import React from "react";
import { Link } from 'react-router-dom';

import logo from '../../../assets/landing.PNG';

import "./styles.scss";


const handleClick = ({ compId }) => {
	const state = { ...JSON.parse(localStorage.getItem("gameDetails")), compId };
	localStorage.setItem("gameDetails", JSON.stringify(state));
}

const LandingPage = () => {
	return (
		<div className="landing">
			<div className="row">
				<img src={logo} alt="" className="mb-4 ml-auto mr-auto"/>
			</div>
			<div className="row">
					<div className="col-xl-3  mb-2 mt-4 ml-auto "> 
						<Link to="/game_details">
							<button className="btn btn-primary w-100" onClick={() => handleClick({ compId:0 })}>
								Player vs Player
							</button>						
						</Link>
					</div>
					<div className="col-xl-3  mb-2 mt-4 mr-auto"> 
						
					<Link to="/game_details">
						<button className="btn btn-primary w-100"onClick={() => handleClick({ compId:2 })}>
							Player vs Comp
						</button>
					</Link>
					</div>
			</div>
			<div className="row">
				<div className="col-xl-3 ml-auto mr-auto mt-4">
					<Link to="/scores"><button className="btn btn-outline-primary w-100">Scores</button></Link>
				</div>
			</div>
		</div>
	);
};

export default LandingPage;
