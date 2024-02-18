"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class GLBModel {
    constructor(name, modelData, scripts, app) {
        this.scripts = [];
        this.setScripts = () => {
            this.scripts = [];
            this.scriptsModules.forEach((script) => {
                const Script = script;
                const newScript = new Script(this, this.app);
                newScript.initial();
                this.scripts.unshift(new Script(this, this.app));
            });
        };
        this.initial = () => {
            this.scripts.forEach((script) => {
                if (script.initial)
                    script.initial();
            });
        };
        this.update = () => {
            this.scripts.forEach((script) => {
                if (script.update)
                    script.update();
            });
        };
        this.name = name;
        this.app = app;
        this.scriptsModules = scripts;
        this.meshes = modelData.meshes;
        this.animationGroups = modelData.animationGroups;
        this.animationGroups.forEach((animation) => {
            animation.loopAnimation = false;
            animation.pause();
        });
        this.setScripts();
    }
}
exports.default = GLBModel;
