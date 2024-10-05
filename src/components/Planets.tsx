import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Stars, Text } from '@react-three/drei';
import * as THREE from 'three';
import { PlanetData } from '../utils/type'; // Import PlanetData from types
import { calculatePosition } from '../utils/PlanetaryCalculations'; // Import calculatePosition function

const distanceScale = 150; // Scaling for display purposes

function Planets({ planet }: { planet: PlanetData }) {
	const ref = useRef<THREE.Mesh>(null);

	useFrame(({ clock }) => {
		const time = clock.getElapsedTime() * 10; // Increase speed (factor of 50)
		const { x, y, z } = calculatePosition(planet, time);
		if (ref.current) {
			ref.current.position.set(x * distanceScale, y * distanceScale, z * distanceScale); // Apply distance scaling
		}
	});

	return (
		<>
			<mesh ref={ref}>
				<sphereGeometry args={[planet.radius, 32, 32]} />
				<meshStandardMaterial color={planet.color} emissive={planet.color} emissiveIntensity={0.5} />
			</mesh>
			{ref.current && (
				<Text
					position={[ref.current.position.x, ref.current.position.y + planet.radius * 2, ref.current.position.z]} // Position above the planet
					fontSize={2}
					color="white"
					anchorX="center"
					anchorY="middle"
				>
					{planet.name}
				</Text>
			)}
		</>
	);
}


export default Planets;