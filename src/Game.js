import React from 'react';
import ReactDOM from 'react-dom';
import Board from './Board';
import Rule from './Rule.js';
import red_plus from './pieces/red_plus.png';
import red_cross from './pieces/red_cross.png';
import red_hex from './pieces/red_hex.png';
import blue_plus from './pieces/blue_plus.png';
import blue_cross from './pieces/blue_cross.png';
import blue_hex from './pieces/blue_hex.png';
import purple_plus from './pieces/purple_plus.png';
import purple_cross from './pieces/purple_cross.png';
import black_box from './pieces/black_box.png';




class Game extends React.Component { //game just calls board and stores history of board

  constructor(props) {
    super(props);
    this.state = {
      //history is an array of squares which is an array of 9 number
      history: [{
        squares: Array(64).fill(null),
      }],
      stepNumber: 0,
      redIsNext: true,
      nextPiece: this.generateFirstPiece()[0],

    };
  }

  //handles what happens to each square box when clicked
  handleClick(i) {
    const history = this.state.history.slice(0, this.state.stepNumber +1);
    const current = history[history.length - 1];
    const squares = current.squares.slice();
    if (calculateWinner(squares) || squares[i]) {
        return;
    }
    squares[i] = this.state.nextPiece;

    this.setState({
      history: history.concat([{
        squares: squares,
      }]),
      stepNumber: history.length,
      redIsNext: !this.state.redIsNext,
      nextPiece: this.generatePiece()[0],
    });
  }

  //handles what happens when a move is clicked
  jumpTo(step) {
    this.setState({
      stepNumber: step,
      redIsNext: (step % 2 ) === 0,
    })
  }

  generatePiece() {
    const player = this.state.redIsNext ? 1 : 2;
    var randomValue = Math.floor(Math.random() * 100);
    var piece = black_box;
    var value = 0;
    if (player == 1) {
      if (0 <= randomValue && randomValue < 25) {
        piece = red_plus;
        value = 1;
      } else if (25 <= randomValue && randomValue < 50) {
        piece = red_cross;
        value = 2;
      } else if (50 <= randomValue &&  randomValue < 65) {
        piece = red_hex;
        value = 3;
      }  
    } else if (player == 2) {
      if (0 <= randomValue && randomValue < 25) {
        piece = blue_plus;
        value = 4;
      } else if (25 <= randomValue &&  randomValue < 50) {
        piece = blue_cross;
        value = 5;
      } else if (50 <= randomValue && randomValue < 65) {
        piece = blue_hex;
        value = 6;
      }
    } 
      if (65 <= randomValue && randomValue < 77) {
        piece = purple_plus;
        value = 7;
      } else if (77 <= randomValue &&  randomValue < 89) {
        piece = purple_cross;
        value = 8;
      } else if (89 <= randomValue &&  randomValue < 101) {
        piece = black_box;
        value = 9;
      }
    
    
    

    return [piece, value];
  }

  generateFirstPiece() {
    var randomValue = Math.floor(Math.random() * 100);
    var piece = black_box;
    var value = 0;
    if (0 <= randomValue && randomValue < 25) {
      piece = red_plus;
      value = 1;
    } else if (25 <= randomValue && randomValue < 50) {
      piece = red_cross;
      value = 2;
    } else if (50 <= randomValue &&  randomValue < 65) {
      piece = red_hex;   
      value = 3;
    }  else if (65 <= randomValue && randomValue < 77) {
      piece = purple_plus;
      value = 7;

    } else if (77 <= randomValue &&  randomValue < 89) {
      piece = purple_cross;
      value = 8;

    } else if (89 <= randomValue &&  randomValue < 101) {
      piece = black_box;
      value = 9;

    }
    return [piece, value];

  }

  
  render() {

    const history = this.state.history;
    const current = history[this.state.stepNumber];
    const winner = calculateWinner(current.squares);
    const winningTiles = calculateWinningTiles(current.squares);
  
    const moves = history.map((step, move) => {
      const desc = move ?
      'Go to move #' + move :
      'Go to game start';
      return (
        <li key={move}>
          <button onClick={() => this.jumpTo(move)}>{desc}</button>
        </li>
      )
    })

    let status;
    if(winner) {
      status = 'Winner is: ' + winner;
    } else if (this.state.stepNumber === 9) {
      status = 'Draw';
    } else {
      status = (this.state.redIsNext ? 'Player 1' : 'Player 2');
    }

    return (
      <div className="game">
        <div className="game-board">
          <Board 
            squares={current.squares}
            winningTiles={winningTiles}
            onClick={(i)=> this.handleClick(i)}
          />
        </div>
        <div className="game-info">
          <div>{status}</div>
          <ol>{/*moves*/}</ol>
        </div>
        <div className="game-description">
          <Rule/>
        </div>

        <div>
          <img className="pieces" src={this.state.nextPiece}/>
        </div>


        <div>
          <ol>
            {/*current.squares.map(squares => <li>{squares}</li>)*/}
          </ol>        
            
        </div>

        

      </div>
    );
  }
}

// finds the winner
function calculateWinner(squares) {
  /*
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      //i think this is the place to make the winning squares yellow
      return squares[a];
    }
  }
  return null;*/
}

// finds the winning tiles
function calculateWinningTiles(squares) {
  /*const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      //i think this is the place to make the winning squares yellow
      return lines[i];
    }
  }
  return null;*/

}

export default Game;