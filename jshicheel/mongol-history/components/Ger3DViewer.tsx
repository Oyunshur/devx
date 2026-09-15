"use client";

import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import gsap from "gsap";
import { Box, ChevronRight, Eye, RotateCcw } from "lucide-react";

type PartId = "khana" | "uni" | "toono" | "bagana" | "hearth" | "door";
type Part = { id: PartId; label: string; mongolian: string; note: string; significance: string; offset: THREE.Vector3 };

const PARTS: Part[] = [
  { id: "khana", label: "Lattice wall", mongolian: "Хана / Khana", note: "Collapsible wooden lattice frames form the circular body of the ger.", significance: "A portable wall system designed to be folded, carried, and rebuilt with the seasons.", offset: new THREE.Vector3(-2.4, -0.3, 0) },
  { id: "uni", label: "Roof poles", mongolian: "Уни / Uni", note: "Slender rafters radiate from the crown to the top of the wall.", significance: "The roof structure turns a circle into a shelter while distributing snow and wind loads.", offset: new THREE.Vector3(2.4, 0.3, 0) },
  { id: "toono", label: "Crown ring", mongolian: "Тооно / Toono", note: "The round roof ring is both a structural joint and an opening to the sky.", significance: "The toono is a domestic threshold between the hearth below and the eternal blue sky above.", offset: new THREE.Vector3(0, 2.4, 0) },
  { id: "bagana", label: "Support posts", mongolian: "Багана / Bagana", note: "Two central posts steady the toono above the hearth.", significance: "The posts are treated as the spine of the household; stepping between them is traditionally avoided.", offset: new THREE.Vector3(0, 0.4, 2.1) },
  { id: "hearth", label: "Sacred hearth", mongolian: "Голомт / Golomt", note: "The fire sits at the center, warming the room and preparing food.", significance: "A living symbol of household continuity, hospitality, and the family line.", offset: new THREE.Vector3(0, -0.7, 2.2) },
  { id: "door", label: "Wooden door", mongolian: "Хаалга / Khaalga", note: "A bright south-facing door marks the entrance and the orientation of the home.", significance: "The threshold organizes movement, etiquette, and the ger’s relationship to the sun.", offset: new THREE.Vector3(2.6, 0, 1.2) },
];

function beamBetween(start: THREE.Vector3, end: THREE.Vector3, radius: number, material: THREE.Material) {
  const direction = new THREE.Vector3().subVectors(end, start);
  const beam = new THREE.Mesh(new THREE.CylinderGeometry(radius, radius, direction.length(), 8), material);
  beam.position.copy(start).add(end).multiplyScalar(.5);
  beam.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), direction.normalize());
  beam.castShadow = true;
  return beam;
}

