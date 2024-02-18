import { Engine, Scene, SceneLoader } from "@babylonjs/core"
import * as BABYLON from "@babylonjs/core";
import "@babylonjs/loaders";
import CollisionCallback from "./CollisionCallback";
import GLBModel from "./Assets/GLBModel";
import ISceneConfig from "../Interfaces/ISceneConfig";
import Ammo from "ammojs-typed";

class AppScene {
	gravity: BABYLON.Vector3;
	camera: BABYLON.ArcRotateCamera;
	modules: any[];
	loaded: boolean = false;
	canvas: HTMLCanvasElement;
	engine: Engine;
	scene: Scene;
	assets: any[];
	collisionCallback: CollisionCallback;
	constructor(config: ISceneConfig) {
		this.gravity = config.gravity;
		this.modules = config.modules;
		this.canvas = config.canvas;
		this.engine = new Engine(this.canvas);
		this.scene = new Scene(this.engine);
		this.camera = new BABYLON.ArcRotateCamera("camera", 0, 0, 10, new BABYLON.Vector3(0, 0, 0), this.scene);
		this.camera.attachControl(this.camera, true);
		this.collisionCallback = new CollisionCallback(this.scene);
		this.assets = [];
		this.engine.runRenderLoop(() => {
			this.update();
			this.scene.render();
		})
	}

	

	async start(callback: (app: AppScene | null) => void) {
		try {
			const ammo = await Ammo.bind(window)();
			this.scene.enablePhysics(this.gravity, new BABYLON.AmmoJSPlugin(true, ammo));
			callback(this);
		} catch (error) {
			callback(null);
		}
	} 

	async import3DModel(name: string, path: string, fileName: string, scripts: any[]) {
		const res = await SceneLoader.ImportMeshAsync("", path, fileName, this.scene)
		const model = new GLBModel(name, res, scripts, this);
		this.assets.unshift(model);
		return model;
	}

	initial() {
		this.assets.forEach(asset => {
			asset.initial();
		})
	}

	update() {
		this.assets.forEach(asset => {
			if (asset.update) asset.update();
		})
	}
}

export default AppScene;
