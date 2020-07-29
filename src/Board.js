import React from 'react';

class Board extends React.Component { //board

  renderRow(i) {
    var row = i;
    const result = [];

    for (row; row<i+8 ; row++) {
      result.push(this.renderSquare(row));
    }
    return result;
    
  }

  renderSquare(i) { //render square method takes in a number
      return (
      <Square 
        source ={this.props.squares[i]}
        color= 'white'
        onClick={() => this.props.onClick(i)}
        test = {i}
        />
      );
  }

  
  render() {

    return (
      <div>
        <div className="board-row">
          {this.renderRow(1)}
        </div>
        <div className="board-row">
          {this.renderRow(9)}
        </div>
        <div className="board-row">
          {this.renderRow(17)}
        </div>
        <div className="board-row">
          {this.renderRow(25)}
        </div>
        <div className="board-row">
          {this.renderRow(33)}
        </div>
        <div className="board-row">
          {this.renderRow(41)}
        </div>
        <div className="board-row">
          {this.renderRow(49)}
        </div>
        <div className="board-row">
          {this.renderRow(57)}
        </div>
        






      </div>
    );
  }
}

function Square(props) {
  //<img className={'pieces'} src={props.source}/> 
  return (
      <button className={"square"} onClick={props.onClick}>
        <img className={'pieces'} src={props.source}/> 
      </button>
  )
}

export default Board;