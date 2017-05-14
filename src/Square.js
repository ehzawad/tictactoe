import React from 'react';
import './index.css';

// functional stateless Component
export default function Square(props) {
  if (props.winnerLine) {
    return (
      <button className="square" onClick={props.onClick} style={{color: "purple"}}>
        {props.value}
      </button>
    );
  }
  else {
    return (
      <button className="square" onClick={props.onClick}>
        {props.value}
      </button>
    );

  }
}


