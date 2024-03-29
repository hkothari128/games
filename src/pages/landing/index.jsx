import React from "react";
import { Link } from 'react-router-dom';
import Lottie from 'react-lottie';
import animationData from '../../lotties/board.json';


import "./styles.scss";


const handleClick = ({ compId }) => {
	const state = { ...JSON.parse(localStorage.getItem("gameDetails")), compId };
	localStorage.setItem("gameDetails", JSON.stringify(state));
}
const defaultOptions = {
	loop: true,
	autoplay: true,
	animationData: animationData,
	rendererSettings: {
	  preserveAspectRatio: "xMidYMid slice"
	}
  };

const LandingPage = () => {
	return (
		<div className="landing mt-4">
			<div className="row">
				<h1 className="ml-auto mr-auto">Welcome!</h1>
			</div>
			<div className="row">
			<Lottie 
				options={defaultOptions}
				height={400}
				width={400}
			/>
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
