
import * as THREE from 'three';
import { PlanetData } from './type'; // Import PlanetData from types

// Helper function to solve Kepler's equation and get eccentric anomaly
const solveKepler = (M: number, e: number): number => {
	let E = M; // Initial guess for eccentric anomaly
	for (let i = 0; i < 5; i++) {
		E = M + e * Math.sin(E); // Iteratively solve Kepler's equation
	}
	return E;
};

// Function to calculate planet position using Keplerian elements
const calculatePosition = (planet: PlanetData, time: number) => {
	const {
		semiMajorAxis: a,
		eccentricity: e,
		inclination: I,
		meanLongitude: L,
		longitudeOfPerihelion: w,
		longitudeOfAscendingNode: omega,
		meanMotion
	} = planet;

	// Step 1: Compute the mean anomaly (M)
	const M = THREE.MathUtils.degToRad((L - w) + time * meanMotion); // Adjusting time for degrees per day

	// Step 2: Solve Kepler's equation to get the eccentric anomaly (E)
	const E = solveKepler(M, e);

	// Step 3: Calculate true anomaly (v) and heliocentric distance (r)
	const v = 2 * Math.atan2(
		Math.sqrt(1 + e) * Math.sin(E / 2),
		Math.sqrt(1 - e) * Math.cos(E / 2)
	);
	const r = a * (1 - e * Math.cos(E));

	// Step 4: Calculate position in 2D
	const x_prime = r * Math.cos(v);
	const y_prime = r * Math.sin(v);

	// Step 5: Convert to 3D using inclination and node
	const cosOmega = Math.cos(THREE.MathUtils.degToRad(omega));
	const sinOmega = Math.sin(THREE.MathUtils.degToRad(omega));
	const cosI = Math.cos(THREE.MathUtils.degToRad(I));
	const sinI = Math.sin(THREE.MathUtils.degToRad(I));

	const x = cosOmega * x_prime - sinOmega * cosI * y_prime;
	const y = sinOmega * x_prime + cosOmega * cosI * y_prime;
	const z = sinI * y_prime;

	return { x, y, z };
};

export { calculatePosition }; // Export calculatePosition function