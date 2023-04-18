import React, {useEffect, useReducer} from 'react';

import './styles.scss';
import { Link } from 'react-router-dom';


const DEFAULT_DIFFICULTY = 3;

const formReducer = (state, action) => {
    switch (action.type) {
        case 'setState': return {
            ...action.payload,
            compDifficulty: action.payload.compDifficulty || DEFAULT_DIFFICULTY,
        }

        case 'setPlayer1': 
        return { ...state, player1: action.payload }
        
        case 'setPlayer2': return { ...state, player2: action.payload }

        case 'setCompDifficulty': return { ...state, compDifficulty: parseInt(action.payload) }

        case 'setCompId':
            return { ...state, compId: action.payload ? 1 : 2 }
    
        default:
            return state;
    }
}


const PlayerForm = () => {

    const [gameDetails, setGameDetails] = useReducer(formReducer,{});
    
    useEffect(() => {
        setGameDetails({ type: 'setState', payload: JSON.parse(localStorage.getItem("gameDetails"))})
    },[]);

    useEffect(() => {
        localStorage.setItem("gameDetails", JSON.stringify(gameDetails))
    },[gameDetails]);

    if(gameDetails.compId === 0){
        return(
            <div className="container form-container mt-4">
                <div className="row align-items-center">
                    <div className="col-xl-6 ml-auto mr-auto ">
                        <div className="card p-4">
                            <h4 className="text-center"> Game Details</h4>
                            <hr />
                            <div className="form-group">
                                <label htmlFor="player1" > Player 1 Name</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    name="player1"
                                    id="player1"
                                    value={ gameDetails.player1 || "" }
                                    onChange={ (e) => { setGameDetails({ type: "setPlayer1", payload: e.target.value})}}
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="player2" > Player 2 Name</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    name="player2"
                                    id="player2"
                                    value={ gameDetails.player2 || "" }
                                    onChange={ (e) => { setGameDetails({ type: "setPlayer2", payload: e.target.value})}}
                                />
                            </div>
                            <div className="form-group">
                                <Link to="/game">                                    
                                    <button className="btn btn-primary w-100"> Play Game </button>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
    else {
        return(
            <div className="container form-container mt-4">
                <div className="row align-items-center">
                    <div className="col-xl-6 ml-auto mr-auto">
                        <div className="card p-4">
                            <h4 className="text-center"> Game Details</h4>
                            <hr/>
                            <div className="form-group">
                                <label htmlFor="player1" > Player Name</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    name="player1"
                                    id="player1"
                                    value={ gameDetails.player1 || "" }
                                    onChange={ (e) => { setGameDetails({ type: "setPlayer1", payload: e.target.value})}}
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="player2" > Computer Difficulty level :</label>
                                <span id="difficultyVal" className="ml-2">{ gameDetails.compDifficulty || DEFAULT_DIFFICULTY }</span>
                                <input
                                    className="form-control form-container__slider"
                                    type="range"
                                    value={ gameDetails.compDifficulty || DEFAULT_DIFFICULTY }
                                    min="1"
                                    max="6"
                                    step="1"
                                    name="difficulty"
                                    id="difficulty"
                                    onChange={ (e) => { setGameDetails({ type: "setCompDifficulty", payload: e.target.value})}}
                                />
                                                              
                            </div>

                            
                            <div className="custom-control custom-checkbox mb-4">
                            
                                <input
                                    type="checkbox"
                                    className="custom-control-input"
                                    id="first"
                                    onChange={ (e) => { setGameDetails({ type: "setCompId", payload: e.target.checked})}}
                                />
                                <label className="custom-control-label" htmlFor="first">Computer goes first?</label>
                            </div>

                            <div className="form-group">
                                <Link to="/game">                                    
                                    <button className="btn btn-primary w-100"> Play Game </button>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}


export default PlayerForm;