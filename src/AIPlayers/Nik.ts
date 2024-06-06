import { Player } from "../ConnectFour/Player";
import { PlayerVal, ROWS, COLS } from "../ConnectFour/connectFourController";

export class NikBot extends Player {
    // This is the Constructor for the AI Player Class
    // You can set the name and colour of the AI player here
    constructor(playerVal: PlayerVal) {
        super("Nik Bot feat. Linda", "#7e6ade", playerVal);
    }

    // The MakeMove function is called when it is the AI's turn to make a move
    // It simply returns the column that the AI would like to drop a piece into.
    // You have access to the current Board State in the form of a 2D array of numbers.
    // The numbers represent the player who has a piece in that cell.
    // 0 represents an empty cell
    // 1 represents player 1
    // 2 represents player 2
    // You can use playerVal to determine which player you are.
    // this.getPlayerVal(); will return the player number (1 or 2)

    public makeMove (board: number[][]): number {
        const player = this.getPlayerVal();
        const [column, _] = this.minimax(board, 5, -Infinity, Infinity, true, player);
        return column;
    }

    private minimax (board: number[][], depth: number, alpha: number, beta: number, isMaximizing: boolean, player: number): [number, number] {
        const opponent = player === 1 ? 2 : 1;

        if (depth === 0 || this.isTerminalNode(board)) {
            return [-1, this.evaluateBoard(board, player)];
        }

        const validLocations = this.getValidLocations(board);
        let bestColumn = validLocations[0];

        if (isMaximizing) {
            let value = -Infinity;
            for (const col of validLocations) {
                const bCopy = this.copyBoard(board);
                this.dropPiece(bCopy, col, player);
                const newScore = this.minimax(bCopy, depth - 1, alpha, beta, false, player)[1];
                if (newScore > value) {
                    value = newScore;
                    bestColumn = col;
                }
                alpha = Math.max(alpha, value);
                if (alpha >= beta) {
                    break;
                }
            }
            return [bestColumn, value];
        } else {
            let value = Infinity;
            for (const col of validLocations) {
                const bCopy = this.copyBoard(board);
                this.dropPiece(bCopy, col, opponent);
                const newScore = this.minimax(bCopy, depth - 1, alpha, beta, true, player)[1];
                if (newScore < value) {
                    value = newScore;
                    bestColumn = col;
                }
                beta = Math.min(beta, value);
                if (alpha >= beta) {
                    break;
                }
            }
            return [bestColumn, value];
        }
    }

    private getValidLocations (board: number[][]): number[] {
        const validLocations: number[] = [];
        for (let col = 0; col < COLS; col++) {
            if (board[0][col] === 0) {
                validLocations.push(col);
            }
        }
        return validLocations;
    }

    private copyBoard (board: number[][]): number[][] {
        return board.map(row => row.slice());
    }

    private dropPiece (board: number[][], col: number, player: number): void {
        for (let row = ROWS - 1; row >= 0; row--) {
            if (board[row][col] === 0) {
                board[row][col] = player;
                break;
            }
        }
    }

    private isTerminalNode (board: number[][]): boolean {
        return this.checkWin(board, 1) || this.checkWin(board, 2) || this.getValidLocations(board).length === 0;
    }

    private checkWin (board: number[][], player: number): boolean {
        // Check for 4-in-a-row horizontally, vertically, and diagonally
        // Horizontal
        for (let row = 0; row < ROWS; row++) {
            for (let col = 0; col < COLS - 3; col++) {
                if (board[row][col] === player && board[row][col + 1] === player && board[row][col + 2] === player && board[row][col + 3] === player) {
                    return true;
                }
            }
        }

        // Vertical
        for (let row = 0; row < ROWS - 3; row++) {
            for (let col = 0; col < COLS; col++) {
                if (board[row][col] === player && board[row + 1][col] === player && board[row + 2][col] === player && board[row + 3][col] === player) {
                    return true;
                }
            }
        }

        // Diagonal (positive slope)
        for (let row = 0; row < ROWS - 3; row++) {
            for (let col = 0; col < COLS - 3; col++) {
                if (board[row][col] === player && board[row + 1][col + 1] === player && board[row + 2][col + 2] === player && board[row + 3][col + 3] === player) {
                    return true;
                }
            }
        }

        // Diagonal (negative slope)
        for (let row = 3; row < ROWS; row++) {
            for (let col = 0; col < COLS - 3; col++) {
                if (board[row][col] === player && board[row - 1][col + 1] === player && board[row - 2][col + 2] === player && board[row - 3][col + 3] === player) {
                    return true;
                }
            }
        }

        return false;
    }

    private evaluateBoard (board: number[][], player: number): number {
        let score = 0;

        // Score center column
        const centerArray = [];
        for (let row = 0; row < ROWS; row++) {
            centerArray.push(board[row][Math.floor(COLS / 2)]);
        }
        const centerCount = centerArray.filter(val => val === player).length;
        score += centerCount * 3;

        // Score horizontal
        for (let row = 0; row < ROWS; row++) {
            const rowArray = board[row];
            for (let col = 0; col < COLS - 3; col++) {
                const window = rowArray.slice(col, col + 4);
                score += this.evaluateWindow(window, player);
            }
        }

        // Score vertical
        for (let col = 0; col < COLS; col++) {
            const colArray = [];
            for (let row = 0; row < ROWS - 3; row++) {
                colArray.push(board[row][col]);
            }
            for (let row = 0; row < ROWS - 3; row++) {
                const window = colArray.slice(row, row + 4);
                score += this.evaluateWindow(window, player);
            }
        }

        // Score positive diagonal
        for (let row = 0; row < ROWS - 3; row++) {
            for (let col = 0; col < COLS - 3; col++) {
                const window = [board[row][col], board[row + 1][col + 1], board[row + 2][col + 2], board[row + 3][col + 3]];
                score += this.evaluateWindow(window, player);
            }
        }

        // Score negative diagonal
        for (let row = 3; row < ROWS; row++) {
            for (let col = 0; col < COLS - 3; col++) {
                const window = [board[row][col], board[row - 1][col + 1], board[row - 2][col + 2], board[row - 3][col + 3]];
                score += this.evaluateWindow(window, player);
            }
        }

        return score;
    }

    private evaluateWindow (window: number[], player: number): number {
        const opponent = player === 1 ? 2 : 1;
        let score = 0;

        const playerCount = window.filter(val => val === player).length;
        const emptyCount = window.filter(val => val === 0).length;
        const opponentCount = window.filter(val => val === opponent).length;

        if (playerCount === 4) {
            score += 100;
        } else if (playerCount === 3 && emptyCount === 1) {
            score += 5;
        } else if (playerCount === 2 && emptyCount === 2) {
            score += 2;
        }

        if (opponentCount === 3 && emptyCount === 1) {
            score -= 4;
        }

        return score;
    }
}