export default function Ger3DViewer() {
  const mountRef = useRef<HTMLDivElement>(null);
  const partsRef = useRef(new Map<PartId, THREE.Group>());
  const stepRef = useRef(0);
  const rotatingRef = useRef(true);
  const [assemblyStep, setAssemblyStep] = useState(0);
  const [selectedPart, setSelectedPart] = useState<Part>(PARTS[0]);
  const [rotating, setRotating] = useState(true);

  useEffect(() => { stepRef.current = assemblyStep; }, [assemblyStep]);
  useEffect(() => { rotatingRef.current = rotating; }, [rotating]);

  useEffect(() => {
    if (!mountRef.current) return;
    const container = mountRef.current;
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x18201e);
    scene.fog = new THREE.Fog(0x18201e, 8, 18);

    const camera = new THREE.PerspectiveCamera(38, container.clientWidth / container.clientHeight, .1, 100);
    camera.position.set(5.8, 3.8, 7.5);
    camera.lookAt(0, 1.1, 0);
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.7));
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    container.appendChild(renderer.domElement);

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.enablePan = false;
    controls.minDistance = 5;
    controls.maxDistance = 11;
    controls.target.set(0, 1.1, 0);

    scene.add(new THREE.HemisphereLight(0xded5be, 0x18201e, 1.8));
    const sun = new THREE.DirectionalLight(0xffd594, 3.2);
    sun.position.set(4, 8, 5); sun.castShadow = true; scene.add(sun);
    const fireLight = new THREE.PointLight(0xd8632e, 2.5, 5); fireLight.position.set(0, .6, 0); scene.add(fireLight);

    const model = new THREE.Group();
    scene.add(model);
    const wood = new THREE.MeshStandardMaterial({ color: 0x9b522f, roughness: .72 });
    const woodDark = new THREE.MeshStandardMaterial({ color: 0x513125, roughness: .8 });
    const felt = new THREE.MeshStandardMaterial({ color: 0xd8d0bd, roughness: .96 });
    const trim = new THREE.MeshStandardMaterial({ color: 0xc58d3e, roughness: .5, metalness: .15 });
    const ember = new THREE.MeshStandardMaterial({ color: 0xbf4826, emissive: 0x6f190b, emissiveIntensity: 1.4 });

    const base = new THREE.Mesh(new THREE.CylinderGeometry(4.2, 4.45, .16, 64), new THREE.MeshStandardMaterial({ color: 0x27362a, roughness: 1 }));
    base.position.y = -.26; base.receiveShadow = true; model.add(base);

    const createPart = (part: Part) => { const group = new THREE.Group(); group.name = part.id; partsRef.current.set(part.id, group); model.add(group); return group; };

    const khana = createPart(PARTS[0]);
    khana.add(new THREE.Mesh(new THREE.CylinderGeometry(2.58, 2.64, 1.42, 32, 1, true), felt));
    for (let i = 0; i < 18; i++) {
      const angle = (i / 18) * Math.PI * 2;
      const a = new THREE.Vector3(Math.cos(angle) * 2.69, .05, Math.sin(angle) * 2.69);
      const b = new THREE.Vector3(Math.cos(angle + .18) * 2.69, 1.37, Math.sin(angle + .18) * 2.69);
      khana.add(beamBetween(a, b, .025, woodDark));
    }

    const uni = createPart(PARTS[1]);
    for (let i = 0; i < 18; i++) {
      const angle = (i / 18) * Math.PI * 2;
      uni.add(beamBetween(new THREE.Vector3(Math.cos(angle) * 2.57, 1.34, Math.sin(angle) * 2.57), new THREE.Vector3(Math.cos(angle) * .55, 2.58, Math.sin(angle) * .55), .035, wood));
    }

    const toono = createPart(PARTS[2]);
    const crown = new THREE.Mesh(new THREE.TorusGeometry(.58, .105, 12, 32), trim); crown.rotation.x = Math.PI / 2; crown.position.y = 2.62; toono.add(crown);
    const crownInner = new THREE.Mesh(new THREE.CircleGeometry(.47, 32), new THREE.MeshBasicMaterial({ color: 0x0f1716, side: THREE.DoubleSide })); crownInner.position.y = 2.62; toono.add(crownInner);

    const bagana = createPart(PARTS[3]);
    [-.38, .38].forEach((x) => { const post = new THREE.Mesh(new THREE.CylinderGeometry(.055, .065, 2.28, 10), wood); post.position.set(x, 1.13, 0); bagana.add(post); });

    const hearth = createPart(PARTS[4]);
    const bowl = new THREE.Mesh(new THREE.CylinderGeometry(.42, .31, .2, 20), woodDark); bowl.position.y = .08; hearth.add(bowl);
    const coals = new THREE.Mesh(new THREE.IcosahedronGeometry(.2, 1), ember); coals.position.y = .23; hearth.add(coals);

    const door = createPart(PARTS[5]);
    const frame = new THREE.Mesh(new THREE.BoxGeometry(.9, 1.25, .17), wood); frame.position.set(0, .61, 2.58); door.add(frame);
    const opening = new THREE.Mesh(new THREE.BoxGeometry(.6, .94, .185), new THREE.MeshStandardMaterial({ color: 0x131817 })); opening.position.set(0, .55, 2.68); door.add(opening);
    const doorSymbol = new THREE.Mesh(new THREE.TorusGeometry(.18, .035, 6, 16), trim); doorSymbol.position.set(0, .88, 2.79); doorSymbol.rotation.x = Math.PI / 2; door.add(doorSymbol);

    const dustGeometry = new THREE.BufferGeometry();
    const dustPositions = new Float32Array(420 * 3);
    for (let i = 0; i < dustPositions.length; i += 3) { dustPositions[i] = (Math.random() - .5) * 16; dustPositions[i + 1] = Math.random() * 7; dustPositions[i + 2] = (Math.random() - .5) * 16; }
    dustGeometry.setAttribute("position", new THREE.BufferAttribute(dustPositions, 3));
    scene.add(new THREE.Points(dustGeometry, new THREE.PointsMaterial({ color: 0xd4a65d, size: .025, transparent: true, opacity: .7 })));

    const resizeObserver = new ResizeObserver(() => {
      const width = container.clientWidth, height = container.clientHeight;
      camera.aspect = width / height; camera.updateProjectionMatrix(); renderer.setSize(width, height);
    });
    resizeObserver.observe(container);

    const tick = () => { controls.update(); if (rotatingRef.current) model.rotation.y += .0025; fireLight.intensity = 2.3 + Math.sin(performance.now() * .005) * .35; renderer.render(scene, camera); };
    renderer.setAnimationLoop(tick);

    const mountedParts = partsRef.current;
    return () => {
      resizeObserver.disconnect(); renderer.setAnimationLoop(null); controls.dispose(); renderer.dispose();
      model.traverse((object) => { if (object instanceof THREE.Mesh) { object.geometry.dispose(); if (Array.isArray(object.material)) object.material.forEach((m) => m.dispose()); else object.material.dispose(); } });
      if (container.contains(renderer.domElement)) container.removeChild(renderer.domElement);
      mountedParts.clear();
    };
  }, []);

  useEffect(() => {
    const timeline = gsap.timeline({ defaults: { duration: .65, ease: "power3.out" } });
    PARTS.forEach((part, index) => {
      const group = partsRef.current.get(part.id); if (!group) return;
      const isExploded = index < assemblyStep;
      timeline.to(group.position, { x: isExploded ? part.offset.x : 0, y: isExploded ? part.offset.y : 0, z: isExploded ? part.offset.z : 0 }, index === 0 ? 0 : "<.04");
    });
    return () => { timeline.kill(); };
  }, [assemblyStep]);

  const advance = () => setAssemblyStep((step) => step >= PARTS.length ? 0 : step + 1);
  const currentLabel = assemblyStep === 0 ? "Assembled" : assemblyStep === PARTS.length ? "Fully exploded" : `${assemblyStep} / ${PARTS.length} pieces released`;

  return (
    <section id="3d-ger" className="section-rule mx-auto max-w-7xl px-5 py-24 sm:px-8">
      <div className="mb-10 grid gap-8 lg:grid-cols-[1fr_360px] lg:items-end">
        <div><p className="eyebrow mb-4">Object study · 01</p><h2 className="display-serif max-w-3xl text-5xl leading-[.94] text-[#f2eadc] sm:text-7xl">A home that travels<br /><em className="text-[#e0b45b]">with the horizon.</em></h2></div>
        <p className="text-sm leading-7 text-[#c7aa78]">The ger is not a tent in the casual sense. Its circular logic is a portable technology: a family can fold its walls, load the roof poles, and move with the pasture.</p>
      </div>

      <div className="grid overflow-hidden border border-white/10 bg-[#1d2420] lg:grid-cols-[minmax(0,1.15fr)_minmax(320px,.85fr)]">
        <div className="scene-frame relative min-h-[480px] bg-[radial-gradient(circle_at_50%_45%,#4b5948_0%,#18201e_56%,#141816_100%)] lg:min-h-[620px]">
          <div ref={mountRef} className="absolute inset-0" />
          <div className="absolute left-5 top-5 z-10 max-w-[230px] text-[10px] uppercase tracking-[.16em] text-[#c7aa78]">Rotate · zoom · inspect<br /><span className="text-[#e0b45b]">Three.js field model</span></div>
          <div className="absolute bottom-5 left-5 right-5 z-10 flex items-center justify-between gap-3 text-[10px] uppercase tracking-[.13em] text-[#e8dfcf]/70"><span>{currentLabel}</span><button className="flex items-center gap-2 border border-white/20 bg-[#141816]/70 px-3 py-2 text-[#e0b45b] backdrop-blur" onClick={() => { setRotating(!rotating); }}><RotateCcw size={13} className={rotating ? "animate-spin" : ""} /> {rotating ? "Pause orbit" : "Resume orbit"}</button></div>
        </div>

        <div className="flex flex-col border-t border-white/10 p-6 sm:p-8 lg:border-l lg:border-t-0">
          <div className="mb-7 flex items-center justify-between"><div><p className="eyebrow mb-2">Exploded axonometric</p><h3 className="display-serif text-3xl text-[#f2eadc]">Read the parts.</h3></div><Box className="text-[#e0b45b]" size={26} /></div>
          <div className="mb-6 grid grid-cols-2 gap-2">
            {PARTS.map((part, index) => <button key={part.id} onClick={() => { setSelectedPart(part); setAssemblyStep(Math.max(assemblyStep, index + 1)); }} className={`border p-3 text-left transition-colors ${selectedPart.id === part.id ? "border-[#e0b45b] bg-[#e0b45b]/10" : "border-white/10 bg-[#141816] hover:border-[#c7aa78]"}`}><span className="mb-1 block text-[10px] text-[#c7aa78]">0{index + 1}</span><span className="block text-xs font-bold text-[#e8dfcf]">{part.label}</span><span className="mt-1 block truncate text-[10px] text-[#e0b45b]">{part.mongolian}</span></button>)}
          </div>
          <div className="flex-1 border-t border-white/10 pt-5"><p className="mb-2 text-xs font-bold uppercase tracking-[.12em] text-[#e0b45b]">{selectedPart.mongolian}</p><h4 className="display-serif mb-3 text-2xl text-[#f2eadc]">{selectedPart.label}</h4><p className="mb-5 text-sm leading-6 text-[#c7aa78]">{selectedPart.note}</p><div className="border-l border-[#9e3f2d] pl-4 text-xs leading-5 text-[#e8dfcf]/75"><span className="mb-1 block font-bold uppercase tracking-[.1em] text-[#e0b45b]">Cultural reading</span>{selectedPart.significance}</div></div>
          <button onClick={advance} className="mt-8 flex items-center justify-between bg-[#e0b45b] px-4 py-3 text-xs font-bold uppercase tracking-[.14em] text-[#141816] transition-colors hover:bg-[#f2eadc]"><span>{assemblyStep >= PARTS.length ? "Reassemble ger" : "Release next piece"}</span>{assemblyStep >= PARTS.length ? <RotateCcw size={15} /> : <ChevronRight size={15} />}</button>
          <div className="mt-3 flex items-center gap-2 text-[10px] uppercase tracking-[.12em] text-[#c7aa78]"><Eye size={13} /> Tap each component to reveal it one by one</div>
        </div>
      </div>
    </section>
  );
}
