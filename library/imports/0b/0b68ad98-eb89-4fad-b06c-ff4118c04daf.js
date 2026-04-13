"use strict";
cc._RF.push(module, '0b68a2Y64lPrbBs/0EYwE2v', 'Spawner');
// Script/FirstTest/Spawner.ts

"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const CheckValid_1 = require("./CheckValid");
const { ccclass, property } = cc._decorator;
let NewClass = class NewClass extends cc.Component {
    constructor() {
        super(...arguments);
        this.prefabToSpawn = null;
        this.numberToSpawn = 10;
        this.timer = 0.5;
        this.spawnedObjects = [];
    }
    start() {
        this.spawnObject(this.numberToSpawn);
    }
    update(dt) {
        this.timer += dt;
        if (this.timer >= 1) {
            for (let target of this.spawnedObjects) {
                if (target.active === false) {
                    target.setPosition(Math.random(), 300);
                    target.active = true;
                    break;
                }
            }
            this.timer = 0;
        }
        for (let target of this.spawnedObjects) {
            if (target.active === true) {
                target.y -= 300 * dt;
            }
        }
    }
    spawnObject(numberToSpawn) {
        if (CheckValid_1.default(this.prefabToSpawn)) {
            for (let index = 0; index < numberToSpawn; index++) {
                const newNode = cc.instantiate(this.prefabToSpawn);
                newNode.setParent(this.node);
                newNode.active = false;
                this.spawnedObjects.push(newNode);
            }
        }
    }
};
__decorate([
    property(cc.Prefab)
], NewClass.prototype, "prefabToSpawn", void 0);
__decorate([
    property
], NewClass.prototype, "numberToSpawn", void 0);
NewClass = __decorate([
    ccclass
], NewClass);
exports.default = NewClass;

cc._RF.pop();