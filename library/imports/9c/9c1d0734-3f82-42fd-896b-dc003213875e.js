"use strict";
cc._RF.push(module, '9c1d0c0P4JC/Ylr3AAyE4de', 'Movement');
// Script/FirstTest/Movement.ts

"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const { ccclass, property } = cc._decorator;
let NewClass = class NewClass extends cc.Component {
    constructor() {
        super(...arguments);
        this.moveSpeed = 10;
        this.moveLeft = false;
        this.moveRight = false;
    }
    onLoad() {
        const manager = cc.director.getCollisionManager();
        manager.enabled = true;
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN, this.onMouseDown, this);
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_UP, this.onMouseUp, this);
    }
    onDestroy() {
        cc.systemEvent.off(cc.SystemEvent.EventType.KEY_DOWN, this.onMouseDown, this);
        cc.systemEvent.off(cc.SystemEvent.EventType.KEY_UP, this.onMouseUp, this);
    }
    update(dt) {
        if (this.moveRight) {
            this.node.x += this.moveSpeed * dt;
        }
        else if (this.moveLeft) {
            this.node.x -= this.moveSpeed * dt;
        }
    }
    onMouseDown(event) {
        switch (event.keyCode) {
            case cc.macro.KEY.a:
            case cc.macro.KEY.left:
                this.moveLeft = true;
                break;
            case cc.macro.KEY.d:
            case cc.macro.KEY.right:
                this.moveRight = true;
                break;
        }
    }
    onMouseUp(event) {
        switch (event.keyCode) {
            case cc.macro.KEY.a:
            case cc.macro.KEY.left:
                this.moveLeft = false;
                break;
            case cc.macro.KEY.d:
            case cc.macro.KEY.right:
                this.moveRight = false;
                break;
        }
    }
    onCollisionEnter(other, self) {
        console.log("Player hit Target!");
        other.node.active = false;
    }
};
__decorate([
    property
], NewClass.prototype, "moveSpeed", void 0);
NewClass = __decorate([
    ccclass
], NewClass);
exports.default = NewClass;

cc._RF.pop();