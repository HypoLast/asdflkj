import * as EventEmitter from "events";
import Map from "../world/Map";
import { repulsionForce } from "../world/physicalConstants";
import World from "../world/World";

abstract class Actor extends PIXI.Sprite {
    private static ID_IDX = 1;

    public size: PIXI.Point = new PIXI.Point();
    public velocity = new PIXI.Point();
    public fallthrough?: number;
    public weight = 1;
    public id: number;

    constructor(public world: World) {
        super();
        this.id = Actor.ID_IDX ++;
    }

    get top() {
        return this.y;
    }

    get bottom() {
        return this.y + this.size.y;
    }

    get left() {
        return this.x;
    }

    get right() {
        return this.x + this.size.x;
    }

    get horizontalCenter() {
        return this.x + this.size.x / 2;
    }

    get verticalCenter() {
        return this.y + this.size.y / 2;
    }

    public repel(other: Actor, damper = 8.5): boolean {
        if (!this.collideable) return false;
        let dist = this.horizontalCenter - other.horizontalCenter;
        if (Math.abs(dist) < (this.size.x / 2 + other.size.x / 2) * 0.85) {
            if (!other.collideable) return true;
            if (Math.abs(this.bottom - other.bottom) < 15) {
                let force = repulsionForce(dist, damper);
                let weightRatio = this.weight / other.weight;
                if (dist < 0) {
                    this.velocity.x -= force / weightRatio * (this.velocity.x > 0 ? 2 : 1);
                    other.velocity.x += force * weightRatio * (other.velocity.x < 0 ? 2 : 1);
                } else {
                    this.velocity.x += force / weightRatio * (this.velocity.x < 0 ? 2 : 1);
                    other.velocity.x -= force * weightRatio * (other.velocity.x > 0 ? 2 : 1);
                }
            }
            return true;
        } else {
            return false;
        }
    }

    public applyImpulse(x: number, y: number) {
        this.velocity.x += x;
        this.velocity.y += y;
    }

    get collideable() {
        return true;
    }

    public abstract updateImpulse(map: Map): void;
    public abstract handleCollisions(collisions: [boolean, boolean]): void;
    public abstract frameUpdate(): void;
}

export default Actor;
