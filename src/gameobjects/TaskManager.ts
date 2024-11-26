import Machine from "./Machine";
import Task from "./Task";

export default class TaskManager {
    private tasks: Task[] = [];
    private machines: Machine[] = [];
    private scene: Phaser.Scene;

    private task_dims = {
        width: 175,
        height: 125
    }

    constructor(scene: Phaser.Scene) {
        this.scene = scene;

        this.addTask(new Task(this.scene, "Carrot", 150, 650, this.task_dims.width, this.task_dims.height, 0, 10));

        this.addTask(new Task(this.scene, "Carrot", 700, 650, this.task_dims.width, this.task_dims.height, 1, 10));

        this.addMachine(new Machine(this.scene, "Chef Jonathan", 250, 250, 475, 450, 0, 0));

        this.addMachine(new Machine(this.scene, "Chef Josh", 750, 250, 475, 450, 1, 0));
    }

    addTask(task: Task) {
        this.tasks.push(task);
    }

    addMachine(machine: Machine) {
        this.machines.push(machine);
    }

    update() {
        this.tasks.forEach(task => task.update());
        this.machines.forEach(machine => machine.update());
    }
}