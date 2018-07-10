import GameSettings from '../gameSettings';
import Piece from './piece';
import Square from '../square';

export default class Rook extends Piece {
    constructor(player) {
        super(player);
    }

    getAvailableMoves(board) {
        const moves = [];
        const pos = board.findPiece(this);
        for (let i=1; i<GameSettings.BOARD_SIZE; i++) {
            moves.push(Square.at((pos.row+i)%8, pos.col));
            moves.push(Square.at(pos.row, (pos.col+i)%8));
        }
        return moves;
    }
}
