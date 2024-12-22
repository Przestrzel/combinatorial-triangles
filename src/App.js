import { useEffect, useState } from 'react';
import { generateTriangle, numberDivideFn, pascalFn, setDivideFn } from './utils';

function App() {
  const [size, setSize] = useState(20);
  const [squareSize, setSquareSize] = useState(8);
  const [modulo, setModulo] = useState(null);
  const [triangleModulo, setTriangleModulo] = useState(null);
  const [triangle, setTriangle] = useState(generateTriangle(20));
  const [triangleType, setTriangleType] = useState('pascal');

  const getTriangleFn = () => {
    if(triangleType === 'pascal') return pascalFn
    else if(triangleType === 'number') return numberDivideFn
    return setDivideFn;
  }

  useEffect(() => {
    console.log('Triangle changed', triangle)
  }, [triangle])

  return (
    <div className="App">
      <div className="utils">
        <div>
          <label>Size:</label>
          <input type="number" value={size ?? 0} onChange={(e) => {
            setSize(Number(e.target.value));
          }}
          />
        </div>
        <div>
          <label>Modulo:</label>
          <input type="number" value={modulo ?? 0} onChange={(e) => {
            setModulo(Number(e.target.value));
          }}
          />
        </div>
        <div>
          <label>
          Triangle type:
          <select name="triangleType" value={triangleType} onChange={(e) => {
            setTriangleType(e.target.value);
          }}>
            <option value="pascal">Pascal</option>
            <option value="number">Number division</option>
            <option value="set">Set division</option>
          </select>
        </label>
        </div>
        <div>
          <label>Square size:</label>
          <input type="number" value={squareSize} onChange={(e) => {
            setSquareSize(Number(e.target.value));
          }}
          />
        </div>
        <div>
          <button onClick={() => {
            setTriangle(generateTriangle(size, getTriangleFn()));
            setTriangleModulo(modulo);
          }}>
            Generate triangle
          </button>
        </div>
      </div>
      <div className="triangle">
        {
          triangleModulo === null || triangleModulo === 0 ?
          triangle.map((row, rowIndex) => (
            <div key={rowIndex} className="row">
              {row.map((value, colIndex) => (
                <span key={colIndex}>{value.toString()}</span>
              ))}
            </div>
          )) : triangle.map((row, rowIndex) => (
            <div key={rowIndex} className="row" style={{ height: squareSize}}>
              {row.map((value, colIndex) => (
                <span
                  style={{width: squareSize, height: squareSize}}
                  key={colIndex}
                  className={!value.modulo(triangleModulo).isEqualTo(0) ? 'filled' : 'empty'}
                />
              ))}
            </div>
          ))
        }
      </div>
    </div>
  );
}

export default App;
