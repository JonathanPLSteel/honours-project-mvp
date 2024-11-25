import { Scene } from 'phaser';
import Task from '../gameobjects/Task';

export class Game extends Scene
{
    camera: Phaser.Cameras.Scene2D.Camera;
    background: Phaser.GameObjects.Image;
    msg_text : Phaser.GameObjects.Text;

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

        let first_task = new Task(this, "Carrot", 200, 250, 250, 150, 0, 10);

        let second_task = new Task(this, "Carrot", 100, 150, 250, 150, 1, 10);

        // this.input.once('pointerdown', () => {

        //     this.scene.start('GameOver');

        // });
    }
}
