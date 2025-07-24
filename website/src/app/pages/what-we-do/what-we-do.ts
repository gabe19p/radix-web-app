import {
  AfterViewInit,
  Component,
  ElementRef,
  Inject,
  OnDestroy,
  ViewChild,
} from '@angular/core';
import { CommonModule } from '@angular/common';

import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/Addons.js';
import { OrbitControls } from 'three/examples/jsm/Addons.js';

import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import { Capability } from '../../interfaces/capability';

gsap.registerPlugin(ScrollTrigger);

@Component({
  selector: 'app-what-we-do',
  imports: [CommonModule],
  templateUrl: './what-we-do.html',
  styleUrl: './what-we-do.scss',
})
export class WhatWeDo {
  modalOpen = false;
  selectedCapability: Capability | null = null;
  capabilities: Capability[] = [
    {
      title: 'S&C',
      description: 'Deliver clean, credible, resilient data automatically.',
      icon: `<svg><!-- your full S&C svg string here --></svg>`,
    },
    // Add ACT, DSO, CEW similarly
  ];
  openModal(cap: Capability) {
    this.selectedCapability = cap;
    this.modalOpen = true;
    // document.body.style.overflow = 'hidden !important';
  }
  closeModal() {
    this.modalOpen = false;
    // document.body.style.overflow = '';
  }
  // @ViewChild('three', { static: false }) threeContainer!: ElementRef;
  // private renderer!: THREE.WebGLRenderer;
  // private scene!: THREE.Scene;
  // private camera!: THREE.PerspectiveCamera;
  // private model!: THREE.Object3D;
  // private frameId: number = 0;
  // ngAfterViewInit() {
  //   this.initThree();
  // }
  // ngOnDestroy(): void {
  //   cancelAnimationFrame(this.frameId);
  //   this.renderer.dispose();
  // }
  // private initThree() {
  //   const container = document.getElementById('three')!;
  //   const width = container.clientWidth;
  //   const height = container.clientHeight || 400;
  //   this.scene = new THREE.Scene();
  //   // this.scene.background = new THREE.Color(0x000000);
  //   this.camera = new THREE.PerspectiveCamera(30, width / height, 0.1, 1000);
  //   this.camera.position.set(-5, 0, 30);
  //   this.renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  //   this.renderer.setSize(width, height);
  //   container.appendChild(this.renderer.domElement);
  //   const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
  //   const directionalLight = new THREE.DirectionalLight(0xffffff, 3);
  //   directionalLight.position.set(10, 50, 50);
  //   this.scene.add(ambientLight, directionalLight);
  //   // const controls = new OrbitControls(this.camera, this.renderer.domElement);
  //   // controls.enableDamping = true;
  //   const loader = new GLTFLoader();
  //   loader.load('../../../assets/models/satellite-1.glb', (gltf) => {
  //     this.model = gltf.scene;
  //     this.model.position.set(230, 0, 0); // starts off screen
  //     this.model.rotation.set(3, 1, 4);
  //     this.model.scale.set(1, 1, 1);
  //     // this.model.rotation.x = Math.PI / 1;
  //     // this.model.rotation.y = Math.PI / 1;
  //     this.scene.add(this.model);
  //     // Animate after 500ms
  //     gsap.to(this.model.position, {
  //       x: 2,
  //       duration: 3,
  //       delay: 0.5,
  //       ease: 'power2.inOut',
  //     });
  //     gsap.to(this.model.position, {
  //       y: -1,
  //       scrollTrigger: {
  //         trigger: '#three', // Make sure this ID exists
  //         start: '45% center',
  //         end: 'bottom center',
  //         scrub: true,
  //       },
  //     });
  //     gsap.to(this.model.scale, {
  //       x: 0.9,
  //       y: 0.9,
  //       z: 0.9,
  //       scrollTrigger: {
  //         trigger: '#three', // Make sure this ID exists
  //         start: '45% center',
  //         end: 'bottom center',
  //         scrub: true,
  //       },
  //     });
  //   });
  //   window.addEventListener('resize', () => {
  //     const width = container.clientWidth;
  //     const height = container.clientHeight;
  //     this.camera.aspect = width / height;
  //     this.camera.updateProjectionMatrix();
  //     this.renderer.setSize(width, height);
  //   });
  //   const animate = () => {
  //     this.frameId = requestAnimationFrame(animate);
  //     if (this.model) this.model.rotation.y += 0.001;
  //     // if (this.model) this.model.rotation.x += 0.005;
  //     // controls.update();
  //     this.renderer.render(this.scene, this.camera);
  //   };
  //   animate();
  // }
  // constructor(@Inject(DOCUMENT) private document: Document) {}
  // ngAfterViewInit(): void {
  //   const tl = gsap.timeline();
  //   const groups = this.document.querySelectorAll('.discipline-group');
  //   groups.forEach((group) => {
  //     const header = group.querySelector('.discipline-header');
  //     const subItems = group.querySelector('.sub-items') as HTMLElement;
  //     let isOpen = false;
  //     if (header && subItems) {
  //       gsap.set(subItems, { height: 0, opacity: 0 });
  //       header.addEventListener('click', () => {
  //         if (isOpen) {
  //           gsap.to(subItems, {
  //             height: 0,
  //             opacity: 0,
  //             duration: 0.4,
  //             ease: 'power2.inOut',
  //           });
  //           header.classList.remove('open');
  //         } else {
  //           const fullHeight = subItems.scrollHeight;
  //           gsap.to(subItems, {
  //             height: fullHeight,
  //             opacity: 1,
  //             duration: 0.4,
  //             ease: 'power2.inOut',
  //             onComplete: () => {
  //               subItems.style.height = 'auto'; // unlock height
  //             },
  //           });
  //           header.classList.add('open');
  //         }
  //         isOpen = !isOpen;
  //       });
  //     }
  //   });
  //   tl.from(
  //     '.blobA',
  //     {
  //       x: 100,
  //       y: 200,
  //       opacity: 0,
  //       duration: 2,
  //       ease: 'power3.out',
  //     },
  //     0
  //   )
  //     .from(
  //       '.blobB',
  //       {
  //         x: -50,
  //         y: -300, // slide in from top
  //         opacity: 0,
  //         duration: 2,
  //         ease: 'power3.out',
  //       },
  //       0.2
  //     )
  //     .from(
  //       '.hero-title',
  //       {
  //         y: -100,
  //         opacity: 0,
  //         duration: 1,
  //         ease: 'power2.out',
  //       },
  //       1
  //     )
  //     .from(
  //       '.hero-wrapper p',
  //       {
  //         y: 60,
  //         opacity: 0,
  //         duration: 1,
  //         ease: 'power2.out',
  //       },
  //       0.8
  //     );
  //   gsap.to('#mission', {
  //     scrollTrigger: {
  //       trigger: '#mission',
  //       start: 'top 70%',
  //     },
  //     duration: 1,
  //     scrambleText: {
  //       text: 'Our Mission ',
  //       chars: '01 ',
  //       revealDelay: 0.1,
  //       speed: 0.3,
  //     },
  //     onComplete: () => {
  //       gsap.to('.cursor', {
  //         opacity: 0,
  //         duration: 0.8,
  //         repeat: -1,
  //         yoyo: true,
  //         ease: 'none',
  //       });
  //       gsap.fromTo(
  //         '#mission-paragraph',
  //         {
  //           y: 40,
  //           opacity: 0,
  //         },
  //         {
  //           y: 0,
  //           opacity: 1,
  //           duration: 1,
  //           ease: 'power2.out',
  //         }
  //       );
  //     },
  //   });
  //   // Core Capabilities Scroll Animation
  //   gsap
  //     .timeline({
  //       scrollTrigger: {
  //         trigger: '.what-we-do-capabilities',
  //         start: 'top 50%',
  //       },
  //     })
  //     .from('.capabilites-title', {
  //       y: 50,
  //       opacity: 0,
  //       duration: 1,
  //       ease: 'power2.out',
  //     })
  //     .from(
  //       '.capabilities-grid .capability',
  //       {
  //         y: 30,
  //         opacity: 0,
  //         duration: 0.6,
  //         ease: 'power2.out',
  //         stagger: 0.1,
  //       },
  //       '+=0.2'
  //     ); // slight pause after title
  //   // Shapes for blobA
  //   const shapesA = [
  //     '#blob1',
  //     '#blob2',
  //     '#blob3',
  //     '#blob4',
  //     '#blob5',
  //     '#blob6',
  //     '#blob7',
  //     '#blob8',
  //   ];
  //   // Shapes for blobB
  //   const shapesB = [
  //     '#blob1',
  //     '#blob2',
  //     '#blob3',
  //     '#blob4',
  //     '#blob5',
  //     '#blob6',
  //     '#blob7',
  //     '#blob8',
  //   ];
  //   const animateBlob = (pathId: string, shapes: string[]) => {
  //     let lastIndex = 0;
  //     function morph() {
  //       let nextIndex;
  //       do {
  //         nextIndex = Math.floor(Math.random() * shapes.length);
  //       } while (nextIndex === lastIndex);
  //       lastIndex = nextIndex;
  //       gsap.to(pathId, {
  //         duration: 6,
  //         ease: 'sine.inOut',
  //         morphSVG: shapes[nextIndex],
  //         onComplete: morph,
  //       });
  //     }
  //     morph();
  //   };
  //   animateBlob('#blobA', shapesA);
  //   animateBlob('#blobB', shapesB);
  // }
}
