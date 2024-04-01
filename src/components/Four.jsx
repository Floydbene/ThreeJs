import {
  Environment,
  OrbitControls,
  PerspectiveCamera,
} from '@react-three/drei';
import { Vector3 } from 'three';
import { React, useEffect } from 'react';
import { useGLTF, SpotLight, useDepthBuffer } from '@react-three/drei';
import * as THREE from 'three';
import { degreesToRadians } from '../utils/degreesToRadians';
import { useFrame, useThree } from '@react-three/fiber';
import { useRef } from 'react';
import { Model } from './Pop_dog';

const Four = () => {
  const vec = new Vector3();
  const camera = useRef();
  const orbitalRef = useRef(null);
  const light = useRef();
  const light2 = useRef();
  const viewport = useThree((state) => state.viewport);
  const depthBuffer = useDepthBuffer({ frames: 1 });
  useFrame((state) => {
    // camera.rotation.set(0, 0, 0);
    // console.log(camera);

    if (!!orbitalRef.current) {
      const { x, y } = state.pointer;
      orbitalRef.current.setAzimuthalAngle(x * degreesToRadians(-5));
    }
    state.camera.lookAt(0, 1, 0);
    // light.current.target.position.lerp(
    //   vec.set(
    //     -state.pointer.x * viewport.width,
    //     -state.pointer.y * 0.2 * viewport.height + 2 * viewport.height,
    //     +state.pointer.y * viewport.height + 2 * viewport.height
    //   ),
    //   0.1
    // );
    // light.current.target.updateMatrixWorld();
  });
  return (
    <>
      <OrbitControls
        ref={orbitalRef}
        maxAzimuthAngle={degreesToRadians(80)}
        minAzimuthAngle={degreesToRadians(-80)}
        minPolarAngle={degreesToRadians(80)}
        maxPolarAngle={degreesToRadians(80)}
        maxDistance={10}
        target={[0, 1, 1]}
      />
      <PerspectiveCamera makeDefault position={[0, 1, 1]} ref={camera} />
      {/* <mesh position={[-2, 1.5, 0]} castShadow ref={ballRef}>
        <sphereGeometry args={[0.5, 32, 32]} />
        <meshStandardMaterial color='grey' metalness={0.8} roughness={0.7} />
      </mesh> */}
      <Model castShadow />
      <mesh rotation={[degreesToRadians(90), 0, 0]} receiveShadow>
        <planeGeometry args={[2000, 2000]} />
        <meshPhongMaterial color='black' side={2} />
      </mesh>
      <mesh rotation={[0, 0, 0]} receiveShadow position={[0, 0, -5]}>
        <planeGeometry args={[2000, 2000]} />
        <meshPhongMaterial color='black' side={2} />
      </mesh>
      <ambientLight args={['#fff', 0.01]} />
      <fog attach='fog' args={['#000000', 20, 30]} />
      {/* <spotLight
        ref={light}
        args={['#f2ff35', 25]}
        castShadow
        position={[2, 2, 0]}
        penumbra={0.7}
        // target={[0, 0, 0]}
      /> */}
      <spotLight
        ref={light}
        args={['white', 100]}
        castShadow
        position={[0, 0.8, 0]}
        penumbra={100}
        // lookAt={[0, 0, 10]}
        // target={[0, 0, 0]}
      />
      <Environment background>
        <mesh>
          <sphereGeometry args={[50, 50, 50]} />
          <meshBasicMaterial side={THREE.BackSide} color='#000000' />
        </mesh>
      </Environment>{' '}
    </>
  );
};

export default Four;
