export interface Level {
    id: number;
    name: string;
    task_keys: string[];
    machine_names: string[];
    scoreChart: { [key: number]: number };
}

export default class LevelManager {
    private levels: Level[];
    private currentLevel: number;
    private scene: Phaser.Scene;

    constructor(scene: Phaser.Scene) {
        this.scene = scene;
        this.levels = [
            {
                id: 1,
                name: "Level 1",
                task_keys: ["carrots", "roast-chicken", "roast-potatoes"],
                machine_names: ["Chef Jonathan", "Chef Julian"],
                scoreChart: {
                    1: 100,
                    2: 200,
                    3: 300,
                },
            },
            {
                id: 2,
                name: "Level 2",
                task_keys: ["carrots", "roast-chicken", "roast-potatoes", "green-beans"],
                machine_names: ["Chef Jonathan", "Chef Julian", "Chef Jacob"],
                scoreChart: {
                    1: 100,
                    2: 200,
                    3: 300,
                },
            },
        ];
        this.currentLevel = 1;
    }

    public getCurrentLevel(): Level {
        return this.levels[this.currentLevel - 1];
    }

    public nextLevel(): void {
        this.currentLevel++;
    }

    public isLastLevel(): boolean {
        return this.currentLevel === this.levels.length;
    }
}
