import { Scene } from 'phaser';
import TaskManager from '../managers/TaskManager';

export class Game extends Scene
{
    camera: Phaser.Cameras.Scene2D.Camera;
    background: Phaser.GameObjects.Image;
    msg_text : Phaser.GameObjects.Text;

    private task_manager: TaskManager;
    private scoreChart: { [key: number]: number };

    constructor ()
    {
        super('Game');
    }

    create ()
    {
        let tasks = ["carrots", "green-beans", "roast-chicken", "roast-potatoes", "carrots"]

        let machine_names = ["Chef Jonathan", "Chef Julian", "Chef Jacob"];

        this.scoreChart = {
            55: 1,
            40: 3,
        };

        this.task_manager = new TaskManager(this, tasks, machine_names);

        this.events.on('submit', this.onSubmit, this);
    }

    onSubmit() {
        let total_duration = this.task_manager.getTotalDuration();
        let grade = this.scoreChart[total_duration];
        if (grade === undefined) {
            grade = 1;
        }
        this.scene.start('SubmitScreen', { grade: grade });
    }

    update(time: number, delta: number): void {
        this.task_manager.update();
    }
}
