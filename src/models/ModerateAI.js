const { AI } = require("./AI");
const { minimax } = require("../helpers");

class Moderate extends AI {
	getRow(boardState) {
		const compId = this.getId();
		const playerId = compId === 1 ? 2 : 1;
		const [rowId, score] = minimax(
			boardState,
			2,
			-Infinity,
			Infinity,
			compId,
			true,
			null,
			null,
			compId,
			playerId
		);
		console.log(rowId, score);
		return rowId;
	}
	play(boardState, updateBoardState, playerId) {
		const rowId = this.getRow(boardState);
		super.play(rowId, boardState, updateBoardState, playerId);
	}
}

module.exports = { Moderate };
