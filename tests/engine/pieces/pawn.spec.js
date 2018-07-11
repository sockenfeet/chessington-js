import 'chai/register-should';
import Pawn from '../../../src/engine/pieces/pawn';
import Rook from '../../../src/engine/pieces/rook';
import Board from '../../../src/engine/board';
import Player from '../../../src/engine/player';
import Square from '../../../src/engine/square';
import Bishop from "../../../src/engine/pieces/bishop";
import King from "../../../src/engine/pieces/king";
import Queen from "../../../src/engine/pieces/queen";

describe('Pawn', () => {

    let board;
    beforeEach(() => board = new Board());

    describe('white pawns', () => {
        
        it('can only move one square up if they have already moved', () => {
            const pawn = new Pawn(Player.WHITE);
            board.setPiece(Square.at(1, 0), pawn);
            pawn.moveTo(board, Square.at(2, 0));

            const moves = pawn.getAvailableMoves(board);
            
            moves.should.have.length(1);
            moves.should.deep.include(Square.at(3, 0));
        });

        it('can move one or two squares up on their first move', () => {
            const pawn = new Pawn(Player.WHITE);
            board.setPiece(Square.at(1, 7), pawn);

            const moves = pawn.getAvailableMoves(board);

            moves.should.have.length(2);
            moves.should.deep.include.members([Square.at(2, 7), Square.at(3, 7)]);
        });

        it('cannot move at the top of the board', () => {
            const pawn = new Pawn(Player.WHITE);
            board.setPiece(Square.at(7, 3), pawn);

            const moves = pawn.getAvailableMoves(board);

            moves.should.be.empty;
        });

        it('can take another non-king piece diagonally', () => {
            const pawn = new Pawn(Player.WHITE);
            board.setPiece(Square.at(0,0), pawn);
            const bishop = new Bishop(Player.BLACK);
            board.setPiece(Square.at(1,1), bishop);

            const moves = pawn.getAvailableMoves(board);

            moves.should.deep.include(Square.at(1, 1));
        });

        it('cannot take the enemy king', () => {
            const pawn = new Pawn(Player.WHITE);
            board.setPiece(Square.at(3,3), pawn);
            const king = new King(Player.BLACK);
            board.setPiece(Square.at(4,4), king);

            const moves = pawn.getAvailableMoves(board);
            moves.should.not.deep.include(Square.at(4, 4));
        });

        it('cannot take a white piece', () => {
            const pawn = new Pawn(Player.WHITE);
            board.setPiece(Square.at(3,3), pawn);
            const bishop = new Bishop(Player.WHITE);
            board.setPiece(Square.at(4,4), bishop);

            const moves = pawn.getAvailableMoves(board);
            moves.should.not.deep.include(Square.at(4,4));
        });

        it('can be promoted', () => {
            const pawn = new Pawn(Player.WHITE);
            board.setPiece(Square.at(6, 0), pawn);
            pawn.moveTo(board, Square.at(7, 0));

            ((board.getPiece(Square.at(7, 0))) instanceof Queen).should.be.true;
        });


    });

    describe('black pawns', () => {

        let board;
        beforeEach(() => board = new Board(Player.BLACK));    
        
        it('can only move one square down if they have already moved', () => {
            const pawn = new Pawn(Player.BLACK);
            board.setPiece(Square.at(6, 0), pawn);
            pawn.moveTo(board, Square.at(5, 0));

            const moves = pawn.getAvailableMoves(board);
            
            moves.should.have.length(1);
            moves.should.deep.include(Square.at(4, 0));
        });

        it('can move one or two squares down on their first move', () => {
            const pawn = new Pawn(Player.BLACK);
            board.setPiece(Square.at(6, 7), pawn);

            const moves = pawn.getAvailableMoves(board);

            moves.should.have.length(2);
            moves.should.deep.include.members([Square.at(4, 7), Square.at(5, 7)]);
        });

        it('cannot move at the bottom of the board', () => {
            const pawn = new Pawn(Player.BLACK);
            board.setPiece(Square.at(0, 3), pawn);

            const moves = pawn.getAvailableMoves(board);

            moves.should.be.empty;
        });

        it('can take another non-king piece diagonally', () => {
            const pawn = new Pawn(Player.BLACK);
            board.setPiece(Square.at(7,7), pawn);
            const bishop = new Bishop(Player.WHITE);
            board.setPiece(Square.at(6,6), bishop);

            const moves = pawn.getAvailableMoves(board);

            moves.should.deep.include(Square.at(6, 6));
        });

        it('cannot take the king', () => {
            const pawn = new Pawn(Player.BLACK);
            board.setPiece(Square.at(3,3), pawn);
            const king = new King(Player.WHITE);
            board.setPiece(Square.at(2,2), king);

            const moves = pawn.getAvailableMoves(board);
            moves.should.not.deep.include(Square.at(2, 2));
        });

        it('cannot take a white piece', () => {
            const pawn = new Pawn(Player.BLACK);
            board.setPiece(Square.at(3,3), pawn);
            const bishop = new Bishop(Player.BLACK);
            board.setPiece(Square.at(2,2), bishop);

            const moves = pawn.getAvailableMoves(board);
            moves.should.not.deep.include(Square.at(2,2));
        });

        it('can be promoted', () => {
            const pawn = new Pawn(Player.BLACK);
            board.setPiece(Square.at(1, 0), pawn);
            pawn.moveTo(board, Square.at(0, 0));

            ((board.getPiece(Square.at(0,0))) instanceof Queen).should.be.true;
        });

        it('can en passant', () => {
            const pawn = new Pawn((Player.BLACK));
            board.setPiece(Square.at(3,2), pawn);
            const enemypawn = new Pawn(Player.WHITE);
            board.setPiece(Square.at(1,1), enemypawn);
            enemypawn.moveTo(3,1);
            pawn.moveTo(2,1);

            (board.isFree(Square.at(3,1))).should.be.true;
        });
    });

    it('cannot move if there is a piece in front', () => {
        const pawn = new Pawn(Player.BLACK);
        const blockingPiece = new Rook(Player.WHITE);
        board.setPiece(Square.at(6, 3), pawn);
        board.setPiece(Square.at(5, 3), blockingPiece);

        const moves = pawn.getAvailableMoves(board);

        moves.should.be.empty;
    });

    it('cannot move two squares if there is a piece two sqaures in front', () => {
        const pawn = new Pawn(Player.BLACK);
        const blockingPiece = new Rook(Player.WHITE);
        board.setPiece(Square.at(6, 3), pawn);
        board.setPiece(Square.at(4, 3), blockingPiece);

        const moves = pawn.getAvailableMoves(board);

        moves.should.not.deep.include(Square.at(4, 3));
    });

});
