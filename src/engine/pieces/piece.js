import Square from "../square";

export default class Piece {
    constructor(player) {
        this.player = player;
        this.hasMoved = false;
        this.isCapturable = true;
    }

    getAvailableMoves(board) {
        throw new Error('This method must be implemented, and return a list of available moves');
    }

    moveTo(board, newSquare) {
        const currentSquare = board.findPiece(this);
        // const colour = () => {if (this.player === Player.WHITE) {return "white"} else {return "black"}};
        board.movePiece(currentSquare, newSquare);
        // console.log(`And now I, the ${colour()} ${typeof this} have moved! :D`)
    }

    march(board, dirs) {
        const moves = [];
        const pos = board.findPiece(this);
        dirs.forEach(dir => {
            let sq = Square.at(pos.row + dir[0], pos.col + dir[1]);
            while (board.onBoard(sq) && (board.isFree(sq))) {
                moves.push(sq);
                sq = Square.at(sq.row + dir[0], sq.col + dir[1]);
            }
            if (board.onBoard(sq) && !board.isFree(sq)) {
                let block = board.getPiece(sq);
                if (block.isCapturableBy(this.player)) {moves.push(sq)}
            }
        });
        return moves;
    }

    getDiagonalMoves(board) {
        return this.march(board, [[1,1], [1,-1], [-1,1], [-1,-1]]);
    }

    getLateralMoves(board) {
        return this.march(board, [[1,0], [-1,0], [0,1], [0,-1]]);
    }

    isCapturableBy(colour) {
        return (colour !== this.player && this.isCapturable);
        // if (board.onBoard(square) && !board.isFree(square)) {
        //
        //     if (block.player !== player && block.isCapturableBy) {
        //         return true;
        //     }
        // }
        // return false;
    }
}
