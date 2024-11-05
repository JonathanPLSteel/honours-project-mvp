// TODO: Container is not the one. Look for another game object solution.


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

    private dragOffsetX: number = 0;
    private dragOffsetY: number = 0;

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

        // Initialize components
        this.addBackground();
        this.addNameText();
        this.addIcon();
        this.addDurationText();

        // Initialize interactivity
        this.enableDrag();

        // Add the container to the scene
        this.scene.add.existing(this);
    }

    private addBackground() {
        const background = new Phaser.GameObjects.Sprite(
            this.scene,
            0,
            0,
            "task-bg"
        );
        background.setOrigin(0, 0);
        background.setDisplaySize(this.width, this.height);
        this.add(background);
    }

    private addNameText() {
        const nameText = new Phaser.GameObjects.Text(
            this.scene,
            this.width / 2,
            this.height * 0.2,
            `${this.name}`,
            {
                fontSize: "24px",
                color: "#000000",
            }
        );
        nameText.setOrigin(0.5);
        this.add(nameText);
    }

    private addIcon() {
        const icon = new Phaser.GameObjects.Image(
            this.scene,
            this.width / 2,
            this.height * 0.5,
            "carrot"
        );
        icon.setDisplaySize(this.height / 3, this.height / 3);
        icon.setOrigin(0.5);
        this.add(icon);
    }

    private addDurationText() {
        const durationText = new Phaser.GameObjects.Text(
            this.scene,
            this.width / 2,
            this.height * 0.8,
            `Duration: ${this.duration}`,
            {
                fontSize: "16px",
                color: "#000000",
            }
        );
        durationText.setOrigin(0.5);
        this.add(durationText);
    }

    private enableDrag() {
        // Set the interactive area and enable drag
        this.setSize(this.width, this.height);
        this.setInteractive(new Phaser.Geom.Rectangle(0, 0, this.width, this.height), Phaser.Geom.Rectangle.Contains);
        this.scene.input.setDraggable(this);

        // Draw a debugging outline around the interactive area
        const debugGraphics = this.scene.add.graphics();
        debugGraphics.lineStyle(2, 0xff0000, 1);

        // Draw the outline to match the container's interactive area
        debugGraphics.strokeRect(0, 0, this.width, this.height);

        // Make sure the debug outline is above the background but below other elements
        this.addAt(debugGraphics, 0); // Add it at index 0 in the container, so it's at the bottom

        // Drag events
        this.on("dragstart", (pointer: Phaser.Input.Pointer) => {
            this.setAlpha(0.8); // Optional visual feedback
            this.dragOffsetX = this.x - pointer.x;
            this.dragOffsetY = this.y - pointer.y;
        });

        this.on(
            "drag",
            (pointer: Phaser.Input.Pointer, dragX: number, dragY: number) => {
                this.x = pointer.x + this.dragOffsetX;
                this.y = pointer.y + this.dragOffsetY;
            }
        );

        this.on("dragend", (pointer: Phaser.Input.Pointer) => {
            this.setAlpha(1); // Reset alpha
        });
    }
}
