import Machine from "./Machine";
import Task from "./Task";
import TaskBar from "./TaskBar";

export default class TaskManager {
    private tasks: Task[] = [];
    private machines: Machine[] = [];
    private task_bar: TaskBar;
    private scene: Phaser.Scene;

    private task_dims = {
        width: 175,
        height: 125,
    };

    constructor(scene: Phaser.Scene) {
        this.scene = scene;

        this.task_bar = new TaskBar(
            this.scene,
            this,
            "Task Bar",
            this.scene.scale.width / 2,
            this.scene.scale.height - this.task_dims.height * 0.6,
            this.scene.scale.width,
            this.task_dims.height * 1.2,
            0
        );

        for (let i=0; i<this.task_bar.getCapacity(); i++) {
            this.addTask(
                new Task(
                    this.scene,
                    "Carrot",
                    this.task_bar.getSlotCoords()[i].x,
                    this.task_bar.getSlotCoords()[i].y,
                    this.task_dims.width,
                    this.task_dims.height,
                    this.tasks.length,
                    10,
                    "carrot"
                )
            );
        }

        // this.addTask(
        //     new Task(
        //         this.scene,
        //         "Carrot",
        //         150,
        //         650,
        //         this.task_dims.width,
        //         this.task_dims.height,
        //         this.tasks.length,
        //         10,
        //         "carrot"
        //     )
        // );

        // this.addTask(
        //     new Task(
        //         this.scene,
        //         "Carrot",
        //         800,
        //         650,
        //         this.task_dims.width,
        //         this.task_dims.height,
        //         this.tasks.length,
        //         10,
        //         "carrot"
        //     )
        // );

        // this.addTask(
        //     new Task(
        //         this.scene,
        //         "Roast Chicken",
        //         600,
        //         650,
        //         this.task_dims.width,
        //         this.task_dims.height,
        //         this.tasks.length,
        //         30,
        //         "roast-chicken"
        //     )
        // );

        // this.addTask(
        //     new Task(
        //         this.scene,
        //         "Roast Chicken",
        //         400,
        //         650,
        //         this.task_dims.width,
        //         this.task_dims.height,
        //         this.tasks.length,
        //         30,
        //         "roast-chicken"
        //     )
        // );

        this.addMachine(
            new Machine(
                this.scene,
                this,
                "Chef Jonathan",
                250,
                250,
                475,
                450,
                0
            )
        );

        this.addMachine(
            new Machine(this.scene, this, "Chef Josh", 750, 250, 475, 450, 1)
        );
    }

    addTask(task: Task) {
        this.tasks.push(task);
    }

    addMachine(machine: Machine) {
        this.machines.push(machine);
    }

    getTaskDims() {
        return this.task_dims;
    }

    update() {
        this.tasks.forEach((task) => task.update());
        this.machines.forEach((machine) => machine.update());
    }
}
