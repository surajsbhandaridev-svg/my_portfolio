import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

export const CpuProcessor3D: React.FC = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const width = container.clientWidth || 450;
    const height = container.clientHeight || 450;

    // Scene
    const scene = new THREE.Scene();

    // Camera
    const camera = new THREE.PerspectiveCamera(40, width / height, 0.1, 1000);
    camera.position.set(0, 5, 8);
    camera.lookAt(0, 0, 0);

    // Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    container.appendChild(renderer.domElement);

    // Group for CPU assembly
    const cpuGroup = new THREE.Group();
    scene.add(cpuGroup);

    // 1. Green/Dark Substrate PCB
    const substrateGeo = new THREE.BoxGeometry(3.6, 0.18, 3.6);
    const substrateMat = new THREE.MeshStandardMaterial({
      color: 0x141816,
      roughness: 0.4,
      metalness: 0.6,
    });
    const substrate = new THREE.Mesh(substrateGeo, substrateMat);
    cpuGroup.add(substrate);

    // 2. Substrate Edge / Golden Bevel
    const edgeGeo = new THREE.BoxGeometry(3.64, 0.04, 3.64);
    const edgeMat = new THREE.MeshStandardMaterial({
      color: 0x99773d,
      metalness: 0.9,
      roughness: 0.3,
    });
    const edge = new THREE.Mesh(edgeGeo, edgeMat);
    edge.position.y = 0.05;
    cpuGroup.add(edge);

    // 3. Metallic Heat Spreader (IHS)
    const ihsGeo = new THREE.BoxGeometry(2.6, 0.28, 2.6);
    const ihsMat = new THREE.MeshStandardMaterial({
      color: 0x303036,
      metalness: 0.85,
      roughness: 0.25,
    });
    const ihs = new THREE.Mesh(ihsGeo, ihsMat);
    ihs.position.y = 0.22;
    cpuGroup.add(ihs);

    // 4. Center Die Accent Plate
    const dieGeo = new THREE.BoxGeometry(1.8, 0.04, 1.8);
    const dieMat = new THREE.MeshStandardMaterial({
      color: 0x1b1c22,
      metalness: 0.95,
      roughness: 0.1,
    });
    const die = new THREE.Mesh(dieGeo, dieMat);
    die.position.y = 0.38;
    cpuGroup.add(die);

    // 5. Silicon Laser Marking Canvas Texture
    const canvas = document.createElement('canvas');
    canvas.width = 512;
    canvas.height = 512;
    const ctx = canvas.getContext('2d');
    if (ctx) {
      ctx.fillStyle = '#1e2029';
      ctx.fillRect(0, 0, 512, 512);

      // Gold architectural markings
      ctx.strokeStyle = '#d4af37';
      ctx.lineWidth = 4;
      ctx.strokeRect(20, 20, 472, 472);

      ctx.fillStyle = '#f0e9ef';
      ctx.font = 'bold 34px monospace';
      ctx.textAlign = 'center';
      ctx.fillText('SURAJ-CORE i7', 256, 180);

      ctx.font = '22px monospace';
      ctx.fillStyle = '#76A9FF';
      ctx.fillText('CSE-GEU // x86_64', 256, 230);

      ctx.font = '16px monospace';
      ctx.fillStyle = '#F2A6AC';
      ctx.fillText('ENG JOURNAL v2026', 256, 280);

      // Binary decoration
      ctx.font = '14px monospace';
      ctx.fillStyle = 'rgba(255,255,255,0.3)';
      ctx.fillText('01010011 01010101 01010010 01000001 01001010', 256, 340);
    }

    const labelTexture = new THREE.CanvasTexture(canvas);
    const labelMat = new THREE.MeshStandardMaterial({
      map: labelTexture,
      roughness: 0.3,
      metalness: 0.5,
    });
    const labelMesh = new THREE.Mesh(new THREE.PlaneGeometry(1.7, 1.7), labelMat);
    labelMesh.rotation.x = -Math.PI / 2;
    labelMesh.position.y = 0.405;
    cpuGroup.add(labelMesh);

    // 6. Perimeter Pins / Capacitors
    const pinGeo = new THREE.BoxGeometry(0.08, 0.16, 0.08);
    const pinMat = new THREE.MeshStandardMaterial({
      color: 0xd4af37,
      metalness: 0.95,
      roughness: 0.2,
    });

    const pinsPerSide = 14;
    const spacing = 3.4 / (pinsPerSide - 1);
    const offset = 3.4 / 2;

    for (let i = 0; i < pinsPerSide; i++) {
      const pos = -offset + i * spacing;

      // Top side pins
      const pin1 = new THREE.Mesh(pinGeo, pinMat);
      pin1.position.set(pos, -0.06, -offset - 0.06);
      cpuGroup.add(pin1);

      // Bottom side pins
      const pin2 = new THREE.Mesh(pinGeo, pinMat);
      pin2.position.set(pos, -0.06, offset + 0.06);
      cpuGroup.add(pin2);

      // Left side pins
      const pin3 = new THREE.Mesh(pinGeo, pinMat);
      pin3.position.set(-offset - 0.06, -0.06, pos);
      cpuGroup.add(pin3);

      // Right side pins
      const pin4 = new THREE.Mesh(pinGeo, pinMat);
      pin4.position.set(offset + 0.06, -0.06, pos);
      cpuGroup.add(pin4);
    }

    // 7. Radiating Circuit Board PCB Traces
    const tracesGroup = new THREE.Group();
    scene.add(tracesGroup);

    const traceLineMat = new THREE.LineBasicMaterial({
      color: 0x76a9ff,
      transparent: true,
      opacity: 0.7,
    });

    // Create 18 circuit traces extending outward
    const traceCount = 18;
    for (let i = 0; i < traceCount; i++) {
      const angle = (i / traceCount) * Math.PI * 2;
      const startRadius = 2.1;
      const midRadius = startRadius + Math.random() * 0.8 + 0.4;
      const endRadius = midRadius + Math.random() * 1.5 + 1.0;

      const p0 = new THREE.Vector3(Math.cos(angle) * startRadius, -0.08, Math.sin(angle) * startRadius);
      // add a 45 degree angle jog in the trace
      const midAngle = angle + (Math.random() > 0.5 ? 0.2 : -0.2);
      const p1 = new THREE.Vector3(Math.cos(midAngle) * midRadius, -0.08, Math.sin(midAngle) * midRadius);
      const p2 = new THREE.Vector3(Math.cos(midAngle) * endRadius, -0.08, Math.sin(midAngle) * endRadius);

      const points = [p0, p1, p2];
      const traceGeo = new THREE.BufferGeometry().setFromPoints(points);
      const traceLine = new THREE.Line(traceGeo, traceLineMat);
      tracesGroup.add(traceLine);

      // Glowing circuit end node / pad
      const padGeo = new THREE.CircleGeometry(0.06, 8);
      const padMat = new THREE.MeshBasicMaterial({
        color: i % 2 === 0 ? 0x76a9ff : 0xf2a6ac,
        transparent: true,
        opacity: 0.85,
        side: THREE.DoubleSide,
      });
      const padMesh = new THREE.Mesh(padGeo, padMat);
      padMesh.position.copy(p2);
      padMesh.rotation.x = -Math.PI / 2;
      tracesGroup.add(padMesh);
    }

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
    scene.add(ambientLight);

    const dirLight1 = new THREE.DirectionalLight(0xf0e9ef, 1.8);
    dirLight1.position.set(5, 10, 7);
    scene.add(dirLight1);

    const blueLight = new THREE.PointLight(0x76a9ff, 3.2, 10);
    blueLight.position.set(-3, 2, 3);
    scene.add(blueLight);

    const pinkLight = new THREE.PointLight(0xf2a6ac, 2.5, 8);
    pinkLight.position.set(3, 1, -2);
    scene.add(pinkLight);

    // Initial Isometric Orientation matching the design reference image
    cpuGroup.rotation.x = 0.55;
    cpuGroup.rotation.y = -0.45;
    tracesGroup.rotation.x = 0.55;
    tracesGroup.rotation.y = -0.45;

    // Mouse Interaction
    let targetRotationX = 0.55;
    let targetRotationY = -0.45;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const mouseX = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const mouseY = -(((e.clientY - rect.top) / rect.height) * 2 - 1);

      targetRotationY = -0.45 + mouseX * 0.35;
      targetRotationX = 0.55 - mouseY * 0.25;
    };

    window.addEventListener('mousemove', handleMouseMove);

    // Animation Loop
    let animId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      const elapsedTime = clock.getElapsedTime();

      // Floating / breathing animation
      cpuGroup.position.y = Math.sin(elapsedTime * 1.5) * 0.12;
      tracesGroup.position.y = Math.sin(elapsedTime * 1.5) * 0.12;

      // Smooth mouse interpolation
      cpuGroup.rotation.x += (targetRotationX - cpuGroup.rotation.x) * 0.05;
      cpuGroup.rotation.y += (targetRotationY - cpuGroup.rotation.y) * 0.05;
      tracesGroup.rotation.x = cpuGroup.rotation.x;
      tracesGroup.rotation.y = cpuGroup.rotation.y;

      // Pulse circuit nodes
      blueLight.intensity = 2.5 + Math.sin(elapsedTime * 3) * 0.8;

      renderer.render(scene, camera);
      animId = requestAnimationFrame(animate);
    };

    animate();

    const handleContainerResize = () => {
      if (!container) return;
      const newW = container.clientWidth;
      const newH = container.clientHeight;
      camera.aspect = newW / newH;
      camera.updateProjectionMatrix();
      renderer.setSize(newW, newH);
    };

    window.addEventListener('resize', handleContainerResize);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleContainerResize);
      cancelAnimationFrame(animId);
      if (container && renderer.domElement) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, []);

  return (
    <div className="relative w-full max-w-[480px] h-[400px] md:h-[450px] flex items-center justify-center">
      {/* Three.js canvas container */}
      <div ref={containerRef} className="w-full h-full cursor-grab active:cursor-grabbing" />

      {/* Floating silicon annotation tags */}
      <div className="absolute -top-2 right-4 bg-[#161616]/80 backdrop-blur-sm border border-white/10 px-2.5 py-1 rounded text-[11px] font-mono text-[#76A9FF] pointer-events-none">
        DIE // TSMC 4nm FINFET
      </div>
      <div className="absolute bottom-2 left-6 bg-[#161616]/80 backdrop-blur-sm border border-white/10 px-2.5 py-1 rounded text-[11px] font-mono text-[#8FCF9B] pointer-events-none">
        VCC_CORE: 1.15V // 5.2 GHz
      </div>
    </div>
  );
};
