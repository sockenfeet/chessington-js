import Piece from './piece';
import Square from '../square';

export default class Knight extends Piece {
    constructor(player) {
        super(player);
    }

    getAvailableMoves(board) {
        const pos = board.findPiece(this);
        const knightMoves = [[2,1], [2,-1], [-2,1], [-2,-1], [1,2], [1,-2], [-1,2], [-1,-2]];
        const moves = [];
        knightMoves.map(move => Square.at(pos.row + move[0], pos.col + move[1]))
            .filter(board.onBoard)
            .filter(x => {
                if (board.isFree(x)) {
                    return true;
                }
                return board.getPiece(x).isCapturableBy(this.player);
            }).forEach(x => moves.push(x));
        return moves;
    }
}
