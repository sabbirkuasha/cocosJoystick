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
    console.log(this.body);
    console.log(this.stick);
  }
  start() {}

  update(deltaTime: number) {
    console.log("dir data: ", this.stick.dir);
    if (this.stick.dir.x == 0 && this.stick.dir.y == 0) {
      console.log("condition met");
      this.stick.dir = v2(0, 0);
      // return;
    }

    // const vx = this.speed * this.stick.dir.x;
    // const vy = this.speed * this.stick.dir.y;

    this.body.linearVelocity = v2(
      this.speed * this.stick.dir.x,
      this.speed * this.stick.dir.y
    );
  }
}
