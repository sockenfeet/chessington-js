import Piece from './piece';
import GameSettings from "../gameSettings";
import Square from "../square";

export default class Queen extends Piece {
    constructor(player) {
        super(player);
    }

    getAvailableMoves(board) {
        const moves = [];
        const pos = board.findPiece(this);
        const dirs = [[1,0], [-1,0], [0,1], [0,-1], [1,1], [1,-1], [-1,1], [-1,-1]];
        dirs.forEach(dir => {
            for (let i = 1; i < GameSettings.BOARD_SIZE; i++) {
                let sq = Square.at(pos.row + i * dir[0], pos.col + i * dir[1]);
                if (board.onBoard(sq) && board.isFree(sq)) {
                    moves.push(sq);
                } else {
                    break;
                }
            }
        });
        return moves;
    }
}
