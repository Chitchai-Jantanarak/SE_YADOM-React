/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
Command: npx gltfjsx@6.5.3 ./public/models/test4.glb 
*/

import React from 'react'
import { useGLTF } from '@react-three/drei'
import { MeshBasicMaterial } from 'three'

export function Cloud(props) {
  const { nodes, materials } = useGLTF('/models/cloud.glb')
  return (
    <group {...props} dispose={null}>
      <mesh 
        geometry={nodes.Cloud.geometry} 
        material={materials['Material.001']}        
        position={[0, 0, 0]} 
        rotation={[0, 0, 0]} 
        scale={1}
      />
    </group>
  )
}

useGLTF.preload('/models/cloud.glb')
