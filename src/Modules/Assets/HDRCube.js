"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@babylonjs/core");
class HDRCube {
    constructor(path, scene, size, exposure, contrast) {
        this.skybox = core_1.MeshBuilder.CreateBox("skyBox", { size: 1000.0 }, scene);
        new core_1.BackgroundMaterial("skyBoxMaterial", scene);
        this.hdrTexture = new core_1.HDRCubeTexture(path, scene, size);
        scene.environmentTexture = this.hdrTexture;
        scene.imageProcessingConfiguration.exposure = exposure;
        scene.imageProcessingConfiguration.contrast = contrast;
        this.pbrMaterial = new core_1.PBRMaterial("pbr", scene);
        this.pbrMaterial.reflectanceTexture = this.hdrTexture;
    }
}
exports.default = HDRCube;
