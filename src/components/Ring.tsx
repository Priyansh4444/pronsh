import {
  useGLTF,
  MeshTransmissionMaterial,
  Text3D,
  useEnvironment,
} from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import { useEffect, useMemo, useRef, useState, useTransition } from "react";
import { Group, Mesh } from "three";
import * as THREE from "three";
export function Ring() {
  const materialProps = {
    thickness: 10,
    roughness: 0,
    transmission: 1,
    ior: 4,
    chromaticAberrations: 1,
    backside: true,
  };
  const values = {
    thicknes: 1.05,
    chromaticAbberations: 1,
    ior: 2.0,
    roughness: 0.2,
    transmission: 1,
    backside: true,
  };

  const ref = useRef<Mesh>(null!);
  const groupRef = useRef<Group>(null!);
  const secondHandRef = useRef<Group>(null!);
  const minuteHandRef = useRef<Group>(null!);
  const hourHandRef = useRef<Group>(null!);
  const { mouse } = useThree();
  const [isPending, startTransition] = useTransition();
  useFrame(() => {
    if (groupRef.current) {
      groupRef.current.rotation.x = mouse.y * 0.5;
      groupRef.current.rotation.y = -mouse.x * 0.5;
    }
    const seconds = scrollY / 100;
    const secondRotation = (seconds / 60) * Math.PI * 2; // Smooth scroll influence
    if (secondHandRef.current) {
      secondHandRef.current.rotation.z = -secondRotation;
    }
  });
  useEffect(() => {
    const now = new Date();
    const seconds = now.getSeconds();
    const minutes = now.getMinutes();
    const hours = now.getHours();

    const secondRotation = (seconds / 60) * Math.PI * 2;
    const minuteRotation = (minutes / 60) * Math.PI * 2 + secondRotation / 60;
    const hourRotation = (hours / 12) * Math.PI * 2 + minuteRotation / 12;

    if (secondHandRef.current) {
      secondHandRef.current.rotation.z = -secondRotation;
    }
    if (minuteHandRef.current) {
      minuteHandRef.current.rotation.z = -minuteRotation;
    }
    if (hourHandRef.current) {
      hourHandRef.current.rotation.z = -hourRotation;
    }
  });
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const a = useGLTF("/clock.glb");
  const b = useGLTF("/hourhand.glb");
  const c = useGLTF("/minutehand.glb");
  const d = useGLTF("/secondhand.glb");

  const nodes1 = useMemo(() => a.nodes, [a]);
  const nodes2 = useMemo(() => b.nodes, [b]);
  const nodes3 = useMemo(() => c.nodes, [c]);
  const nodes4 = useMemo(() => d.nodes, [d]);
  const environment = useEnvironment({
    files: "/aerodynamics_workshop_1k.hdr",
  });

  return (
    <group ref={groupRef} dispose={null} scale={10} position={[0, 0, -325.5]}>
      <Text3D
        font={"/Comfortaa_Regular.json"}
        position={[-20, 15, 0]}
        scale={[8, 8.5, 5.0]}
        rotation={[0, 0, 0]}
      >
        <meshStandardMaterial metalness={2.2} color={"black"} />
        Pronsh
      </Text3D>
      <mesh
        position={[0, 0, 8]}
        rotation={[Math.PI / 2.0, 0, 0]}
        scale={3}
        ref={ref}
        geometry={(nodes1.Torus as THREE.Mesh).geometry}
      >
        <MeshTransmissionMaterial {...materialProps} />
      </mesh>
      <group scale={10}>
        <group ref={hourHandRef}>
          <mesh geometry={(nodes2.Plane004 as THREE.Mesh).geometry} scale={1.5}>
            <meshBasicMaterial color={"#FFD700"} envMap={environment} />
          </mesh>
          <mesh
            geometry={(nodes2.Plane004_1 as THREE.Mesh).geometry}
            scale={1.5}
          >
            <meshBasicMaterial color={"#FFD700"} envMap={environment} />
          </mesh>
        </group>
        <group ref={minuteHandRef}>
          <mesh
            castShadow
            receiveShadow
            geometry={(nodes3.Plane005 as THREE.Mesh).geometry}
            scale={1.9}
          >
            <meshBasicMaterial color={"#FFD700"} envMap={environment} />
          </mesh>
          <mesh
            castShadow
            receiveShadow
            geometry={(nodes3.Plane005_1 as THREE.Mesh).geometry}
            scale={1.9}
          >
            <meshBasicMaterial color={"#FFD700"} envMap={environment} />
          </mesh>
        </group>
        <group ref={secondHandRef}>
          <mesh
            castShadow
            receiveShadow
            geometry={(nodes4.Plane005 as THREE.Mesh).geometry}
            scale={2}
          >
            <meshBasicMaterial color={"#FFD700"} envMap={environment} />
          </mesh>
          <mesh
            castShadow
            receiveShadow
            geometry={(nodes4.Circle006 as THREE.Mesh).geometry}
            scale={2}
          >
            <meshBasicMaterial color={"#FFD700"} envMap={environment} />
          </mesh>
        </group>
      </group>
    </group>
  );
}
