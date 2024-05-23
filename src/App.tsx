import React from "react";
import logo from "./logo.svg";
import "./App.scss";
import { useConnectFour } from "./ConnectFour/connectFourController";

const GAME_SPEED = 1;

function App() {
  const {
    board,
    rows,
    cols,
    handleNextTurn,
    getColourForPlayer,
    isGameOver,
    winner,
    initialiseGame,
    winningPlayer,
  } = useConnectFour();

  const [gameIsRunning, setGameIsRunning] = React.useState(false);

  const drawBoard = (board: number[][]) => {
    return board.map((row, rowI) => {
      return row.map((cell, cellI) => {
        if (cell === 0)
          return (
            <div
              key={`row-${rowI}-col-${cellI}`}
              style={{
                border: "1px solid black",
                borderRadius: "50%",
                backgroundColor: "white",
                zIndex: 50,
                boxShadow: "inset 0 0 10px 0px black",
              }}
            ></div>
          );
        else
          return (
            <div
              style={{
                backgroundColor: getColourForPlayer(cell),
                border: "1px solid black",
                borderRadius: "50%",
                // aspectRatio: "1 / 1",
                animation: "drop 0.5s",
              }}
              key={`row-${rowI}-col-${cellI}`}
              className="cell"
            ></div>
          );
      });
    });
  };

  const handleStart = () => {
    console.log("Starting Game");
    initialiseGame();
    setGameIsRunning(true);
  };

  const handleReset = () => {
    console.log("Resetting Game");
    initialiseGame();
    setGameIsRunning(false);
  };

  const handleStop = () => {
    console.log("Stopping Game");
    setGameIsRunning(false);
  };

  React.useEffect(() => {
    if (gameIsRunning) {
      setTimeout(() => {
        handleNextTurn();
      }, GAME_SPEED * 1000);
    }
    if (isGameOver) {
      setGameIsRunning(false);
    }
  }, [gameIsRunning, board, isGameOver]);

  return (
    <div className="wrapper">
      {isGameOver ? (
        <div
          style={{
            textAlign: "center",
          }}
        >
          <h1>{winner === 0 ? "Draw" : `${winningPlayer.getName()} Wins!`}</h1>
        </div>
      ) : (
        <h1 style={{ textAlign: "center" }}>Connect Four</h1>
      )}
      <div
        className="board"
        style={{
          maxWidth: "1000px",
          display: "grid",
          position: "relative",
          gridTemplateColumns: `repeat(${cols}, 1fr)`,
          gridTemplateRows: `repeat(${rows}, 1fr)`,
          gap: "2.5%",
          aspectRatio: `${cols} / ${rows}`,
          backgroundColor: "#003049",
          padding: "20px",
          margin: "0 auto",
        }}
      >
        {drawBoard(board)}
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
          marginTop: "20px",
        }}
      >
        {isGameOver ? (
          <button className="button-92" onClick={handleReset}>
            Restart
          </button>
        ) : gameIsRunning ? (
          <button className="button-92" onClick={handleStop}>
            Stop
          </button>
        ) : (
          <button className="button-92" onClick={handleStart}>
            Start
          </button>
        )}
      </div>
    </div>
  );
}

export default App;
