"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@babylonjs/core");
class CollisionCallback {
    constructor(scene) {
        this.callbacks = [];
        this.scene = scene;
        this.scene.onPointerDown = (event, pickInfo) => {
            this.onPointerDown(event, pickInfo);
        };
        this.scene.onPointerMove = (event, pickInfo) => {
            this.onPointerMove(event, pickInfo);
        };
        this.scene.onPointerUp = (event, pickInfo) => {
            this.onPointerUp(event, pickInfo);
        };
    }
    onPointerDown(event, pickInfo) {
        this.callbacks.forEach((callback) => {
            var _a;
            if (callback[0] === "onPointerDown" && callback[1] === ((_a = pickInfo.pickedMesh) === null || _a === void 0 ? void 0 : _a.id)) {
                const callback_ = callback[2];
                callback_(event, pickInfo);
            }
        });
    }
    onPointerMove(event, pickInfo) {
        this.callbacks.forEach((callback) => {
            var _a;
            if (callback[0] === "onPointerMove" && callback[1] === ((_a = pickInfo.pickedMesh) === null || _a === void 0 ? void 0 : _a.id)) {
                const callback_ = callback[2];
                callback_(event, pickInfo);
            }
        });
    }
    onPointerUp(event, pickInfo) {
        this.callbacks.forEach((callback) => {
            var _a;
            if (callback[0] === "onPointerUp" && callback[1] === ((_a = pickInfo === null || pickInfo === void 0 ? void 0 : pickInfo.pickedMesh) === null || _a === void 0 ? void 0 : _a.id)) {
                const callback_ = callback[2];
                callback_(event, pickInfo || new core_1.PickingInfo());
            }
        });
    }
    addEventListener(eventType, eventName, callback) {
        this.callbacks.unshift([eventType, eventName, callback]);
    }
}
exports.default = CollisionCallback;
