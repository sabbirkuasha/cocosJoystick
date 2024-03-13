import {
  _decorator,
  Component,
  director,
  PhysicsSystem2D,
  Node,
  v2,
  Vec2,
} from "cc";
const { ccclass, property } = _decorator;

@ccclass("GameManager")
export class GameManager extends Component {
  @property
  gravity: Vec2 = v2(0, 0);

  onLoad() {
    console.log(PhysicsSystem2D.instance);
    PhysicsSystem2D.instance.enable = true;
    PhysicsSystem2D.instance.gravity = this.gravity;
  }

  start() {}

  update(deltaTime: number) {}
}
