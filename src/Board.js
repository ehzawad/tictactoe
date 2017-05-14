import React from 'react';
import Square from './Square.js';
import './index.css';

class Board extends React.Component {
  renderSquare(i) {
    let won = false;
     if (this.props.winnerLine && this.props.winnerLine.indexOf(i) >= 0) {
      // If there is a winning position and positions exist on board
      won = true;
    }

    return (
      <Square
        key={i} value={this.props.squares[i]}
        winnerLine={won}
        onClick={() => this.props.onClick(i)}
      />
    )
  }

  render() {

    const sqrMatrixSize = 3
    let element = []

    for (let row = 0; row < sqrMatrixSize; row++) {
        let squaresBoxs = []
      for (let value = row * sqrMatrixSize; value < row * sqrMatrixSize + sqrMatrixSize; value ++) {
        squaresBoxs.push(this.renderSquare(value))
      }
      element.push(<div className="board-row" key={row}>{squaresBoxs}</div>)
    }

    return (
      <div>
        {element}
      </div>
    );
  }
}

export default Board;
