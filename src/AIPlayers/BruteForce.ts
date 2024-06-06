import { Player } from "../ConnectFour/Player";
import { PlayerVal, ROWS, COLS } from "../ConnectFour/connectFourController";

export class BruteForce extends Player {
    n: number = 1;
    board: any = null;

    // This is the Constructor for the AI Player Class
    // You can set the name and colour of the AI player here
    constructor(playerVal: PlayerVal) {
        super("Brute Force", "#d62828", playerVal);
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
        // Randomly select a column
        const player = this.getPlayerVal();
        console.log(this.n);

        const shouldDrop = board.every((row) => {
            const col = row[this.n - 1];
            return col === player || col === 0;
        });

        if (!shouldDrop) {
            this.n = this.n < 7 ? this.n + 1 : 1;
        }

        return this.n;
    }
}