import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';
import { useChocolateStore } from './chocolateStore';

const Chocolate3D: React.FC = () => {
  const mountRef = useRef<HTMLDivElement | null>(null);
  const chocolateRef = useRef<THREE.Mesh | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  let toppingsGroup = new THREE.Group();

  const { flavor, shape, toppings } = useChocolateStore();

  useEffect(() => {
    if (!mountRef.current) return;

    const scene = new THREE.Scene();
    sceneRef.current = scene;


    const camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000);
    camera.position.set(0, 2, 5);
    cameraRef.current = camera;

    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(mountRef.current.offsetWidth, mountRef.current.offsetHeight);
    mountRef.current.appendChild(renderer.domElement);
    rendererRef.current = renderer;
    
    const ambientLight = new THREE.AmbientLight(0xffffff, 1);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 2);
    directionalLight.position.set(3, 5, 3);
    directionalLight.castShadow = true;
    scene.add(directionalLight);

    const pointLight = new THREE.PointLight(0xffffff, 1.5, 10);
    pointLight.position.set(0, 3, 2);
    scene.add(pointLight);

    scene.background = new THREE.Color(0x87CEEB); 
    scene.fog = new THREE.Fog(0xFFFFFF, 5, 20);

    const material = new THREE.MeshStandardMaterial({
      color: getFlavorColor(flavor),
      metalness: 0.3,
      roughness: 0.4,
    });

    const chocolate = new THREE.Mesh(getShapeGeometry(shape), material);
    scene.add(chocolate);
    chocolateRef.current = chocolate;

    toppingsGroup = createToppings(Array.isArray(toppings) ? toppings : [], chocolate);
    scene.add(toppingsGroup);
    const animate = () => {
      requestAnimationFrame(animate);
      if (chocolateRef.current) {
        chocolateRef.current.rotation.x += 0.01;
        chocolateRef.current.rotation.y += 0.01;
      }
      renderer.render(scene, camera);
    };

    animate();
    const handleResize = () => {
      if (mountRef.current && cameraRef.current && rendererRef.current) {
        const width = mountRef.current.offsetWidth;
        const height = mountRef.current.offsetHeight;
        rendererRef.current.setSize(width, height);
        cameraRef.current.aspect = width / height;
        cameraRef.current.updateProjectionMatrix();
      }
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      if (mountRef.current) {
        mountRef.current.innerHTML = '';
      }
    };
  }, []);

  useEffect(() => {
    if (chocolateRef.current) {
      const newMaterial = new THREE.MeshStandardMaterial({ color: getFlavorColor(flavor) });
      chocolateRef.current.material = newMaterial;
    }
  }, [flavor]);

  useEffect(() => {
    if (chocolateRef.current && sceneRef.current) {
      sceneRef.current.remove(chocolateRef.current);
      sceneRef.current.remove(toppingsGroup);

      const material = new THREE.MeshStandardMaterial({
        color: getFlavorColor(flavor),
        metalness: 0.3,
        roughness: 0.3,
      });

      const newChocolate = new THREE.Mesh(getShapeGeometry(shape), material);
      sceneRef.current.add(newChocolate);
      chocolateRef.current = newChocolate;

      toppingsGroup = createToppings(Array.isArray(toppings) ? toppings : [], newChocolate);
      sceneRef.current.add(toppingsGroup);
    }
  }, [shape, flavor, toppings]);
  const getShapeGeometry = (shape: string): THREE.BufferGeometry => {
    switch (shape) {
      case 'Star':
        return createStarGeometry();
      case 'Heart':
        return createHeartGeometry();
      case 'Rectangle':
      default:
        return new THREE.BoxGeometry(2, 0.5, 1);
    }
  };
  const createStarGeometry = (): THREE.ExtrudeGeometry => {
    const starShape = new THREE.Shape();
    const outerRadius = 1;
    const innerRadius = 0.4;
    for (let i = 0; i < 10; i++) {
      const angle = (i * Math.PI) / 5;
      const radius = i % 2 === 0 ? outerRadius : innerRadius;
      starShape.lineTo(Math.cos(angle) * radius, Math.sin(angle) * radius);
    }
    starShape.closePath();
    return new THREE.ExtrudeGeometry(starShape, { depth: 0.5, bevelEnabled: false });
  };

  const createHeartGeometry = (): THREE.ExtrudeGeometry => {
    const heartShape = new THREE.Shape();
    heartShape.moveTo(0, -0.5);
    heartShape.bezierCurveTo(1, -1.5, 2.5, 0.5, 0, 2);
    heartShape.bezierCurveTo(-2.5, 0.5, -1, -1.5, 0, -0.5);
    return new THREE.ExtrudeGeometry(heartShape, { depth: 0.5, bevelEnabled: false });
  };

  const getFlavorColor = (flavor: string): number => {
    switch (flavor) {
      case 'Vanilla':
        return 0xf1e0a1;
      case 'Dark':
        return 0x1E1209;
      case 'Strawberry':
        return 0xF1A7B1;
      case 'Milk':
      default:
        return 0x6b3f2f;
    }
  };

  
  const createToppings = (toppings: string[], baseMesh: THREE.Mesh) => {
    const group = new THREE.Group();
  
    toppings.forEach((topping) => {
      let geometry, material;
      switch (topping) {
        case 'Nuts':
          geometry = new THREE.SphereGeometry(0.1, 8, 8);
          material = new THREE.MeshStandardMaterial({ color: 0x8B5A2B });
          break;
        case 'Sprinkles':
          geometry = new THREE.CylinderGeometry(0.05, 0.05, 0.2, 6);
          material = new THREE.MeshStandardMaterial({ color: 0xFF69B4 });
          break;
        case 'Syrup':
          geometry = new THREE.SphereGeometry(0.15, 8, 8);
          material = new THREE.MeshStandardMaterial({ color: 0x552200, transparent: true, opacity: 0.8 });
          break;
        default:
          return;
      }
  
      const mesh = new THREE.Mesh(geometry, material);
  
      // Calculate the bounding box of the base mesh
      const boundingBox = new THREE.Box3().setFromObject(baseMesh);
      const size = new THREE.Vector3();
      boundingBox.getSize(size);
  
      
      mesh.position.set(
        (Math.random() - 0.5) * size.x,
        size.y / 2 + 5,              
        (Math.random() - 0.5) * size.z 
      );
  
      group.add(mesh);
    });
  
    return group;
  };

  return <div ref={mountRef} style={{ width: '50vw', height: '500px' }} />;
};

export default Chocolate3D;
