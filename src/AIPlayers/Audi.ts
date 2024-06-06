import { Player } from "../ConnectFour/Player";
import { PlayerVal, ROWS, COLS } from "../ConnectFour/connectFourController";

export class Audi extends Player {
    constructor(playerVal: PlayerVal) {
        super("Audi", "#E8E8E8", playerVal);
    }

    public makeMove (board: number[][]): number {
        const playerVal = this.getPlayerVal();
        const opponentVal = playerVal === 1 ? 2 : 1;

        // Try to find a winning move for the AI
        for (let col = 0; col < COLS; col++) {
            if (this.isValidMove(board, col) && this.isWinningMove(board, col, playerVal)) {
                return col;
            }
        }

        // Try to block the opponent's winning move
        for (let col = 0; col < COLS; col++) {
            if (this.isValidMove(board, col) && this.isWinningMove(board, col, opponentVal)) {
                return col;
            }
        }

        // If no winning or blocking move, select a random valid column
        let validCols = this.getValidMoves(board);
        return validCols[Math.floor(Math.random() * validCols.length)];
    }

    private isValidMove (board: number[][], col: number): boolean {
        return board[0][col] === 0;
    }

    private getValidMoves (board: number[][]): number[] {
        let validCols: number[] = [];
        for (let col = 0; col < COLS; col++) {
            if (this.isValidMove(board, col)) {
                validCols.push(col);
            }
        }
        return validCols;
    }

    private isWinningMove (board: number[][], col: number, playerVal: PlayerVal): boolean {
        // Create a copy of the board to simulate the move
        let tempBoard = board.map(row => row.slice());
        for (let row = ROWS - 1; row >= 0; row--) {
            if (tempBoard[row][col] === 0) {
                tempBoard[row][col] = playerVal;
                break;
            }
        }
        return this.checkWin(tempBoard, playerVal);
    }

    private checkWin (board: number[][], playerVal: PlayerVal): boolean {
        // Check horizontal, vertical, and diagonal lines for a win
        // Horizontal
        for (let row = 0; row < ROWS; row++) {
            for (let col = 0; col <= COLS - 4; col++) {
                if (board[row][col] === playerVal &&
                    board[row][col + 1] === playerVal &&
                    board[row][col + 2] === playerVal &&
                    board[row][col + 3] === playerVal) {
                    return true;
                }
            }
        }

        // Vertical
        for (let col = 0; col < COLS; col++) {
            for (let row = 0; row <= ROWS - 4; row++) {
                if (board[row][col] === playerVal &&
                    board[row + 1][col] === playerVal &&
                    board[row + 2][col] === playerVal &&
                    board[row + 3][col] === playerVal) {
                    return true;
                }
            }
        }

        // Diagonal (bottom-left to top-right)
        for (let row = 3; row < ROWS; row++) {
            for (let col = 0; col <= COLS - 4; col++) {
                if (board[row][col] === playerVal &&
                    board[row - 1][col + 1] === playerVal &&
                    board[row - 2][col + 2] === playerVal &&
                    board[row - 3][col + 3] === playerVal) {
                    return true;
                }
            }
        }

        // Diagonal (top-left to bottom-right)
        for (let row = 0; row <= ROWS - 4; row++) {
            for (let col = 0; col <= COLS - 4; col++) {
                if (board[row][col] === playerVal &&
                    board[row + 1][col + 1] === playerVal &&
                    board[row + 2][col + 2] === playerVal &&
                    board[row + 3][col + 3] === playerVal) {
                    return true;
                }
            }
        }

        return false;
    }
}