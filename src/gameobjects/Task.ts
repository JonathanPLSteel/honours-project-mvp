export default class Task extends Phaser.GameObjects.Sprite {
    scene: Phaser.Scene;
    name: string;
    id: number;
    duration: number;

    private nameText!: Phaser.GameObjects.Text;
    private durationText!: Phaser.GameObjects.Text;
    private icon!: Phaser.GameObjects.Image;

    constructor(scene: Phaser.Scene, name: string, x: number, y: number, width: number, height: number, id: number, duration: number) {
        super(scene, x, y, 'task-bg');

        this.scene = scene;
        this.name = name;
        this.id = id;
        this.duration = duration;

        // Add the sprite to the scene
        this.scene.add.existing(this);

        // Configure the sprite
        this.setOrigin(0.5, 0.5);
        this.setDisplaySize(width, height);
        this.setInteractive();

        // Adding additional components
        this.addComponents();

        // Enable dragging
        this.enableDrag();
    }

    private addComponents() {
        this.nameText = this.scene.add.text(
            this.x,
            this.y - this.displayHeight * 0.3,
            this.name,
            {
                fontFamily: 'WorkSansBold, Arial, sans-serif',
                fontSize: "20px",
                color: "#000000",
            }
        )
        this.nameText.setOrigin(0.5,0.5);

        this.icon = this.scene.add.image(
            this.x,
            this.y,
            "carrot"
        );
        this.icon.setDisplaySize(40, 40);
        this.icon.setOrigin(0.5, 0.5);

        this.durationText = this.scene.add.text(
            this.x,
            this.y + this.displayHeight * 0.3,
            `${this.duration} minutes`,
            {
                fontFamily: 'WorkSansRegular, Arial, sans-serif',
                fontSize: "16px",
                color: "#000000",
            }
        );
        this.durationText.setOrigin(0.5, 0.5);
    }

    private enableDrag() {
        // Enable drag for the sprite
        this.scene.input.setDraggable(this);

        // Drag events
        this.on("dragstart", () => {
            this.setAlpha(0.8);
            this.setDepth(999);
        });

        this.on("drag", (pointer: Phaser.Input.Pointer, dragX: number, dragY: number) => {
            this.setPosition(dragX, dragY);
        });

        this.on("dragend", (pointer: Phaser.Input.Pointer, dropped: boolean) => {
            this.setAlpha(1);

            this.setDepth(2);

            // FIXME: Works but creates a slight bug when overlapping with other tasks.
            this.nameText.setDepth(3);
            this.icon.setDepth(3);
            this.durationText.setDepth(3);

            if (!dropped) {
                console.log('Task was not dropped in a valid zone, resetting position...')
                this.x = 512
                this.y = 680
            }
            else {
                console.log('Task should have been dropped...')
            }
        });
    }

    public update() {
        this.nameText.setPosition(this.x, this.y - this.displayHeight * 0.3);
        this.icon.setPosition(this.x, this.y)
        this.durationText.setPosition(this.x, this.y + this.displayHeight * 0.3);
    }
}