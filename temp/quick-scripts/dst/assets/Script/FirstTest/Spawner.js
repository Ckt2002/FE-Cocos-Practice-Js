
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Script/FirstTest/Spawner.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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
                    }
                    if (nodeEnv) {
                        __define(__module.exports, __require, __module);
                    }
                    else {
                        __quick_compile_project__.registerModuleFunc(__filename, function () {
                            __define(__module.exports, __require, __module);
                        });
                    }
                })();
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy9TY3JpcHQvRmlyc3RUZXN0L1NwYXduZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSw2Q0FBbUM7QUFDbkMsTUFBTSxFQUFFLE9BQU8sRUFBRSxRQUFRLEVBQUUsR0FBRyxFQUFFLENBQUMsVUFBVSxDQUFDO0FBRzVDLElBQXFCLFFBQVEsR0FBN0IsTUFBcUIsUUFBUyxTQUFRLEVBQUUsQ0FBQyxTQUFTO0lBQWxEOztRQUdXLGtCQUFhLEdBQXFCLElBQUksQ0FBQztRQUV2QyxrQkFBYSxHQUFXLEVBQUUsQ0FBQztRQUUxQixVQUFLLEdBQVcsR0FBRyxDQUFDO1FBQ3BCLG1CQUFjLEdBQWMsRUFBRSxDQUFDO0lBb0MzQyxDQUFDO0lBbENhLEtBQUs7UUFDWCxJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsQ0FBQztJQUN6QyxDQUFDO0lBRVMsTUFBTSxDQUFDLEVBQVU7UUFDdkIsSUFBSSxDQUFDLEtBQUssSUFBSSxFQUFFLENBQUM7UUFDakIsSUFBSSxJQUFJLENBQUMsS0FBSyxJQUFJLENBQUMsRUFBRTtZQUNqQixLQUFLLElBQUksTUFBTSxJQUFJLElBQUksQ0FBQyxjQUFjLEVBQUU7Z0JBQ3BDLElBQUksTUFBTSxDQUFDLE1BQU0sS0FBSyxLQUFLLEVBQUU7b0JBQ3pCLE1BQU0sQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRSxFQUFFLEdBQUcsQ0FBQyxDQUFDO29CQUN2QyxNQUFNLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQztvQkFDckIsTUFBTTtpQkFDVDthQUNKO1lBQ0QsSUFBSSxDQUFDLEtBQUssR0FBRyxDQUFDLENBQUM7U0FDbEI7UUFFRCxLQUFLLElBQUksTUFBTSxJQUFJLElBQUksQ0FBQyxjQUFjLEVBQUU7WUFDcEMsSUFBSSxNQUFNLENBQUMsTUFBTSxLQUFLLElBQUksRUFBRTtnQkFDeEIsTUFBTSxDQUFDLENBQUMsSUFBSSxHQUFHLEdBQUcsRUFBRSxDQUFDO2FBQ3hCO1NBQ0o7SUFDTCxDQUFDO0lBRU8sV0FBVyxDQUFDLGFBQXFCO1FBQ3JDLElBQUksb0JBQU8sQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLEVBQUU7WUFDN0IsS0FBSyxJQUFJLEtBQUssR0FBRyxDQUFDLEVBQUUsS0FBSyxHQUFHLGFBQWEsRUFBRSxLQUFLLEVBQUUsRUFBRTtnQkFDaEQsTUFBTSxPQUFPLEdBQUcsRUFBRSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFtQixDQUFDO2dCQUNyRSxPQUFRLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztnQkFDOUIsT0FBUSxDQUFDLE1BQU0sR0FBRyxLQUFLLENBQUM7Z0JBQ3hCLElBQUksQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLE9BQVEsQ0FBQyxDQUFDO2FBQ3RDO1NBQ0o7SUFDTCxDQUFDO0NBQ0osQ0FBQTtBQXpDRztJQURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsTUFBTSxDQUFDOytDQUMwQjtBQUU5QztJQURDLFFBQVE7K0NBQ3lCO0FBTGpCLFFBQVE7SUFENUIsT0FBTztHQUNhLFFBQVEsQ0E0QzVCO2tCQTVDb0IsUUFBUSIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBJc1ZhbGlkIGZyb20gXCIuL0NoZWNrVmFsaWRcIjtcbmNvbnN0IHsgY2NjbGFzcywgcHJvcGVydHkgfSA9IGNjLl9kZWNvcmF0b3I7XG5cbkBjY2NsYXNzXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBOZXdDbGFzcyBleHRlbmRzIGNjLkNvbXBvbmVudCB7XG5cbiAgICBAcHJvcGVydHkoY2MuUHJlZmFiKVxuICAgIHB1YmxpYyBwcmVmYWJUb1NwYXduOiBjYy5QcmVmYWIgfCBudWxsID0gbnVsbDtcbiAgICBAcHJvcGVydHlcbiAgICBwdWJsaWMgbnVtYmVyVG9TcGF3bjogbnVtYmVyID0gMTA7XG5cbiAgICBwcml2YXRlIHRpbWVyOiBudW1iZXIgPSAwLjU7XG4gICAgcHJpdmF0ZSBzcGF3bmVkT2JqZWN0czogY2MuTm9kZVtdID0gW107XG5cbiAgICBwcm90ZWN0ZWQgc3RhcnQoKTogdm9pZCB7XG4gICAgICAgIHRoaXMuc3Bhd25PYmplY3QodGhpcy5udW1iZXJUb1NwYXduKTtcbiAgICB9XG5cbiAgICBwcm90ZWN0ZWQgdXBkYXRlKGR0OiBudW1iZXIpOiB2b2lkIHtcbiAgICAgICAgdGhpcy50aW1lciArPSBkdDtcbiAgICAgICAgaWYgKHRoaXMudGltZXIgPj0gMSkge1xuICAgICAgICAgICAgZm9yIChsZXQgdGFyZ2V0IG9mIHRoaXMuc3Bhd25lZE9iamVjdHMpIHtcbiAgICAgICAgICAgICAgICBpZiAodGFyZ2V0LmFjdGl2ZSA9PT0gZmFsc2UpIHtcbiAgICAgICAgICAgICAgICAgICAgdGFyZ2V0LnNldFBvc2l0aW9uKE1hdGgucmFuZG9tKCksIDMwMCk7XG4gICAgICAgICAgICAgICAgICAgIHRhcmdldC5hY3RpdmUgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLnRpbWVyID0gMDtcbiAgICAgICAgfVxuXG4gICAgICAgIGZvciAobGV0IHRhcmdldCBvZiB0aGlzLnNwYXduZWRPYmplY3RzKSB7XG4gICAgICAgICAgICBpZiAodGFyZ2V0LmFjdGl2ZSA9PT0gdHJ1ZSkge1xuICAgICAgICAgICAgICAgIHRhcmdldC55IC09IDMwMCAqIGR0O1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBzcGF3bk9iamVjdChudW1iZXJUb1NwYXduOiBudW1iZXIpOiB2b2lkIHtcbiAgICAgICAgaWYgKElzVmFsaWQodGhpcy5wcmVmYWJUb1NwYXduKSkge1xuICAgICAgICAgICAgZm9yIChsZXQgaW5kZXggPSAwOyBpbmRleCA8IG51bWJlclRvU3Bhd247IGluZGV4KyspIHtcbiAgICAgICAgICAgICAgICBjb25zdCBuZXdOb2RlID0gY2MuaW5zdGFudGlhdGUodGhpcy5wcmVmYWJUb1NwYXduKSBhcyBjYy5Ob2RlIHwgbnVsbDtcbiAgICAgICAgICAgICAgICBuZXdOb2RlIS5zZXRQYXJlbnQodGhpcy5ub2RlKTtcbiAgICAgICAgICAgICAgICBuZXdOb2RlIS5hY3RpdmUgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICB0aGlzLnNwYXduZWRPYmplY3RzLnB1c2gobmV3Tm9kZSEpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxufVxuIl19