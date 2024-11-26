import { Scene } from 'phaser';
import Task from '../gameobjects/Task';
import Machine from '../gameobjects/Machine';

export class Game extends Scene
{
    camera: Phaser.Cameras.Scene2D.Camera;
    background: Phaser.GameObjects.Image;
    msg_text : Phaser.GameObjects.Text;

    private test_task_1!: Task;
    private test_task_2!: Task;

    private test_machine_1: Machine;
    private test_machine_2: Machine;

    constructor ()
    {
        super('Game');
    }

    create ()
    {

        this.test_task_1 = new Task(this, "Carrot", 150, 500, 175, 125, 0, 10);

        this.test_task_2 = new Task(this, "Carrot", 700, 500, 175, 125, 1, 10);

        this.test_machine_1 = new Machine(this, "Chef Jonathan", 250, 250, 400, 240, 0, 0);

        this.test_machine_2 = new Machine(this, "Chef Josh", 750, 250, 400, 240, 1, 0);

    }

    update(time: number, delta: number): void {
        this.test_task_1.update()
        this.test_task_2.update()
    }
}
