import { PlayerVal, ROWS, COLS } from "./connectFourController";

export class Player {

    private name: string;
    private color: string;
    private playerVal: PlayerVal;

    constructor(name: string, color: string, playerVal: PlayerVal) {
        this.name = name;
        this.color = color;
        this.playerVal = playerVal;
    }

    public getName() {
        return this.name;
    }

    public getColor() {
        return this.color;
    }

    public getPlayerVal() {
        return this.playerVal;
    }

    // Return the player's column choice
    public makeMove(board: number[][]): number {
        return 1;
    }
}



export class AIPlayer extends Player {
    constructor(playerVal: PlayerVal) {
        super("Mr Robotto", "#d62828", playerVal);
    }


    public makeMove(board: number[][]): number {
        // Randomly select a column
        return Math.floor(Math.random() * 7) + 1;
    }

}

export class AIPlayer2 extends Player {
    constructor(playerVal: PlayerVal) {
        super("Mrs Robotto", "#fcbf49", playerVal);
    }


    public makeMove(board: number[][]): number {
        // Randomly select a column
        return Math.floor(Math.random() * 7) + 1;
    }

}