export default class Task extends Phaser.GameObjects.Sprite {
    constructor(scene: Phaser.Scene, x: number, y: number, width: number, height: number) {
        super(scene, x, y, 'task-bg'); // 'task-bg' is the texture key

        this.scene = scene;

        // Add the sprite to the scene
        this.scene.add.existing(this);

        // Configure the sprite
        this.setOrigin(0.5, 0.5);
        this.setDisplaySize(width, height);
        this.setInteractive();

        // Enable dragging
        this.enableDrag();
    }

    private enableDrag() {
        // Enable drag for the sprite
        this.scene.input.setDraggable(this);

        // Drag events
        this.on("dragstart", () => {
            this.setAlpha(0.8); // Optional visual feedback
        });

        this.on("drag", (pointer: Phaser.Input.Pointer, dragX: number, dragY: number) => {
            // Phaser handles dragX and dragY for you, no offset needed
            this.setPosition(dragX, dragY);
        });

        this.on("dragend", () => {
            this.setAlpha(1); // Reset alpha
        });
    }
}