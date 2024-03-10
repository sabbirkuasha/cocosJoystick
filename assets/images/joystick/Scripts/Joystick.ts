import {
  _decorator,
  Component,
  Label,
  Node,
  v2,
  EventTouch,
  Vec2,
  v3,
  UITransform,
  Vec3,
} from "cc";
const { ccclass, property } = _decorator;

@ccclass("Joystick")
export class Joystick extends Component {
  @property(Node)
  stick: Node = null;
  @property(Label)
  infoLabel: Label = null;
  @property
  maxRadius: number = 100; // Adjust based on your needs

  protected onLoad(): void {
    this.stick.setPosition(0, 0);
    this.node.on(Node.EventType.TOUCH_MOVE, this.on_stick_move, this);
    this.node.on(Node.EventType.TOUCH_END, this.on_stick_end, this);
    this.node.on(Node.EventType.TOUCH_CANCEL, this.on_stick_cancel, this);
  }

  private on_stick_move(event: EventTouch) {
    const screen_pos = event.getLocation();
    const xyz = v3(screen_pos.x, screen_pos.y, 0);
    const pos = this.node.getComponent(UITransform).convertToNodeSpaceAR(xyz);
    console.log(pos);
    const length = pos.length();
    console.log(length);
    if (length <= 0) {
      this.stick.setPosition(pos);
      return;
    }

    if (length > this.maxRadius) {
      pos.x = (pos.x * this.maxRadius) / length;
      pos.y = (pos.y * this.maxRadius) / length;
    }

    this.stick.setPosition(pos);
    // Now use the infoLabel to display the position and length
    if (this.infoLabel) {
      this.infoLabel.string = `Pos: ${pos.toString()} \nLength: ${length.toFixed(
        2
      )}`;
    }
  }
  private on_stick_end(event: EventTouch) {
    console.log("on_stick_end", event);
    this.stick.setPosition(0, 0);
  }
  private on_stick_cancel(event: EventTouch) {
    console.log("on_stick_cancel", event);
    this.stick.setPosition(0, 0);
    console.log(event);
  }

  start() {
    console.log("Hello from on Start");
  }

  update(deltaTime: number) {}
}
