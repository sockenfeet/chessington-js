import Piece from './piece';
import Square from "../square";
import GameSettings from "../gameSettings";

export default class Bishop extends Piece {
    constructor(player) {
        super(player);
    }

    getAvailableMoves(board) {
        const moves = [];
        const pos = board.findPiece(this);

        for (let i=1; i<GameSettings.BOARD_SIZE; i++) {
            if (board.onBoard(Square.at(pos.row+i,pos.col+i))) {
                moves.push(Square.at(pos.row+i,pos.col+i));
            }
            if (board.onBoard(Square.at(pos.row+i,pos.col-i))) {
                moves.push(Square.at(pos.row+i,pos.col-i));
            }
            if (board.onBoard(Square.at(pos.row-i,pos.col+i))) {
                moves.push(Square.at(pos.row-i,pos.col+i));
            }
            if (board.onBoard(Square.at(pos.row-i,pos.col-i))) {
                moves.push(Square.at(pos.row-i,pos.col-i));
            }
        }
        return moves;
    }
}
