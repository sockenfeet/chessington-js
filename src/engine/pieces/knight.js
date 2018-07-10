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
        knightMoves.forEach(move => {
            if (board.onBoard(Square.at(pos.row + move[0], pos.col+move[1]))) {
                moves.push(Square.at(pos.row + move[0], pos.col+move[1]))
            }
        });
        return moves;
    }
}
