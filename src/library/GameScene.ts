
import { Scene, Renderer, Camera } from 'three';
import { World, NaiveBroadphase } from 'cannon';

import GameObject from './GameObject';
import Component from './components/Component';
import CameraComponent from './components/CameraComponent';


export default class GameScene {

  public name: string;

  private threeScene: Scene = new Scene();
  private cannonWorld: World = new World();

  private gameObjects: Array<GameObject> = [];

  private activeCamera: Camera | undefined;

  constructor(config: {[key: string]: any}) {
    this.name = config.name;
    config.objects.forEach(objectConfig => this.createGameObject(objectConfig))
    this.cannonWorld.gravity.set(0, -9.82, 0);
    this.cannonWorld.broadphase = new NaiveBroadphase();
    this.cannonWorld.solver.iterations = 15;
  }

  public createGameObject(config: {[key: string]: any}): GameObject {
    var newGameObject = new GameObject(config);
    newGameObject.initialize(this.threeScene, this.cannonWorld);
    this.gameObjects.push(newGameObject);
    return newGameObject;
  }

  public update(timeDelta: number): void {
    this.cannonWorld.step(1 / 600, timeDelta / 1000, 10);

    this.gameObjects.forEach((gameObject: GameObject) => {
      gameObject.update(timeDelta);
      if(gameObject.hasComponent(CameraComponent)) {
        this.activeCamera = (<CameraComponent> gameObject.getComponent(CameraComponent)).threeCamera;
      }
    });
  }

  public render(renderer: Renderer): void {
    if(this.activeCamera) {
      renderer.render(this.threeScene, this.activeCamera);
    }
  }

}
