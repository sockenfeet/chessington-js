import Piece from './piece';
import Player from '../player';
import Square from '../square';

export default class Pawn extends Piece {
    constructor(player) {
        super(player);
    }

    getAvailableMoves(board) {
        const pos = board.findPiece(this);
        const moves = [];
        const dir = this.player === Player.WHITE ? 1:-1;
        const sq1 = Square.at(pos.row + dir, pos.col);
        if (board.onBoard(sq1) && board.isFree(sq1)) {
            moves.push(sq1);
            let sq2 = Square.at(pos.row + 2*dir, pos.col);
            if (!this.hasMoved && board.onBoard(sq2) && board.isFree(sq2)) {
                moves.push(sq2);
            }
        }
        return moves;
    }
}
