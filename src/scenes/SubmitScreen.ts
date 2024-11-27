import { Scene } from "phaser";

export class SubmitScreen extends Scene {
    grading_text: Phaser.GameObjects.Text;

    constructor() {
        super('SubmitScreen');
    }

    create(data: { total_duration: number }) {
        this.grading_text = this.add.text(512, 384, `${data.total_duration} minutes`, {
            fontFamily: "WorkSansBold, Arial, sans-serif", fontSize: 64, color: '#ffffff',
            stroke: '#000000', strokeThickness: 8,
            align: 'center'
        });
        this.grading_text.setOrigin(0.5);

        this.input.once('pointerdown', () => {
            this.scene.start('Game');
        });
    }
}