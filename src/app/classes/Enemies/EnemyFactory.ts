import { Player } from "../Player/Player";
import { CryingBud } from "./CryingBud";
import { CryingWaterBud } from "./CryingWaterBud";
import { Enemy } from "./Enemy";
import { MinorMinion } from "./MinorMinion";
import { Phatom } from "./Phantom";
import { SlimeBrown } from "./SlimeBrown";
import { SlimeGreen } from "./SlimeGreen";

export enum EnemyType {
    CryingBud,
    CryingWaterBud,
    MinorMinion,
    Phatom,
    SlimeBrown,
    SlimeGreen,
}

export class EnemyFactory {
    public static create(scene: Phaser.Scene, x: number, y: number, type: EnemyType, target: Player): Enemy {
        switch (type) {
            case EnemyType.CryingBud:
                return new CryingBud(scene, x, y, "crying-bud", target);
            case EnemyType.CryingWaterBud:
                return new CryingWaterBud(scene, x, y, "crying-water-bud", target);
            case EnemyType.MinorMinion:
                return new MinorMinion(scene, x, y, "minor-minion", target);
            case EnemyType.Phatom:
                return new Phatom(scene, x, y, "phantom", target);
            case EnemyType.SlimeBrown:
                return new SlimeBrown(scene, x, y, "slime-brown", target);
            case EnemyType.SlimeGreen:
                return new SlimeGreen(scene, x, y, "slime-green", target);
        }
    }
}