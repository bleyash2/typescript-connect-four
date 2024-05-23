import React from 'react'
import { AIPlayer, AIPlayer2 } from './Player'
import { Example } from '../AIPlayers/Example'


export type Board = (0|1|2)[][]
export type PlayerVal = 1 | 2
export type EmptySpace = 0


export const ROWS = 6
export const COLS = 7

const emptyBoard = () =>  Array.from({ length: ROWS }, () => Array(COLS).fill(0))


export function useConnectFour() {
    // Instantiate the game board
    const [board, setBoard] = React.useState(emptyBoard())
    const players = [new Example(1), new AIPlayer2(2)]
    const [turn, setTurn] = React.useState<PlayerVal>(1)
    const [winner, setWinner] = React.useState<PlayerVal | null | 0>(null)
    
    const currentPlayer = players[turn - 1]

    const isGameOver = winner !== null

    const initialiseGame = () => {
        setBoard(emptyBoard())
        setWinner(null)
        // Randomise the play order
        setTurn(Math.random() > 0.5 ? 1 : 2)
    }

    function handleNextTurn() {
        if (isGameOver) {
            return
        }
        setTurn(turn === 1 ? 2 : 1)
        const col = currentPlayer.makeMove(board)
        dropPiece(col - 1)
        checkForWinner()
    }

    function dropPiece(col: number) {
        const newBoard = [...board]
        for (let row = ROWS - 1; row >= 0; row--) {
            if (newBoard[row][col] === 0) {
                newBoard[row][col] = turn
                break
            }
        }
        setBoard(newBoard)
    }

    function checkForWinner() {
        // Check horizontal
        for (let row = 0; row < ROWS; row++) {
            for (let col = 0; col < COLS - 3; col++) {
                if (
                    board[row][col] === turn &&
                    board[row][col + 1] === turn &&
                    board[row][col + 2] === turn &&
                    board[row][col + 3] === turn
                ) {
                    setWinner(turn)
                }
            }
        }

        // Check vertical
        for (let row = 0; row < ROWS - 3; row++) {
            for (let col = 0; col < COLS; col++) {
                if (
                    board[row][col] === turn &&
                    board[row + 1][col] === turn &&
                    board[row + 2][col] === turn &&
                    board[row + 3][col] === turn
                ) {
                    setWinner(turn)
                }
            }
        }

        // Check diagonal
        for (let row = 0; row < ROWS - 3; row++) {
            for (let col = 0; col < COLS - 3; col++) {
                if (
                    board[row][col] === turn &&
                    board[row + 1][col + 1] === turn &&
                    board[row + 2][col + 2] === turn &&
                    board[row + 3][col + 3] === turn
                ) {
                    setWinner(turn)
                }
            }
        }

        for (let row = 0; row < ROWS - 3; row++) {
            for (let col = 3; col < COLS; col++) {
                if (
                    board[row][col] === turn &&
                    board[row + 1][col - 1] === turn &&
                    board[row + 2][col - 2] === turn &&
                    board[row + 3][col - 3] === turn
                ) {
                    setWinner(turn)
                }
            }
        }

        // Check for draw
        if (board.every((row) => row.every((cell) => cell !== 0))) {
            setWinner(0)
        }
    
    }

    const getColourForPlayer = (player: number) => {
        if (player === 1) {
           return players[0].getColor()
        } else {
            return players[1].getColor()
        }
    }

    return {
        board,
        turn,
        rows: ROWS,
        cols: COLS,
        handleNextTurn,
        initialiseGame,
        winner,
        isGameOver,
        getColourForPlayer,
        winningPlayer: winner === 1 ? players[0] : players[1]
    }
}
