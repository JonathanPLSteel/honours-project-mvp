export default class Machine extends Phaser.GameObjects.Container {
    scene: Phaser.Scene;
    name: string;
    id: number;
    total: number;
    background: Phaser.GameObjects.Sprite;

    private dropZone: Phaser.GameObjects.Zone;

    constructor(scene: Phaser.Scene, name: string, x: number, y: number, width: number, height: number, id: number, total: number) {
        super(scene, x, y);

        this.scene = scene;
        this.name = name;
        this.id = id;
        this.total = total;

        this.background = this.scene.add.sprite(0, 0, 'machine-bg');
        this.background.setDisplaySize(width, height);
        this.add(this.background);

        this.setSize(width, height);

        this.dropZone = scene.add.zone(x, y, width, height).setRectangleDropZone(width, height);

        if (this.dropZone.input) {
            const graphics = scene.add.graphics();
            graphics.lineStyle(2, 0x00ff00);
            graphics.strokeRect(
                this.dropZone.x - this.dropZone.input.hitArea.width / 2,
                this.dropZone.y - this.dropZone.input.hitArea.height / 2,
                this.dropZone.input.hitArea.width,
                this.dropZone.input.hitArea.height
            );
        }

        this.addDropZoneListeners();

        // Add the sprite to the scene
        this.scene.add.existing(this);
    }

    private addDropZoneListeners() {
        this.scene.input.on('dragenter', (pointer: Phaser.Input.Pointer, gameObject: Phaser.GameObjects.Sprite, dropZone: Phaser.GameObjects.Zone) => {
            console.log("dragenter detected")
            if (dropZone === this.dropZone) {
                console.log('Task entered the drop zone!');
                this.background.setTint(0x00ff00); // Highlight the machine
            }
        });

        this.scene.input.on('dragleave', (pointer: Phaser.Input.Pointer, gameObject: Phaser.GameObjects.Sprite, dropZone: Phaser.GameObjects.Zone) => {
            console.log("dragleave detected")
            if (dropZone === this.dropZone) {
                console.log('Task left the drop zone!');
                this.background.clearTint(); // Remove highlight
            }
        });

        this.scene.input.on('drop', (pointer: Phaser.Input.Pointer, gameObject: Phaser.GameObjects.Sprite, dropZone: Phaser.GameObjects.Zone) => {
            console.log("drop detected")
            if (dropZone === this.dropZone) {
                console.log('Task dropped into the machine!');
                // Snap the task to the center of the machine
                gameObject.x = this.x;
                gameObject.y = this.y;
                this.background.clearTint();
            }
        });
    }

    public update() {

    }
}