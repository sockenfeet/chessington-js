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
        if (board.isFree(Square.at(pos.row + dir, pos.col))) {
            moves.push(Square.at(pos.row + dir, pos.col));
            if (!this.hasMoved && board.isFree(Square.at(pos.row + 2*dir, pos.col))) {
                moves.push(Square.at(pos.row + 2*dir, pos.col));
            }
        }
        return moves;
    }
}
