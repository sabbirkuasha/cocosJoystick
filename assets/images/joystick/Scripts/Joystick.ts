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

  @property
  dir: Vec2 = new Vec2(0, 0); // Initialize with default direction

  protected onLoad(): void {
    this.stick.setPosition(0, 0);
    this.registerEventListeners();
  }

  private registerEventListeners() {
    this.node.on(Node.EventType.TOUCH_MOVE, this.on_stick_move, this);
    this.node.on(Node.EventType.TOUCH_END, this.on_stick_end, this);
    this.node.on(Node.EventType.TOUCH_CANCEL, this.on_stick_cancel, this);
  }

  private on_stick_move(event: EventTouch) {
    const screen_pos = event.getLocation();
    const xyz = v3(screen_pos.x, screen_pos.y, 0);
    const pos = this.node.getComponent(UITransform).convertToNodeSpaceAR(xyz);
    // console.log(pos);
    const length = pos.length();
    // console.log(length);
    if (length <= 0) {
      this.stick.setPosition(pos);
      return;
    }

    this.updateDirection(pos, length);

    // console.log("the dir Data: ", this.dir.x, this.dir.y);

    if (length > this.maxRadius) {
      pos.x = (pos.x * this.maxRadius) / length;
      pos.y = (pos.y * this.maxRadius) / length;
    }

    this.stick.setPosition(pos);

    // Now use the infoLabel to display the position and length
    this.updateInfoLabel(pos, length);
  }

  private updateInfoLabel(pos: Vec3, length: number) {
    if (this.infoLabel) {
      this.infoLabel.string = `Pos: ${pos.toString()} \nLength: ${length.toFixed(
        2
      )}`;
    }
  }

  private updateDirection(pos: Vec3, length: number) {
    this.dir.x = pos.x / length;
    this.dir.y = pos.y / length;
  }

  private on_stick_end(event: EventTouch) {
    // console.log("on_stick_end", event);
    this.stick.setPosition(0, 0);
    this.resetDirection();
  }
  private on_stick_cancel(event: EventTouch) {
    // console.log("on_stick_cancel", event);
    this.stick.setPosition(0, 0);
    this.resetDirection();
    // console.log(event);
  }

  // Public method to get the position of the joystick's knob
  public getStickPosition(): Vec3 {
    return this.stick.position;
  }

  public resetDirection() {
    this.dir.x = 0;
    this.dir.y = 0;
  }

  start() {
    // console.log("Hello from on Start");
  }

  update(deltaTime: number) {}
}
