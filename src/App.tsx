import React, {useState} from 'react';
import './App.css';

type TPoint = {
    xPos: number,
    yPos: number
}

function App() {
    const [circles, setCircles] = useState<TPoint[]>([]);
    const [removedCircles, setRemovedCircles] = useState<TPoint[]>([]);

    const createCircle = (xPos: number, yPos: number, idx: number): JSX.Element => {
        return <div
            className={'circle'}
            key={`circle-${idx}`}
            style={{
                top: `${yPos}px`,
                left: `${xPos}px`
            }}
        >
        </div>;
    };


    function removeLastCircle(e: React.MouseEvent<HTMLButtonElement>) {
        e.stopPropagation();
        setRemovedCircles(curr => [...curr, circles[circles.length - 1]]);
        setCircles([...circles.slice(0, circles.length - 1)]);
    }

    function restoreLastCircle(e: React.MouseEvent<HTMLButtonElement>) {
        e.stopPropagation();
        setCircles([...circles, removedCircles[removedCircles.length - 1]]);
        setRemovedCircles([...removedCircles.slice(0, removedCircles.length - 1)]);
    }

    return (
        <div
            className="App"
            onClick={e => setCircles([...circles, {xPos: e.clientX, yPos: e.clientY}])}
        >
            <div className={'buttonsArea'}>
                <button
                    className={'button'}
                    onClick={e => removeLastCircle(e)}
                    disabled={circles.length === 0}
                >
                        Undo
                </button>
                <button
                    className={'button'}
                    onClick={e => restoreLastCircle(e)}
                    disabled={removedCircles.length === 0}
                >
                        Redo
                </button>
            </div>

            {circles.map((circle, idx: number) => createCircle(circle.xPos, circle.yPos, idx))}
        </div>
    );
}

export default App;
