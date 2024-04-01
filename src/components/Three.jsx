import {
  Environment,
  OrbitControls,
  PerspectiveCamera,
} from '@react-three/drei';
import { Vector3 } from 'three';
import React from 'react';
import { useGLTF, SpotLight, useDepthBuffer } from '@react-three/drei';
import * as THREE from 'three';
import { degreesToRadians } from '../utils/degreesToRadians';
import { useFrame, useThree } from '@react-three/fiber';
import { useRef } from 'react';
import { useEffect } from 'react';
import { Model } from './Pop_dog';
import gsap from 'gsap';
import { useState } from 'react';

const Three = () => {
  const vec = new Vector3();
  const orbitalRef = useRef(null);
  const light = useRef();
  const light2 = useRef();
  const viewport = useThree((state) => state.viewport);
  const depthBuffer = useDepthBuffer({ frames: 1 });
  useFrame((state) => {
    light.current.target.position.lerp(
      vec.set(
        (state.mouse.x * viewport.width) / 2,
        (state.mouse.y * viewport.height) / 2,
        (state.mouse.y * viewport.height) / -2
      ),
      0.1
    );
    light.current.target.updateMatrixWorld();
    light2.current.target.position.lerp(
      vec.set(
        (state.pointer.x * viewport.width) / 2,
        (state.pointer.y * viewport.height) / 2,
        (state.pointer.y * viewport.height) / -2
      ),
      0.1
    );
    light2.current.target.updateMatrixWorld();
  });
  return (
    <>
      <OrbitControls
        ref={orbitalRef}
        maxPolarAngle={degreesToRadians(80)}
        maxAzimuthAngle={degreesToRadians(80)}
        minAzimuthAngle={degreesToRadians(-80)}
        maxDistance={20}
      />
      <PerspectiveCamera makeDefault position={[0, 1, 10]} />
      {/* <mesh position={[-2, 1.5, 0]} castShadow ref={ballRef}>
        <sphereGeometry args={[0.5, 32, 32]} />
        <meshStandardMaterial color='grey' metalness={0.8} roughness={0.7} />
      </mesh> */}
      <Model castShadow />
      <mesh rotation={[degreesToRadians(90), 0, 0]} receiveShadow>
        <planeGeometry args={[2000, 2000]} />
        <meshPhongMaterial color='#1ea3d8' side={2} />
      </mesh>
      <mesh rotation={[0, 0, 0]} receiveShadow position={[0, 0, -5]}>
        <planeGeometry args={[2000, 2000]} />
        <meshPhongMaterial color='#1ea3d8' side={2} />
      </mesh>
      <ambientLight args={['#fff', 0.5]} />
      <fog attach='fog' args={['#000000', 20, 30]} />
      <spotLight
        ref={light}
        args={['#f2ff35', 25]}
        castShadow
        position={[2, 2, 0]}
        penumbra={0.7}
        // target={[0, 0, 0]}
      />
      <spotLight
        ref={light2}
        args={['#ff7e7e', 105]}
        castShadow
        position={[-2, 2, 2]}
        penumbra={0.7}
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

export default Three;
