import React from 'react';
import '../Styles/Chessboard.css'

const Chessboard = () => {

    const pieces = {
        '0-0': '♜', '0-1': '♞', '0-2': '♝', '0-3': '♛', '0-4': '♚', '0-5': '♝', '0-6': '♞', '0-7': '♜',
        '1-0': '♟', '1-1': '♟', '1-2': '♟', '1-3': '♟', '1-4': '♟', '1-5': '♟', '1-6': '♟', '1-7': '♟',
        '6-0': '♟', '6-1': '♟', '6-2': '♟', '6-3': '♟', '6-4': '♟', '6-5': '♟', '6-6': '♟', '6-7': '♟',
        '7-0': '♜', '7-1': '♞', '7-2': '♝', '7-3': '♛', '7-4': '♚', '7-5': '♝', '7-6': '♞', '7-7': '♜',
      };

        const squares = [];

        for (let row = 0; row < 8; row++) {
          for (let col = 0; col < 8; col++) {
            const isDark = (row + col) % 2 === 1;
            squares.push(
              <li key={`${row}-${col}`} className={isDark ? 'dark' : 'light'}>
               <p className={`${row <= 1 ? 'black' : row >=6 ? 'white' : ''}`}>{pieces[`${row}-${col}`]}</p>
              </li>
            );
          }
        }


        return (
            <ul className="chessboard">
              {squares.map((li=> {
                return li
              }))}
            </ul>
          );

};

export default Chessboard;
