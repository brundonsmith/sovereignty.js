import { Geometry, BoxGeometry, SphereGeometry, CylinderGeometry, PlaneGeometry, Material, MeshStandardMaterial, Mesh, Scene } from 'three';
import { World } from 'cannon';

import GameObject from '../../GameObject';
import Component from '../Component';
import TransformComponent from '../TransformComponent';
import MeshComponent from './MeshComponent';

export default class PrimitiveMeshComponent extends MeshComponent {

  constructor(config: {[key: string]: any}, gameObject: GameObject) {
    super(config, gameObject);

    switch(config.shape.toLowerCase() || 'box') {
      case 'box':
        if(config.dimensions) {
          this.geometry = new BoxGeometry(
            config.dimensions.x,
            config.dimensions.y,
            config.dimensions.z
          );
        } else {
          this.geometry = new BoxGeometry(1, 1, 1);
        }
      break;
      case 'sphere':
        this.geometry = new SphereGeometry(
          config.radius,
          config.widthSegments,
          config.heightSegments
        );
      break;
      case 'cylinder':
        this.geometry = new CylinderGeometry(
          config.radiusTop,
          config.radiusBottom,
          config.height,
          config.radialSegments,
          config.heightSegments
        );
      break;
      case 'plane':
        this.geometry = new PlaneGeometry(
          config.width,
          config.height
        );
      break;
    }

    this.material = new MeshStandardMaterial({ color: config.color ||  0x00ff00 });
    this.mesh = new Mesh(this.geometry, this.material);
    this.mesh.castShadow = true;
    this.mesh.receiveShadow = true;
  }

}
