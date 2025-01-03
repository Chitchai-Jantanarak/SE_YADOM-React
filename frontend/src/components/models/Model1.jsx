/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
Command: npx gltfjsx@6.5.3 ./src/assets/models/model1.glb 
*/

import React from 'react'
import { useGLTF } from '@react-three/drei'

export function Model1(props) {
  const { nodes, materials } = useGLTF('/src/assets/models/model1.glb')
  return (
    <group {...props} dispose={null}>
      <mesh geometry={nodes.Circle001.geometry} material={nodes.Circle001.material} position={[-1.442, 9.631, 0.694]} rotation={[1.482, -0.242, 0.026]} scale={0.474} />
      <mesh geometry={nodes.Circle002.geometry} material={nodes.Circle002.material} position={[-6.566, 7.565, -3.521]} rotation={[1.315, 0.346, 0.563]} scale={0.474} />
      <mesh geometry={nodes.lower.geometry} material={nodes.lower.material} position={[0, 6.075, 0]} rotation={[1.494, 0, 0]} scale={0.474} />
      <mesh geometry={nodes.upper.geometry} material={nodes.upper.material} position={[0, 6.075, 0]} rotation={[1.494, 0, 0]} scale={0.474} />
      <mesh geometry={nodes.mid.geometry} material={nodes.mid.material} position={[0, 6.075, 0]} rotation={[1.494, 0, 0]} scale={0.474} />
    </group>
  )
}

useGLTF.preload('/src/assets/models/model1.glb')
