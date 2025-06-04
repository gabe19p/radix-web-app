import {
  Component,
  ElementRef,
  OnInit,
  AfterViewInit,
  ViewChild,
  OnDestroy,
} from '@angular/core';
import * as THREE from 'three';
// @ts-ignore
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

@Component({
  selector: 'app-test-three',
  templateUrl: './test-three.html',
  styleUrls: ['./test-three.scss'],
})
export class TestThree implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('canvasContainer', { static: false }) canvasRef!: ElementRef;

  // get the current background color
  cssBgColor = getComputedStyle(document.documentElement)
    .getPropertyValue('--color-bg')
    .trim();
  // get the current primary color
  cssPrimaryColor = getComputedStyle(document.documentElement)
    .getPropertyValue('--color-primary')
    .trim();
  // get the current primary color
  cssSecondaryColor = getComputedStyle(document.documentElement)
    .getPropertyValue('--color-secondary')
    .trim();

  private scene!: THREE.Scene;
  private camera!: THREE.PerspectiveCamera;
  private renderer!: THREE.WebGLRenderer;
  private loader = new GLTFLoader();

  ngOnInit(): void {
    console.log(this.cssBgColor);
    console.log(this.cssPrimaryColor);
  }

  ngAfterViewInit(): void {
    this.initThree();
    window.addEventListener('resize', this.onWindowResize);
    this.animate();
  }

  ngOnDestroy() {
    window.removeEventListener('resize', this.onWindowResize);
  }

  private initThree(): void {
    const container = this.canvasRef.nativeElement;
    const width = container.clientWidth;
    const height = container.clientHeight;

    this.scene = new THREE.Scene();

    this.camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
    this.camera.position.set(0, 0, 5); // slight zoom out

    this.renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    this.renderer.setSize(width, height);
    this.renderer.setPixelRatio(window.devicePixelRatio); // optional, sharpness
    this.renderer.setClearColor(0x000000, 0); // transparent
    container.appendChild(this.renderer.domElement);

    this.loader.load('assets/models/satellite-1.glb', (gltf: any) => {
      const model = gltf.scene;
      model.scale.set(1, 1, 1);
      model.position.set(0, 0, -5); // center it
      this.scene.add(model);

      this.animate = () => {
        requestAnimationFrame(this.animate);
        model.rotation.y += 0.003;
        this.renderer.render(this.scene, this.camera);
      };
      this.animate();
    });

    const light = new THREE.DirectionalLight(0xffffff, 7);
    light.position.set(-3, 3, 5);
    this.scene.add(light);
  }

  private onWindowResize = () => {
    const container = this.canvasRef.nativeElement;
    const width = container.clientWidth;
    const height = container.clientHeight;

    this.camera.aspect = width / height;
    this.camera.updateProjectionMatrix();

    this.renderer.setSize(width, height);
  };

  private animate = (): void => {
    requestAnimationFrame(this.animate);

    this.renderer.render(this.scene, this.camera);
  };
}
