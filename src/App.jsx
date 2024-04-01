import './App.css';
import { Canvas } from '@react-three/fiber';
import { Suspense, useState } from 'react';
import Three from './components/Three';
import Four from './components/Four';

function App() {
  const [far, setFar] = useState(true);
  return (
    <>
      <Canvas id='three-canvas' shadows>
        <Suspense fallback={null}>{far ? <Three /> : <Four />}</Suspense>
      </Canvas>
      <button
        style={{ position: 'absolute', color: 'red', zIndex: 2 }}
        onClick={() => setFar(!far)}
      >
        Clickma
      </button>
    </>
  );
}

export default App;
