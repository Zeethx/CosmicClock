// Sun component with glowing effect
const Sun = () => {
	const sunRadius = 10;

	return (
		<mesh position={[0, 0, 0]}>
			<sphereGeometry args={[sunRadius, 64, 64]} />
			<meshStandardMaterial emissive={'yellow'} emissiveIntensity={10} />
		</mesh>
	);
};

export default Sun;