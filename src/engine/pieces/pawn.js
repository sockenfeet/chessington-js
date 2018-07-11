import {getPieceInput} from '../../frontend/js/chessington';
import Piece from './piece';
import Player from '../player';
import Square from '../square';
import Queen from './queen';
import Bishop from './bishop';
import Knight from './knight';
import Rook from './rook';

export default class Pawn extends Piece {
    constructor(player) {
        super(player);
        this.enPassantable = false;
    }

    moveTo(board, newSquare) {
        const currentSquare = board.findPiece(this);
        const dir = this.player === Player.WHITE ? 1:-1;

        // en passantable
        if (Math.abs(newSquare.row-currentSquare.row) === 2) {
            this.enPassantable = true;
        }

        //did we do an en passant?
        if (board.isFree(newSquare) && Math.abs(newSquare.col - currentSquare.col) === 1) {
            board.setPiece(Square.at(newSquare.row-dir, newSquare.col), undefined);
        }

        super.moveTo(board, newSquare);

        // promotion
        if ((this.player === Player.WHITE && newSquare.row === 7) || (this.player === Player.BLACK && newSquare.row === 0)) {
            const piece = prompt("Please enter the name of a piece: Queen, Bishop, Knight, Rook, Pawn").toLowerCase();
            switch(piece) {
                case 'queen':
                    board.setPiece(newSquare, new Queen(this.player));
                    break;
                case 'bishop':
                    board.setPiece(newSquare, new Bishop(this.player));
                    break;
                case 'knight':
                    board.setPiece(newSquare, new Knight(this.player));
                    break;
                case 'rook':
                    board.setPiece(newSquare, new Rook(this.player));
                    break;
                default:
                    console.log("falling through to default");
                    break;
            }
        }
    }

    getAvailableMoves(board) {
        const pos = board.findPiece(this);
        const moves = [];
        const dir = this.player === Player.WHITE ? 1:-1;

        // check for open file moves
        const sq1 = Square.at(pos.row + dir, pos.col);
        if (board.onBoard(sq1) && board.isFree(sq1)) {
            moves.push(sq1);
            let sq2 = Square.at(pos.row + 2*dir, pos.col);
            if (!this.hasMoved && board.onBoard(sq2) && board.isFree(sq2)) {
                moves.push(sq2);
            }
        }

        // check for diagonal takes
        const squares = [
            Square.at(pos.row + dir, pos.col - 1),
            Square.at(pos.row + dir, pos.col + 1),
        ];
        squares.filter(board.onBoard).filter(square => {
            if (board.isFree(square)) {
                // check for en passant
                let maybePawn = board.getPiece(Square.at(square.row-dir, square.col));
                return (maybePawn instanceof Pawn && maybePawn.enPassantable);
            } else {
                return board.getPiece(square).isCapturableBy(this.player);
            }
        }).forEach(square => moves.push(square));

        console.log(moves);
        return moves;
    }
}
