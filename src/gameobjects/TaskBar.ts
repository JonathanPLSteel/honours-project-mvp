import TaskManager from "./TaskManager";

export default class TaskBar extends Phaser.GameObjects.Container {
    scene: Phaser.Scene;
    taskManager: TaskManager;
    name: string;
    id: number;
    background: Phaser.GameObjects.Rectangle;

    private slot_coords: { x: number; y: number }[];
    private capacity: number;
    
    constructor(scene: Phaser.Scene, taskManager: TaskManager, name: string, x: number, y: number, width: number, height: number, id: number) {
        super(scene, x, y);

        this.scene = scene;
        this.taskManager = taskManager;
        this.name = name;
        this.id = id;

        this.background = this.scene.add.rectangle(0, 0, width, height, 0xe1e1e1, 1);
        this.background.setDisplaySize(width, height);
        this.add(this.background);

        this.setSize(width, height);

        this.slot_coords = [
            {
                x: this.x - this.displayWidth * 0.1,
                y: this.y - this.displayHeight * 0.05,
            },
            {
                x: this.x - this.displayWidth * 0.3,
                y: this.y - this.displayHeight * 0.05,
            },
            {
                x: this.x + this.displayWidth * 0.1,
                y: this.y - this.displayHeight * 0.05,
            },
            {
                x: this.x + this.displayWidth * 0.3,
                y: this.y - this.displayHeight * 0.05,
            }
        ];

        this.capacity = this.slot_coords.length;

        this.scene.add.existing(this);
    }

    public getCapacity(): number {
        return this.capacity;
    }


    public getSlotCoords(): { x: number; y: number }[] {
        return this.slot_coords;
    }
}