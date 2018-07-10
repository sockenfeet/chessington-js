import Piece from './piece';
import Square from '../square';

export default class King extends Piece {
    constructor(player) {
        super(player);
        this.isCapturable = false;
    }

    getAvailableMoves(board) {
        let moves = [];
        let pos = board.findPiece(this);
        for (let i=-1; i<=1; i++) {
            for (let j=-1; j<=1; j++) {
                let square = Square.at(pos.row+i, pos.col+j);
                if (board.onBoard(square) && !(i===0 && j===0)) {
                    if (board.isFree(square) || board.getPiece(square).isCapturableBy(this.player)) {
                        moves.push(square);
                    }
                }
            }
        }
        return moves;
    }
}
