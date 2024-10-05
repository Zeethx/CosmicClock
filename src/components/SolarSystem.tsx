'use client';

import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Stars, Text } from '@react-three/drei';
import * as THREE from 'three';
import { PlanetData } from '../utils/type';
// Scale factor to adjust the distances from the Sun to fit the screen.
import Planets from './Planets';
import Sun from './Sun';

// Planetary data with Keplerian elements from the provided table
const planetsData: PlanetData[] = [
	{
		name: "Mercury",
		semiMajorAxis: 0.38709927, // Distance from the Sun in AU
		eccentricity: 0.20563593,
		inclination: 7.00497902, // Inclination in degrees
		meanLongitude: 252.25032350,
		longitudeOfPerihelion: 77.45779628,
		longitudeOfAscendingNode: 48.33076593,
		meanMotion: 4.09233445, // Mean motion in degrees per day
		color: 'gray',
		radius: 4 // Planet size
	},
	{
		name: "Venus",
		semiMajorAxis: 0.72333566,
		eccentricity: 0.00677672,
		inclination: 3.39467605,
		meanLongitude: 181.97909950,
		longitudeOfPerihelion: 131.60246718,
		longitudeOfAscendingNode: 76.67984255,
		meanMotion: 1.60213034,
		color: 'yellow',
		radius: 5
	},
	{
		name: "Earth",
		semiMajorAxis: 1.00000261,
		eccentricity: 0.01671123,
		inclination: 0.00001531,
		meanLongitude: 100.46457166,
		longitudeOfPerihelion: 102.93768193,
		longitudeOfAscendingNode: 0,
		meanMotion: 0.985608,
		color: 'blue',
		radius: 5
	},
	{
		name: "Mars",
		semiMajorAxis: 1.52371034,
		eccentricity: 0.09339410,
		inclination: 1.84969142,
		meanLongitude: -4.55343205,
		longitudeOfPerihelion: -23.94362959,
		longitudeOfAscendingNode: 49.55953891,
		meanMotion: 0.524071,
		color: 'red',
		radius: 4
	},
	{
		name: "Jupiter",
		semiMajorAxis: 5.20288700,
		eccentricity: 0.04838624,
		inclination: 1.30439695,
		meanLongitude: 34.39644051,
		longitudeOfPerihelion: 14.72847983,
		longitudeOfAscendingNode: 100.47390909,
		meanMotion: 0.08309256,
		color: 'orange',
		radius: 8
	},
	{
		name: "Saturn",
		semiMajorAxis: 9.53667594,
		eccentricity: 0.05386179,
		inclination: 2.48599187,
		meanLongitude: 49.95424423,
		longitudeOfPerihelion: 92.59887831,
		longitudeOfAscendingNode: 113.66242448,
		meanMotion: 0.03345104,
		color: 'lightyellow',
		radius: 7
	},
	{
		name: "Uranus",
		semiMajorAxis: 19.18916464,
		eccentricity: 0.04725744,
		inclination: 0.77263783,
		meanLongitude: 313.23810451,
		longitudeOfPerihelion: 170.95427630,
		longitudeOfAscendingNode: 74.01692503,
		meanMotion: 0.01177129,
		color: 'lightblue',
		radius: 6
	},
	{
		name: "Neptune",
		semiMajorAxis: 30.06992276,
		eccentricity: 0.00859048,
		inclination: 1.77004347,
		meanLongitude: -55.12002969,
		longitudeOfPerihelion: 44.96476227,
		longitudeOfAscendingNode: 131.78422574,
		meanMotion: 0.00598103,
		color: 'darkblue',
		radius: 6
	}
];



// Solar system scene with Canvas and lighting
const SolarSystem = () => {
	return (
		<Canvas
			style={{ width: '100vw', height: '100vh' }}
			gl={{ alpha: false, antialias: true }}
			camera={{ position: [0, 0, 3000], fov: 70 }}  // Adjusted the camera for better view of the solar system
			onCreated={({ gl }) => {
				gl.setClearColor('#000000'); // Set background color to black (space-like)
			}}
		>
			<ambientLight intensity={1} />
			<pointLight position={[0, 0, 0]} intensity={3} /> {/* Sunlight effect */}
			<Stars radius={300} depth={50} count={5000} factor={7} fade />
			<OrbitControls enablePan={true} enableZoom={true} enableRotate={true} /> {/* Enable free movement */}
			<Sun /> {/* Render the Sun at the center */}
			{planetsData.map((planet) => (
				<Planets key={planet.name} planet={planet} />
			))}
		</Canvas>
	);
};

export default SolarSystem;
