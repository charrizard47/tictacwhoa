import React from 'react';
import ReactDOM from 'react-dom';

class Board extends React.Component { //board

  renderSquare(i) { //render square method takes in a number
    if (this.props.winningTiles != null && (
        (i == this.props.winningTiles[0] || 
        i == this.props.winningTiles[1] || 
        i == this.props.winningTiles[2]))){
      //make winning tile yellow
      return (
        <Square 
          value ={this.props.squares[i]}
          color= 'blue'
          onClick={() => this.props.onClick(i)}/>
      )
    } else {
      return (
      <Square 
        value ={this.props.squares[i]}
        color= 'white'
        onClick={() => this.props.onClick(i)}/>
      );
    }
  }

  
  render() {

    return (
      <div>
        <div className="board-row">
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
        </div>
        <div className="board-row">
          {this.renderSquare(3)}
          {this.renderSquare(4)}
          {this.renderSquare(5)}
        </div>
        <div className="board-row">
          {this.renderSquare(6)}
          {this.renderSquare(7)}
          {this.renderSquare(8)}
        </div>
      </div>
    );
  }
}

function Square(props) {
  return (
      <button className={'square ' + props.color } onClick={props.onClick}>
          {props.value}
      </button>
  )
}

export default Board;