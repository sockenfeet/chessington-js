import Player from './player';
import GameSettings from './gameSettings';
import Square from './square';
import Pawn from './pieces/pawn';

export default class Board {
    constructor(currentPlayer) {
        this.currentPlayer = currentPlayer ? currentPlayer : Player.WHITE;
        this.board = this.createBoard();
        this.prevMovePiece = undefined;
    }

    createBoard() {
        const board = new Array(GameSettings.BOARD_SIZE);
        for (let i = 0; i < board.length; i++) {
            board[i] = new Array(GameSettings.BOARD_SIZE);
        }
        return board;
    }

    setPiece(square, piece) {
        this.board[square.row][square.col] = piece;
    }

    getPiece(square) {
        return this.board[square.row][square.col];
    }

    isFree(square) {
        return this.getPiece(square) === undefined;
    }

    findPiece(pieceToFind) {
        for (let row = 0; row < this.board.length; row++) {
            for (let col = 0; col < this.board[row].length; col++) {
                if (this.board[row][col] === pieceToFind) {
                    return Square.at(row, col);
                }
            }
        }
        throw new Error('The supplied piece is not on the board');
    }

    movePiece(fromSquare, toSquare) {
        const movingPiece = this.getPiece(fromSquare);
        if (this.prevMovePiece instanceof Pawn) {this.prevMovePiece.enPassantable = false;}
        if (!!movingPiece && movingPiece.player === this.currentPlayer) {
            this.setPiece(toSquare, movingPiece);
            this.setPiece(fromSquare, undefined);
            this.currentPlayer = (this.currentPlayer === Player.WHITE ? Player.BLACK : Player.WHITE);
            movingPiece.hasMoved = true;
        }
        this.prevMovePiece = movingPiece;
        // reset en passantable-ness
    }

    onBoard(square) {
        return 0<=square.row && square.row<GameSettings.BOARD_SIZE && 0<=square.col && square.col<GameSettings.BOARD_SIZE;
    }
}
