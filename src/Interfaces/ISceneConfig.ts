import { Vector3 } from "@babylonjs/core";

export default interface ISceneConfig {
	modules: any[];
	canvas: HTMLCanvasElement;
	gravity: Vector3;
}