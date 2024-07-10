import React, { useState } from "react";
import "../Styles/Chessboard.css";

const Chessboard = () => {
  const initialPieces = {
    "0-0": "♜",
    "0-1": "♞",
    "0-2": "♝",
    "0-3": "♛",
    "0-4": "♚",
    "0-5": "♝",
    "0-6": "♞",
    "0-7": "♜",
    "1-0": "♟",
    "1-1": "♟",
    "1-2": "♟",
    "1-3": "♟",
    "1-4": "♟",
    "1-5": "♟",
    "1-6": "♟",
    "1-7": "♟",
    "6-0": "♙",
    "6-1": "♙",
    "6-2": "♙",
    "6-3": "♙",
    "6-4": "♙",
    "6-5": "♙",
    "6-6": "♙",
    "6-7": "♙",
    "7-0": "♖",
    "7-1": "♘",
    "7-2": "♗",
    "7-3": "♕",
    "7-4": "♔",
    "7-5": "♗",
    "7-6": "♘ ",
    "7-7": "♖",
  };

  const [pieces, setPieces] = useState(initialPieces);
  const [selectedPiece, setSelectedPiece] = useState(null);
  const [rulesFlag, setRulesFlag] = useState(false)

  function handleReset(){
    let result = window.confirm('Are you sure you want to reset?')
    if(result){
      setPieces(initialPieces)
    }
    else{
      return
    }
  }

  function handleBoxClick(row, col) {
    const key = `${row}-${col}`;

    if (selectedPiece) {
      const [selectedRow, selectedCol] = selectedPiece.split("-").map(Number);
      console.log("selr", selectedRow, "selc", selectedCol);
      if (
        pieces[selectedPiece] === "♟" &&
        (row === selectedRow + 1 || (selectedRow === 1 && row === 3)) &&
        col === selectedCol
      ) {
        const newPieces = { ...pieces };
        newPieces[key] = newPieces[selectedPiece];
        delete newPieces[selectedPiece];
        setPieces(newPieces);
        setSelectedPiece(null);
      } else if (
        pieces[selectedPiece] === "♙" &&
        ((selectedRow === 6 && row === 4) || row === selectedRow - 1) &&
        col === selectedCol
      ) {
        const newPieces = { ...pieces };
        newPieces[key] = newPieces[selectedPiece];
        delete newPieces[selectedPiece];
        setPieces(newPieces);
        setSelectedPiece(null);
      }

      // Logic for capturing a pawn diagonally
      if (pieces[selectedPiece] === "♟") {
        if (
          row === selectedRow + 1 &&
          (col === selectedCol + 1 || col === selectedCol - 1)
        ) {
          if (pieces[key] === "♙") {
            const newPieces = { ...pieces };
            newPieces[key] = newPieces[selectedPiece];
            delete newPieces[selectedPiece];
            setPieces(newPieces);
            setSelectedPiece(null);
            return;
          }
        }
      }

      // Logic for capturing a pawn diagonally
      if (pieces[selectedPiece] === "♙") {
        if (
          row === selectedRow - 1 &&
          (col === selectedCol + 1 || col === selectedCol - 1)
        ) {
          if (pieces[key] === "♟") {
            const newPieces = { ...pieces };
            newPieces[key] = newPieces[selectedPiece];
            delete newPieces[selectedPiece];
            setPieces(newPieces);
            setSelectedPiece(null);
            return;
          }
        }
      } else {
        setSelectedPiece(null);
      }
    } else if (pieces[key]) {
      setSelectedPiece(key);
    }
  }

  const squares = [];

  for (let row = 0; row < 8; row++) {
    for (let col = 0; col < 8; col++) {
      const isDark = (row + col) % 2 === 1;
      squares.push(
        <li
          onClick={() => handleBoxClick(row, col)}
          key={`${row}-${col}`}
          className={isDark ? "dark" : "light"}
        >
          <p className={`${pieces[`${row}-${col}`] == '♙'  ? "white" : pieces[`${row}-${col}`] == '♟' || pieces[`${row}-${col}`] == '♜'
            || pieces[`${row}-${col}`] == '♜' || pieces[`${row}-${col}`] == '♞' || pieces[`${row}-${col}`] == '♝' || 
            pieces[`${row}-${col}`] == '♛' || pieces[`${row}-${col}`] ==  '♚' ? "black" : "white"}`}>
            {pieces[`${row}-${col}`]}
          </p>
        </li>
      );
    }
  }

  return <div className="main-container">
    <div style={{display:'flex', flexDirection:'column', justifyContent:'center', alignItems:'center'}} className="left-div">

      <button onClick={()=> setRulesFlag(!rulesFlag)}>{rulesFlag ? 'HIDE RULES' : 'SHOW RULES'}</button>
      <p>{rulesFlag ? 'Chess is played on an 8x8 board. Each player starts with 16 pieces: a king, queen, two rooks, two knights, two bishops, and eight pawns. The goal is to checkmate the opponents king by placing it under threat of capture with no legal escape. Pieces move differently: kings move one square in any direction, queens move any number of squares diagonally, horizontally, or vertically, rooks move any number of squares horizontally or vertically, bishops move diagonally, and knights move in an L-shape. Pawns move forward one square, capturing diagonally. Special moves include castling and pawn promotion.' : null}</p>
      <button onClick={handleReset}>RESET</button>
     
    </div>
    <div className="center-div">
    <ul className="chessboard">{squares}</ul>
    </div>
    <div className="right-div">
      
    </div>
  </div>;
};

export default Chessboard;
