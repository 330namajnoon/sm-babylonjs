
import { Scene, Engine } from "@babylonjs/core";
import IGlbModel from "./IGlbModel";

export default interface IScene {
	canvas: HTMLCanvasElement;
	engine: Engine;
	scene: Scene;
	glbModels: IGlbModel[];
	createScene: () => Scene;
	draw: () => void;
	update: () => void;
}