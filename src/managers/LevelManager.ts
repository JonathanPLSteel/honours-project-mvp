export interface Level {
    id: number;
    name: string;
    task_keys: string[];
    machine_names: string[];
    scoreChart: { [key: number]: number };
    grade: number;
}

export default class LevelManager {
    private levels: Level[];

    constructor() {
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
                grade: 0,
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
                grade: 0,
            },
        ];
    }

    public getAllLevels(): Level[] {
        return this.levels;
    }

    public loadLevel(level: number): Level {
        if (level < 1 || level > this.levels.length) {
            throw new Error("Invalid level");
        }
        return this.levels[level - 1];
    }

    public setGrade(level: number, grade: number): void {
        if (level < 1 || level > this.levels.length) {
            throw new Error("Invalid level");
        }
        if (grade < 1 || grade > 3) {
            throw new Error("Invalid grade");
        }
        this.levels[level - 1].grade = grade;
    }
}
    