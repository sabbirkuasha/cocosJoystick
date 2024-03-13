import {
  _decorator,
  Component,
  Label,
  Node,
  RigidBody,
  RigidBody2D,
  v2,
} from "cc";
import { Joystick } from "../images/joystick/Scripts/Joystick";
const { ccclass, property } = _decorator;

@ccclass("PaperPlaneControl")
export class PaperPlaneControl extends Component {
  @property(Joystick)
  stick: Joystick = null;

  @property
  speed: number = 100;

  private body: RigidBody2D = null;

  protected onLoad(): void {
    this.body = this.getComponent(RigidBody2D);
    // console.log(this.body);
    // console.log(this.stick);
  }
  start() {}

  update(deltaTime: number) {
    this.updateVelocity();
    // this.updateRotation();
  }

  private updateVelocity() {
    if (this.stick.dir.x === 0 && this.stick.dir.y === 0) {
      this.body.linearVelocity = v2(0, 0);
    } else {
      const vx = this.speed * this.stick.dir.x;
      const vy = this.speed * this.stick.dir.y;
      this.body.linearVelocity = v2(vx, vy);
    }
  }

  private updateRotation() {
    if (this.stick.dir.x !== 0 || this.stick.dir.y !== 0) {
      // Check if there's input
      const angleRadians = Math.atan2(this.stick.dir.y, this.stick.dir.x);
      const angleDegrees = angleRadians * (180 / Math.PI);
      this.node.angle = -angleDegrees; // Adjust based on your engine's rotation direction
    }
  }
}
