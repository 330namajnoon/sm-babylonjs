"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@babylonjs/core");
const BABYLON = __importStar(require("@babylonjs/core"));
require("@babylonjs/loaders");
const CollisionCallback_1 = __importDefault(require("./CollisionCallback"));
const GLBModel_1 = __importDefault(require("./Assets/GLBModel"));
const ammojs_typed_1 = __importDefault(require("ammojs-typed"));
class AppScene {
    constructor(config) {
        this.loaded = false;
        this.gravity = config.gravity;
        this.modules = config.modules;
        this.canvas = config.canvas;
        this.engine = new core_1.Engine(this.canvas);
        this.scene = new core_1.Scene(this.engine);
        this.camera = new BABYLON.ArcRotateCamera("camera", 0, 0, 10, new BABYLON.Vector3(0, 0, 0), this.scene);
        this.camera.attachControl(this.camera, true);
        this.collisionCallback = new CollisionCallback_1.default(this.scene);
        this.assets = [];
        this.engine.runRenderLoop(() => {
            this.update();
            this.scene.render();
        });
    }
    start(callback) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const ammo = yield ammojs_typed_1.default.bind(window)();
                this.scene.enablePhysics(this.gravity, new BABYLON.AmmoJSPlugin(true, ammo));
                callback(this);
            }
            catch (error) {
                callback(null);
            }
        });
    }
    import3DModel(name, path, fileName, scripts) {
        return __awaiter(this, void 0, void 0, function* () {
            const res = yield core_1.SceneLoader.ImportMeshAsync("", path, fileName, this.scene);
            const model = new GLBModel_1.default(name, res, scripts, this);
            this.assets.unshift(model);
            return model;
        });
    }
    initial() {
        this.assets.forEach(asset => {
            asset.initial();
        });
    }
    update() {
        this.assets.forEach(asset => {
            if (asset.update)
                asset.update();
        });
    }
}
exports.default = AppScene;
