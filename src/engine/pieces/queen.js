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
        for (let i=1; i<GameSettings.BOARD_SIZE; i++) {
            //lateral moves
            moves.push(Square.at((pos.row+i)%8, pos.col));
            moves.push(Square.at(pos.row, (pos.col+i)%8));
            //diagonal moves
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
