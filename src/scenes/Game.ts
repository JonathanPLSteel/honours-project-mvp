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

    constructor ()
    {
        super('Game');
    }

    create ()
    {
        // this.camera = this.cameras.main;
        // this.camera.setBackgroundColor(0x00ff00);

        // this.background = this.add.image(512, 384, 'background');
        // this.background.setAlpha(0.5);

        // this.msg_text = this.add.text(512, 384, 'Make something fun!\nand share it with us:\nsupport@phaser.io', {
        //     fontFamily: 'Arial Black', fontSize: 38, color: '#ffffff',
        //     stroke: '#000000', strokeThickness: 8,
        //     align: 'center'
        // });
        // this.msg_text.setOrigin(0.5);

        this.test_task_1 = new Task(this, "Carrot", 150, 500, 250, 150, 0, 10);

        this.test_task_2 = new Task(this, "Carrot", 700, 500, 250, 150, 1, 10);

        this.test_machine_1 = new Machine(this, "Chef Jonathan", 500, 250, 250, 150, 0, 0);

        // this.input.once('pointerdown', () => {

        //     this.scene.start('GameOver');

        // });
    }

    update(time: number, delta: number): void {
        this.test_task_1.update()
        this.test_task_2.update()
    }
}
