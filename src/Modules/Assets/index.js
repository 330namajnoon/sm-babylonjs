"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const GLBModel_1 = __importDefault(require("./GLBModel"));
const HDRCube_1 = __importDefault(require("./HDRCube"));
const Script_1 = __importDefault(require("./Script"));
const assets = { GLBModel: GLBModel_1.default, HDRCube: HDRCube_1.default, Script: Script_1.default };
exports.default = assets;
