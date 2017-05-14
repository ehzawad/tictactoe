import React from 'react';
import Board from './Board.js';
import './index.css';

class Game extends React.Component {
  constructor() {
    super();
    this.state = {
      history: [{
        squares: Array(9).fill(null),
        rowColumnLocation: [0, 0],
      }],
      stepNumber: 0,
      xIsNext: true,
      sortOrder: 0,
    };
  }

  handleClick(i) {
    const history = this.state.history.slice(0, this.state.stepNumber + 1)
    const current = history[history.length - 1];
    const squares = current.squares.slice();

    if (calculateWinner(squares) || squares[i]) {
      return;
    }
    squares[i] = this.state.xIsNext ? 'X' : 'O';
    this.setState({
      history: history.concat([{
        squares: squares,
        rowColumnLocation: [Math.floor(i / 3) + 1, i % 3],
      }]),
      xIsNext: !this.state.xIsNext,
      stepNumber: history.length,
    });
  }

  jumpTo(step) {
    this.setState({
      stepNumber: step, xIsNext: (step % 2) ? false : true,
    })
  }

  toggleSort() {
    const sortOrder = this.state.sortOrder;
    this.setState({
      sortOrder: ~sortOrder,
    })
  }

  render() {
    const history = this.state.history;
    const current = history[this.state.stepNumber];
    const winner = calculateWinner(current.squares);
    const winnerSymbol = winner ? winner.symbol : null;
    const winnerLine = winner ? winner.line : [];

    const sortingBy = this.state.sortOrder;

    // storing the moves
    const moves = history.map((step, move) => {
      const rowColumnLocation = step.rowColumnLocation;
      const desc = move ? 'Move #' + move + ' (' + rowColumnLocation[0] + ', ' + rowColumnLocation[1] + ' )' : 'Game Start';

      if (move === history.length - 1) {
        return (
          <li key={move}>
            <a href="#" onClick={() => this.jumpTo(move)} style={{fontWeight : "bold"}}>{desc}</a>
        </li>
        );
      }else {
        return (
          <li key={move}>
            <a href="#" onClick={() => this.jumpTo(move)}>{desc}</a>
        </li>
        );
      }
    })


    let status;
    if (winnerSymbol) {
      status = 'Winner: ' + winnerSymbol;
      // console.log(winnerLine)
    } else {
      status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
    }

    return (
      <div className="game">
        <div className="game-board">
          <Board
            squares={current.squares}
            onClick={(i) => this.handleClick(i)}
            winnerLine={winnerLine}
          />
        </div>
        <div className="game-info">
          <div>{status}</div>
          <div>
            <button onClick={() => this.toggleSort()}>StateHistoryOrderToggle
            </button>
          </div>
          <div>
          {
            (() => {
              return (sortingBy === 0 ) ? <ol>{moves}</ol> : <ol>{moves.reverse()}</ol>
            })()
          }
          </div>
        </div>
      </div>
    );
  }
}

function calculateWinner(squares) {
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
      return {symbol : squares[a], line : [a, b, c]}
    }
  }
  return null;
}

export default Game;
