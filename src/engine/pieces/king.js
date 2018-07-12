import Piece from './piece';
import GameSettings from '../gameSettings';
import Square from '../square';
import Rook from './rook';

export default class King extends Piece {
    constructor(player) {
        super(player);
        this.isCapturable = false;
    }

    moveTo(board, newSquare) {
        const oldSquare = board.findPiece(this);
        // check if move is a castling move
        let rook;
        switch (newSquare.col-oldSquare.col) {
            // right castle
            case 2:
                rook = board.getPiece(Square.at(oldSquare.row, oldSquare.col+3));
                board.setPiece(Square.at(oldSquare.row, oldSquare.col+1), rook);
                board.setPiece(Square.at(oldSquare.row, oldSquare.col+3), undefined);
                rook.hasMoved = true;
                break;
            // left castle
            case -2:
                rook = board.getPiece(Square.at(oldSquare.row, oldSquare.col-4));
                board.setPiece(Square.at(oldSquare.row, oldSquare.col-1), rook);
                board.setPiece(Square.at(oldSquare.row, oldSquare.col-4), undefined);
                rook.hasMoved = true;
                break;
        }
        super.moveTo(board, newSquare);
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

        const row = [];
        for (let i=0; i<GameSettings.BOARD_SIZE; i++){
            row.push(Square.at(pos.row, i));
        }
        // check left castling
        if (board.getPiece(row[0]) instanceof Rook && board.isFree(row[1]) && board.isFree(row[2]) && board.isFree(row[3])) {
            moves.push(row[2]);
        }
        // check right castling
        if (board.isFree(row[5]) && board.isFree(row[6]) && board.getPiece(row[7]) instanceof Rook) {
            moves.push(row[6]);
        }

        return moves;
    }
}
