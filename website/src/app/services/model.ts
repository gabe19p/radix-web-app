import { Injectable } from '@angular/core';
import * as THREE from 'three';
import { GLTF, GLTFLoader } from 'three/examples/jsm/Addons.js';

@Injectable({
  providedIn: 'root',
})
export class ModelService {
  private loader = new GLTFLoader();
  private modelCache = new Map<string, GLTF>();

  constructor() {
    // Optional: setup DRACOLoader, KTX2Loader, etc. if needed
  }

  preloadModel(path: string): Promise<void> {
    if (this.modelCache.has(path)) return Promise.resolve();

    return new Promise((resolve, reject) => {
      this.loader.load(
        path,
        (gltf) => {
          this.modelCache.set(path, gltf);
          resolve();
        },
        undefined,
        (error) => reject(error)
      );
    });
  }

  getModelClone(path: string): THREE.Object3D | null {
    const gltf = this.modelCache.get(path);
    if (!gltf) return null;

    const clone = gltf.scene.clone(true);
    return clone;
  }
}
