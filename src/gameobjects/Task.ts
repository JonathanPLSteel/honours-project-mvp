export default class Task extends Phaser.GameObjects.Container {
    scene: Phaser.Scene;
    x: number;
    y: number;
    width: number;
    height: number;
    name: string;
    id: number;
    text: string;
    duration: number;

    constructor(
        scene: Phaser.Scene,
        x: number,
        y: number,
        width: number,
        height: number,
        name: string,
        id: number,
        text: string,
        duration: number
    ) {
        super(scene, x, y);
        this.scene = scene;
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.name = name;
        this.id = id;
        this.text = text;
        this.duration = duration;

        const background = new Phaser.GameObjects.Sprite(
            scene,
            0,
            0,
            "task-bg"
        );
        background.setOrigin(0, 0);
        background.setDisplaySize(width, height);

        const nameText = new Phaser.GameObjects.Text(
            scene,
            this.width / 2,
            this.height * 0.2,
            `${name}`,
            {
                fontSize: "24px",
                color: "#000000",
            }
        );
        nameText.setOrigin(0.5);

        const icon = new Phaser.GameObjects.Image(
            scene,
            this.width / 2,
            this.height * 0.5,
            "carrot"
        );
        icon.setDisplaySize(100, 100);
        icon.setOrigin(0.5);

        const durationText = new Phaser.GameObjects.Text(
            scene,
            this.width / 2,
            this.height * 0.8,
            `Duration: ${duration}`,
            {
                fontSize: "16px",
                color: "#000000",
            }
        );
        durationText.setOrigin(0.5);

        // Add all elements to the container
        this.add([background, nameText, icon, durationText]);

        // // Draw a boundary around the container
        // const taskBoundary = scene.add.graphics();
        // taskBoundary.lineStyle(2, 0xff0000, 1); // Red boundary with thickness of 2
        // taskBoundary.strokeRect(x, y, width, height);

        this.scene.add.existing(this);
    }
}
