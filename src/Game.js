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
      redIsNext: false,
      nextPiece: this.generateFirstPiece(),
      boardValue: Array(65).fill(0),
      playerOneScore: 0,
      playerTwoScore: 0,

    };
  }

  //handles what happens to each square box when clicked
  handleClick(i) {
    const history = this.state.history.slice(0, this.state.stepNumber +1);
    const current = history[history.length - 1];
    const squares = current.squares.slice();
    const squaresValue = this.state.boardValue.slice();

    if (squaresValue[i] == 0) {
      squares[i] = this.state.nextPiece[0];
      squaresValue[i] = this.state.nextPiece[1];

      this.calculateScore(squaresValue);


      this.setState({
        history: history.concat([{
          squares: squares,
        }]),
        stepNumber: history.length,
        redIsNext: !this.state.redIsNext,
        nextPiece: this.generatePiece(),
        boardValue: squaresValue,
      });
    }
    
    
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

  calculateScore(v) {
    
    const one = calculateWestRed(v) + calculateEastWestRed(v) + calculateSouthWestRed(v) + calculateEastRed(v);
    const two = calculateWestBlue(v) + calculateEastWestBlue(v) + calculateSouthWestBlue(v) + calculateEastBlue(v);
    this.setState ({
      playerOneScore: one,
      playerTwoScore: two,
    });
  }

  
  render() {

    const history = this.state.history;
    const current = history[this.state.stepNumber];
    const winner = calculateWinner(this.state.playerOneScore, this.state.playerTwoScore, this.state.history.length);
    
  
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
      status = winner;
    } else {
      status = (this.state.redIsNext ? 'Player 2 turn' : 'Player 1 turn');
    }

    return (
      <div className="game">

        <div className="game-board">
          <Board className="board"
            squares={current.squares}
            onClick={(i)=> this.handleClick(i)}
          />
        </div>

        

        <div className="game-rules">
          <Rule/>
        </div>

        <div className="game-next-piece">
        <div className="game-info">
          <div>{status}</div>
        </div>
          {"Next piece:"}
          <img className="next-piece" src={this.state.nextPiece[0]}/>
        </div> 

        <div className="score">
          <div>{"Player 1 score: " + this.state.playerOneScore} </div>
          <div>{"Player 2 score: " + this.state.playerTwoScore}</div>
        </div>

      </div>
    );
  }
}

// finds the winner
function calculateWinner(one, two, moves) {
  if (moves == 65) {
    var winner = "";
    if (one > two) {
      winner = "Player 1 wins!"
    } else if (one < two) {
      winner = "Player 2 wins!"
    } else {
      winner = "Its a draw!"
    }
    return winner;
  } else {
    return null;
  }
  
  
}



function calculateEastRed(squaresValue) {
   var result = 0;
    for (var i=0; i<48; i++) {
        if((squaresValue[i] == 1 || squaresValue[i] == 3 || squaresValue[i] == 7) &&
           (squaresValue[i+8] == 1 || squaresValue[i+8] == 3 || squaresValue[i+8] == 7) &&
           (squaresValue[i+16] == 1 || squaresValue[i+16] == 3 || squaresValue[i+16] == 7)) {
          result++;
        }
    }

   return result;
}

function calculateWestRed(squaresValue) {
  var result = 0;
    for (var i=0; i<62; i++) {
      if ((i+3)% 8 >0) {
        if((squaresValue[i] == 1 || squaresValue[i] == 3 || squaresValue[i] == 7) &&
          (squaresValue[i+1] == 1 || squaresValue[i+1] == 3 || squaresValue[i+1] == 7) &&
          (squaresValue[i+2] == 1 || squaresValue[i+2] == 3 || squaresValue[i+2] == 7)) {
          result++;
        }
      }
    }

   return result;
}

function calculateEastWestRed(squaresValue) {
  var result = 0;
   for (var i=0; i<squaresValue.length; i++) {
     if (i<46) {
       if((squaresValue[i] == 2 || squaresValue[i] == 3 || squaresValue[i] == 8) &&
          (squaresValue[i+9] == 2 || squaresValue[i+9] == 3 || squaresValue[i+9] == 8) &&
          (squaresValue[i+18] == 2 || squaresValue[i+18] == 3 || squaresValue[i+18] == 8)) {
         result++;
       }
     }
   }
  return result;
}

function calculateSouthWestRed(squaresValue) {
  var result = 0;
   for (var i=0; i<squaresValue.length; i++) {
     if (i<48) {
       if((squaresValue[i] == 2 || squaresValue[i] == 3 || squaresValue[i] == 8) &&
          (squaresValue[i+7] == 2 || squaresValue[i+7] == 3 || squaresValue[i+7] == 8) &&
          (squaresValue[i+14] == 2 || squaresValue[i+14] == 3 || squaresValue[i+14] == 8)) {
         result++;
       }
     }
   }
  return result;
}

function calculateEastBlue(squaresValue) {
  var result = 0;
   for (var i=0; i<48; i++) {
       if((squaresValue[i] == 4 || squaresValue[i] == 6 || squaresValue[i] == 7) &&
          (squaresValue[i+8] == 4 || squaresValue[i+8] == 6 || squaresValue[i+8] == 7) &&
          (squaresValue[i+16] == 4 || squaresValue[i+16] == 6 || squaresValue[i+16] == 7)) {
         result++;
       }
   }

  return result;
}

function calculateWestBlue(squaresValue) {
 var result = 0;
   for (var i=0; i<62; i++) {
     if ((i+3)% 8 >0) {
       if((squaresValue[i] == 4 || squaresValue[i] == 6 || squaresValue[i] == 7) &&
         (squaresValue[i+1] == 4 || squaresValue[i+1] == 6 || squaresValue[i+1] == 7) &&
         (squaresValue[i+2] == 4 || squaresValue[i+2] == 6|| squaresValue[i+2] == 7)) {
         result++;
       }
     }
   }

  return result;
}

function calculateEastWestBlue(squaresValue) {
 var result = 0;
  for (var i=0; i<squaresValue.length; i++) {
    if (i<46) {
      if((squaresValue[i] == 5 || squaresValue[i] == 6 || squaresValue[i] == 8) &&
         (squaresValue[i+9] == 5 || squaresValue[i+9] == 6 || squaresValue[i+9] == 8) &&
         (squaresValue[i+18] == 5 || squaresValue[i+18] == 6 || squaresValue[i+18] == 8)) {
        result++;
      }
    }
  }
 return result;
}

function calculateSouthWestBlue(squaresValue) {
 var result = 0;
  for (var i=0; i<squaresValue.length; i++) {
    if (i<48) {
      if((squaresValue[i] == 5 || squaresValue[i] == 6 || squaresValue[i] == 8) &&
         (squaresValue[i+7] == 5 || squaresValue[i+7] == 6 || squaresValue[i+7] == 8) &&
         (squaresValue[i+14] == 5 || squaresValue[i+14] == 6 || squaresValue[i+14] == 8)) {
        result++;
      }
    }
  }
 return result;
}







export default Game;