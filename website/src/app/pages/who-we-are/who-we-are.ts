import {
  AfterViewInit,
  Component,
  OnDestroy,
  QueryList,
  ViewChild,
  ViewChildren,
  ElementRef,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/Addons.js';
import { Footer } from '../../components/footer/footer';

gsap.registerPlugin(ScrollTrigger);

@Component({
  selector: 'app-who-we-are',
  standalone: true,
  imports: [RouterModule, Footer, CommonModule],
  templateUrl: './who-we-are.html',
  styleUrl: './who-we-are.scss',
})
export class WhoWeAre implements AfterViewInit, OnDestroy {
  @ViewChild('missionGraphic', { static: true }) missionRef!: ElementRef;
  @ViewChild('visionGraphic', { static: true }) visionRef!: ElementRef;
  @ViewChild('bgThree', { static: true }) bgRef!: ElementRef;
  @ViewChildren('cultureSlide', { read: ElementRef })
  cultureSlides!: QueryList<ElementRef>;

  private loader = new GLTFLoader();
  private frameId = 0;

  private missionScene!: THREE.Scene;
  private visionScene!: THREE.Scene;
  private bgScene!: THREE.Scene;

  private missionCamera!: THREE.PerspectiveCamera;
  private visionCamera!: THREE.PerspectiveCamera;
  private bgCamera!: THREE.PerspectiveCamera;

  private missionRenderer!: THREE.WebGLRenderer;
  private visionRenderer!: THREE.WebGLRenderer;
  private bgRenderer!: THREE.WebGLRenderer;

  private missionModel: THREE.Object3D | null = null;
  private visionModel: THREE.Object3D | null = null;
  private bgModel: THREE.Object3D | null = null;

  coreValues = [
    {
      value: 'People',
      statement: 'Our people are the foundation...',
      image: '../../../assets/photos/coreValuePeople.jpg',
    },
    {
      value: 'Passion',
      statement: 'We are inspired by the missions...',
      image: '../../../assets/photos/coreValuePassion.jpg',
    },
    {
      value: 'Integrity',
      statement: 'We uphold the highest standards...',
      image: '../../../assets/photos/coreValueIntegrity.jpg',
    },
  ];

  culture = [
    {
      headline: 'We empower those who serve.',
      statement: 'We take pride in being on the periphery...',
    },
    {
      headline: 'We innovate with purpose.',
      statement: 'A company of empowered bold thinkers...',
    },
    {
      headline: 'Trust is our foundation.',
      statement: 'Our commitment to reliability, quality...',
    },
    {
      headline: 'We are a team of families.',
      statement: 'We actively foster an environment...',
    },
  ];

  leadership = [
    {
      name: 'Pete Molina',
      title: 'CEO',
      photo: '../../../assets/headshots/headshot-pete.png',
      bio: 'Lorem ipsum dolor sit amet...',
    },
    {
      name: 'Mike Kritenbrink',
      title: 'VP',
      photo: '../../../assets/headshots/headshot-pete.png',
      bio: 'Lorem ipsum dolor sit amet...',
    },
    {
      name: 'Amanda Smith',
      title: 'Director of Sec',
      photo: '../../../assets/headshots/headshot-pete.png',
      bio: 'Lorem ipsum dolor sit amet...',
    },
    {
      name: 'Ricky Kee',
      title: 'Corporate Director',
      photo: '../../../assets/headshots/headshot-pete.png',
      bio: 'Lorem ipsum dolor sit amet...',
    },
    {
      name: 'Roger Altobelli',
      title: 'Director of Strat',
      photo: '../../../assets/headshots/headshot-pete.png',
      bio: 'Lorem ipsum dolor sit amet...',
    },
    {
      name: 'Charlie Smith',
      title: 'Tech Director',
      photo: '../../../assets/headshots/headshot-pete.png',
      bio: 'Lorem ipsum dolor sit amet...',
    },
  ];

  partners = [
    { image: '../../../assets/logos/amazon.png' },
    { image: '../../../assets/logos/boeing.png' },
    { image: '../../../assets/logos/google.png' },
    { image: '../../../assets/logos/l3.png' },
    { image: '../../../assets/logos/lockheed.jpg' },
    { image: '../../../assets/logos/northrop.jpg' },
    { image: '../../../assets/logos/raytheon.jpg' },
  ];

  cultureIndex = 0;
  intervalId: any;

  ngAfterViewInit() {
    this.splitText();
    requestIdleCallback(() => {
      this.initScenes();
      this.loadModels();
      this.animate();
    });
    this.setupGsapAnimations();
    this.startCultureCarousel();
  }

  ngOnDestroy() {
    if (this.frameId) cancelAnimationFrame(this.frameId);
    this.missionRenderer.dispose();
    this.visionRenderer.dispose();
    clearInterval(this.intervalId);
  }

  private initScenes() {
    const [missionWidth, missionHeight] = [
      this.missionRef.nativeElement.clientWidth,
      this.missionRef.nativeElement.clientHeight,
    ];
    const [visionWidth, visionHeight] = [
      this.visionRef.nativeElement.clientWidth,
      this.visionRef.nativeElement.clientHeight,
    ];
    const [bgWidth, bgHeight] = [
      this.bgRef.nativeElement.clientWidth,
      this.bgRef.nativeElement.clientHeight,
    ];

    // Mission Scene
    this.missionScene = new THREE.Scene();
    this.missionCamera = new THREE.PerspectiveCamera(
      45,
      missionWidth / missionHeight,
      0.1,
      1000
    );
    this.missionCamera.position.z = 5;
    this.missionRenderer = new THREE.WebGLRenderer({
      canvas: this.missionRef.nativeElement,
      alpha: true,
      antialias: true,
    });
    this.missionRenderer.setSize(missionWidth, missionHeight);
    this.missionScene.add(new THREE.HemisphereLight(0xffffff, 0x444444, 1.5));

    // Vision Scene
    this.visionScene = new THREE.Scene();
    this.visionCamera = new THREE.PerspectiveCamera(
      45,
      visionWidth / visionHeight,
      0.1,
      1000
    );
    this.visionCamera.position.z = 5;
    this.visionRenderer = new THREE.WebGLRenderer({
      canvas: this.visionRef.nativeElement,
      alpha: true,
      antialias: true,
    });
    this.visionRenderer.setSize(visionWidth, visionHeight);
    this.visionScene.add(
      new THREE.AmbientLight(0xffffff, 0.6),
      new THREE.DirectionalLight(0xffffff, 2)
    );

    // Background Scene
    this.bgScene = new THREE.Scene();
    this.bgCamera = new THREE.PerspectiveCamera(
      45,
      bgWidth / bgHeight,
      0.1,
      1000
    );
    this.bgCamera.position.z = 30;
    this.bgRenderer = new THREE.WebGLRenderer({
      canvas: this.bgRef.nativeElement,
      alpha: true,
      antialias: true,
    });
    this.bgRenderer.setSize(bgWidth, bgHeight);
    this.bgScene.add(new THREE.HemisphereLight(0xffffff, 0x444444, 1.5));
  }

  private async loadModels() {
    const [bg, mission, vision] = await Promise.all([
      this.loader.loadAsync('/assets/models/orbit-rings.glb'),
      this.loader.loadAsync('/assets/models/piece.glb'),
      this.loader.loadAsync('/assets/models/orbit-rings.glb'),
    ]);

    this.bgModel = bg.scene;
    this.bgModel.scale.set(100, 100, 100);
    this.bgModel.rotation.set(1, 0, 0);
    this.bgScene.add(this.bgModel);

    this.missionModel = mission.scene;
    this.missionModel.rotation.set(1, 0, 0);
    this.missionScene.add(this.missionModel);

    this.visionModel = vision.scene;
    this.visionModel.scale.set(3, 3, 3);
    this.visionModel.rotation.set(0.5, 0.5, 0);
    this.visionScene.add(this.visionModel);

    // Animations
    gsap.from(this.bgModel.scale, {
      scrollTrigger: { trigger: '#bg-three', start: 'top 75%' },
      x: 0,
      y: 0,
      z: 0,
      duration: 3,
      delay: 2,
      ease: 'power1.inOut',
    });

    gsap.to(this.bgModel.position, {
      y: 0.2,
      scrollTrigger: {
        trigger: '#full-page',
        start: '5% bottom',
        end: '95% bottom',
        scrub: true,
      },
      ease: 'none',
    });

    gsap.to('#bg-three', {
      opacity: 0.3,
      scrollTrigger: {
        trigger: '#bg-three',
        start: 'bottom 35%',
        end: 'bottom 5%',
        scrub: true,
      },
      ease: 'power1.inOut',
    });

    gsap.to(this.missionModel.rotation, {
      z: Math.PI * 1.5,
      scrollTrigger: {
        trigger: '#mission',
        start: 'top bottom',
        end: 'bottom top',
        scrub: true,
      },
      ease: 'none',
    });

    gsap.to(this.visionModel.position, {
      y: -0.5,
      duration: 1.5,
      ease: 'power2.out',
      delay: 0.5,
    });
  }

  private animate = () => {
    this.frameId = requestAnimationFrame(this.animate);

    if (this.missionModel) this.missionModel.rotation.y += 0.01;
    if (this.visionModel) this.visionModel.rotation.y += 0.005;
    if (this.bgModel) this.bgModel.rotation.z += 0.0004;

    this.missionRenderer.render(this.missionScene, this.missionCamera);
    this.visionRenderer.render(this.visionScene, this.visionCamera);
    this.bgRenderer.render(this.bgScene, this.bgCamera);
  };

  private setupGsapAnimations() {
    gsap
      .timeline({
        scrollTrigger: { trigger: '#heroText', start: 'top center' },
      })
      .from('.hero-letter', {
        opacity: 0,
        scale: 0.8,
        delay: 1,
        y: 20,
        stagger: 0.05,
        duration: 0.6,
        ease: 'power2.out',
      });

    const missionTl = gsap.timeline({
      scrollTrigger: { trigger: '#mission', start: 'top 75%' },
    });

    missionTl
      .from('.letter', {
        opacity: 0,
        scale: 0.5,
        y: -20,
        stagger: 0.03,
        duration: 1,
        ease: 'back.out(1.7)',
      })
      .from(
        '.word',
        {
          y: 30,
          opacity: 0,
          stagger: 0.05,
          duration: 1.5,
          ease: 'power2.out',
        },
        '<'
      );
  }

  private splitText() {
    const split = (id: string, className: string) => {
      const el = document.getElementById(id);
      if (!el) return;
      const chars = el.textContent?.split('') || [];
      el.innerHTML = chars
        .map(
          (c) => `<span class="${className}">${c === ' ' ? '&nbsp;' : c}</span>`
        )
        .join('');
    };

    const splitWords = (id: string) => {
      const el = document.getElementById(id);
      if (!el) return;
      const words = el.textContent?.split(' ') || [];
      el.innerHTML = words
        .map((w) => `<span class="word">${w}</span>`)
        .join(' ');
    };

    split('heroText', 'hero-letter');
    split('mission', 'letter');
    splitWords('mission-paragraph');
  }

  private startCultureCarousel() {
    gsap.set('.culture-carousel .carousel-slide', { autoAlpha: 0 });
    this.showSlide(this.cultureIndex);
    this.intervalId = setInterval(() => {
      this.cultureIndex = (this.cultureIndex + 1) % this.culture.length;
      this.showSlide(this.cultureIndex);
    }, 8000);
  }

  private showSlide(index: number) {
    gsap.to('.culture-carousel .carousel-slide', {
      autoAlpha: 0,
      duration: 0.4,
      ease: 'power2.out',
    });
    gsap.fromTo(
      `.culture-carousel .carousel-slide[data-index="${index}"]`,
      { autoAlpha: 0, x: 20 },
      { autoAlpha: 1, x: 0, duration: 0.8, ease: 'power2.out' }
    );
  }
}
