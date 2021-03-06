import { Math as ThreeMath } from 'three';
import { } from 'cannon';

import GameObject from 'GameObject';
import Component from 'components/Component';
import Input from 'Input';

export default class KeyboardMouseComponent extends Component {

  public moveSpeed: number = 5;
  public turnSpeed: number = 1;
  public lookLimit = Math.PI / 4;

  constructor(config: {[key: string]: any}, gameObject: GameObject) {
    super(config, gameObject);

  }

  public update(timeDelta: number): void {
    var moveDelta = this.moveSpeed * timeDelta / 1000;
    var turnDelta = this.turnSpeed * timeDelta / 1000;

    if(Input.keyDown('KeyW')) {
      this.transform.position.add(this.transform.forward.multiplyScalar(moveDelta));
    }
    if(Input.keyDown('KeyS')) {
      this.transform.position.add(this.transform.backward.multiplyScalar(moveDelta));
    }

    if(Input.keyDown('KeyA')) {
      this.transform.position.add(this.transform.left.multiplyScalar(moveDelta));
    }
    if(Input.keyDown('KeyD')) {
      this.transform.position.add(this.transform.right.multiplyScalar(moveDelta));
    }

    this.transform.rotation.y -= Input.mouseDeltaX() * turnDelta;
    this.transform.rotation.x = ThreeMath.clamp(
                                  this.transform.rotation.x - Input.mouseDeltaY() * turnDelta,
                                  this.lookLimit * -1,
                                  this.lookLimit
                                );
  }



}
