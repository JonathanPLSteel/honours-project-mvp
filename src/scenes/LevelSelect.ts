import { Scene } from "phaser";
import LevelManager, { Level } from "../managers/LevelManager";

export class LevelSelect extends Scene {
    private level: number;
    private level_manager: LevelManager;

    constructor() {
        super("LevelSelect");
    }

    create() {
        this.level_manager = new LevelManager();

        this.add.text(100, 100, "Level Select", {
            fontFamily: "WorkSansBold, Arial, sans-serif",
            fontSize: 64,
            color: "#000000",
            align: "center",
        });
        this.addLevelButtons();
    }

    addLevelButton(x: number, y: number, level: Level) {
        this.add.text(x, y, `${level.name}`, {
            fontFamily: "WorkSansBold, Arial, sans-serif",
            fontSize: 32,
            color: "#000000",
            align: "center",
        }).setInteractive().on("pointerdown", () => {
            this.scene.start("Game", {level_id: level.id});
        });
    }

    addLevelButtons() {
        let levels = this.level_manager.getAllLevels();
        let x = 100;
        let y = 200;
        for (let level of levels) {
            this.addLevelButton(x, y, level);
            y += 50;
        }
    }
}