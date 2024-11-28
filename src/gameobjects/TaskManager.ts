import Button from "./Button";
import Machine from "./Machine";
import Task from "./Task";
import TaskBar from "./TaskBar";

interface MachineDimensions {
    width: number;
    height: number;
    x: number;
    y: number;
    capacity: number;
}

type MachineDimsDictionary = {
    [numMachines: number]: {
        [machineNo: number]: MachineDimensions;
    };
};

export default class TaskManager {
    private tasks: Task[] = [];
    private machines: Machine[] = [];
    private task_bar: TaskBar;
    private scene: Phaser.Scene;
    private total_duration: number;

    private task_types: { key: string; name: string; duration: number }[] = [
        { key: "carrots", name: "Carrots", duration: 10 },
        { key: "roast-chicken", name: "Roast Chicken", duration: 30 },
        { key: "roast-potatoes", name: "Roast Potatoes", duration: 25 },
        { key: "green-beans", name: "Green Beans", duration: 10 },
    ];

    private task_dims = {
        width: 175,
        height: 125,
    };

    private machine_dims: MachineDimsDictionary;
    private numMachines: number;


    private total_duration_text!: Phaser.GameObjects.Text;
    private submit_button!: Button;

    constructor(scene: Phaser.Scene, task_keys: string[], machine_names: string[]) {
        this.scene = scene;

        // Validate task_keys
        task_keys.forEach((key) => {
            if (!this.task_types.find((task) => task.key === key)) {
                throw new Error(`Invalid task key: ${key}`);
            }
        });

        this.numMachines = machine_names.length;

        if (this.numMachines < 2 || this.numMachines > 4) {
            throw new Error("Invalid number of machines");
        }

        this.machine_dims = {
            2: {
                0: {
                    width: this.scene.scale.width * 0.45,
                    height: this.scene.scale.height * 0.7,
                    x: this.scene.scale.width * 0.25,
                    y: this.scene.scale.height * 0.4,
                    capacity: 4,
                },
                1: {
                    width: this.scene.scale.width * 0.45,
                    height: this.scene.scale.height * 0.7,
                    x: this.scene.scale.width * 0.75,
                    y: this.scene.scale.height * 0.4,
                    capacity: 4,
                },
            },
            3: {
                0: {
                    width: 475,
                    height: 450,
                    x: 250,
                    y: 250,
                    capacity: 4,
                },
                1: {
                    width: 475,
                    height: 450,
                    x: 750,
                    y: 250,
                    capacity: 4,
                },
                2: {
                    width: 475,
                    height: 450,
                    x: 500,
                    y: 750,
                    capacity: 4,
                },
            },
            4: {
                0: {
                    width: 475,
                    height: 450,
                    x: 250,
                    y: 250,
                    capacity: 4,
                },
                1: {
                    width: 475,
                    height: 450,
                    x: 750,
                    y: 250,
                    capacity: 4,
                },
                2: {
                    width: 475,
                    height: 450,
                    x: 250,
                    y: 750,
                    capacity: 4,
                },
                3: {
                    width: 475,
                    height: 450,
                    x: 750,
                    y: 750,
                    capacity: 4,
                },
            },
        };

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

        for (let i = 0; i < this.task_bar.getCapacity(); i++) {
            this.addTask(
                new Task(
                    this.scene,
                    this.task_types.find(
                        (task) => task.key === task_keys[i]
                    )!.name,
                    this.task_bar.getSlotCoords()[i].x,
                    this.task_bar.getSlotCoords()[i].y,
                    this.task_dims.width,
                    this.task_dims.height,
                    this.tasks.length,
                    this.task_types.find(
                        (task) => task.key === task_keys[i]
                    )!.duration,
                    task_keys[i]
                )
            );
        }

        for (let i = 0; i < this.numMachines; i++) {
            this.addMachine(
                new Machine(
                    this.scene,
                    this,
                    machine_names[i],
                    this.machine_dims[this.numMachines][i].x,
                    this.machine_dims[this.numMachines][i].y,
                    this.machine_dims[this.numMachines][i].width,
                    this.machine_dims[this.numMachines][i].height,
                    this.machine_dims[this.numMachines][i].capacity,
                    i
                )
            );
        }

        this.total_duration = 0;

        this.total_duration_text = this.scene.add.text(
            this.scene.scale.width * 0.4625,
            this.scene.scale.height - this.task_bar.displayHeight * 1.75,
            `${this.total_duration} minutes`,
            {
                fontFamily: "WorkSansRegular, Arial, sans-serif",
                fontSize: "16px",
                color: "#000000",
            }
        );
    }

    private addTask(task: Task) {
        this.tasks.push(task);
    }

    private addMachine(machine: Machine) {
        this.machines.push(machine);
    }

    private updateTotalDuration() {
        // Get max duration from all machines

        this.total_duration = this.machines.reduce((max, machine) => {
            return machine.getTotal() > max ? machine.getTotal() : max;
        }, 0);
        this.total_duration_text.setText(`${this.total_duration} minutes`);
    }

    private checkSubmittable(): boolean {
        return this.tasks.every((task) => task.isAttached());
    }

    private displaySubmitButton() {
        this.submit_button = new Button(
            this.scene,
            this.total_duration_text.x +
                this.total_duration_text.displayWidth * 0.5,
            this.total_duration_text.y +
                this.total_duration_text.displayHeight * 2.5,
            0,
            "Submit",
            () => {
                this.scene.events.emit("submit");
            }
        );
    }

    private hideSubmitButton() {
        this.submit_button.destroy();
    }

    getTaskDims() {
        return this.task_dims;
    }

    getTotalDuration() {
        return this.total_duration;
    }

    update() {
        this.tasks.forEach((task) => task.update());

        this.machines.forEach((machine) => machine.update());
        this.updateTotalDuration();

        if (this.checkSubmittable()) {
            // TODO: Emitting events could be worth looking into.
            // this.scene.events.emit("submittable");

            this.displaySubmitButton();
        } else {
            if (this.submit_button) {
                this.hideSubmitButton();
            }
        }
    }
}
