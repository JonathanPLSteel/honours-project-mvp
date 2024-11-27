import { Scene } from 'phaser';
import TaskManager from '../gameobjects/TaskManager';

export class Game extends Scene
{
    camera: Phaser.Cameras.Scene2D.Camera;
    background: Phaser.GameObjects.Image;
    msg_text : Phaser.GameObjects.Text;

    private task_manager: TaskManager;

    constructor ()
    {
        super('Game');
    }

    create ()
    {
        let tasks = ["carrots", "green-beans", "roast-chicken", "roast-potatoes"]
        this.task_manager = new TaskManager(this, tasks);
    }

    update(time: number, delta: number): void {
        this.task_manager.update();
    }
}
