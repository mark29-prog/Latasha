export default function ProductLighting() {
  return (
    <>
      <ambientLight intensity={0.48} />
      <hemisphereLight args={["#fff8e8", "#31251d", 1.15]} />
      <directionalLight position={[3, 5, 6]} intensity={2.6} />
      <pointLight position={[-3, 1.5, 3]} intensity={2.4} distance={8} color="#d6b16b" />
      <pointLight position={[3, 0, 4]} intensity={1.3} distance={7} color="#fff8e8" />
      <spotLight position={[0, 4, -4]} intensity={2.2} angle={0.55} penumbra={1} distance={10} color="#d6b16b" />
    </>
  );
}
