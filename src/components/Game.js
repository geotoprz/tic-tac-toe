import React, {useState} from 'react'
import { calculateWinner } from '../helper'
import Board from './Board'

const styles = {
    width: '200px',
    margin: '20px auto'
}

const styles2 = {
    display: 'grid',
    justifyContent: 'center',
    alignItems:'center'
}

const Game = () => {

    const [history, setHistory] = useState([Array(9).fill(null)])
    const [stepNumber, setStepNumber] = useState(0);
    var [xIsNext, setXIsNext] = useState(true)
    const winner = calculateWinner(history[stepNumber]);

    const handleClick = (i) => {
        const timeInHistory = history.slice(0, stepNumber + 1)
        const current = timeInHistory[stepNumber]
        const squares= [...current]
        //if user click an occupied sqr or if game is won return
        if (winner || squares[i]) return;
        // punt an X or an O in the clicked sqr
        squares[i] = xIsNext ? 'X' : 'O'
        setHistory([...timeInHistory, squares])
        setStepNumber(timeInHistory.length)
        setXIsNext(!xIsNext);
    }

    const jumpTo = (step) => {
        setStepNumber(step);
        // eslint-disable-next-line no-const-assign
        setXIsNext =(step % 2 === 0 )
    }

    const renderMoves = () => (
        history.map((_step, move) => {
            const destination = move ? `Go to move #${move}` : 'Go to start';
            return (
                <li key={move}>
                    <button onClick={() => jumpTo(move)}>{destination}</button>
                </li>
            )
        })   
    )

    return (
        <div style={styles2}>
            <Board squares={history[stepNumber]} onClick={handleClick} />
            <div style={styles}>
                <p>
                    {winner ? 'Winner ' + winner : 'Next player:' + (xIsNext ? ' X ' : ' O ')}
                    {renderMoves()}
                </p>
            </div>
        </div>
    )
}

export default Game;
