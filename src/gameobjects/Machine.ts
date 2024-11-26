export default class Machine extends Phaser.GameObjects.Container {
    scene: Phaser.Scene;
    name: string;
    id: number;
    total: number;
    background: Phaser.GameObjects.Sprite;

    private dropZone: Phaser.GameObjects.Zone;

    private nameText!: Phaser.GameObjects.Text;
    private totalText!: Phaser.GameObjects.Text;
    private icon!: Phaser.GameObjects.Image;

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

        this.addComponents();

        this.addDropZoneListeners();

        // Add the sprite to the scene
        this.scene.add.existing(this);
    }

    private addComponents() {
        this.nameText = this.scene.add.text(
            0,
            -(this.displayHeight * 0.425),
            this.name,
            {
                fontFamily: 'WorkSansBold, Arial, sans-serif',
                fontSize: "20px",
                color: "#000000",
            }
        )
        this.nameText.setOrigin(0.5,0.5);
        this.add(this.nameText)

        this.icon = this.scene.add.image(
            0,
            -(this.displayHeight * 0.3),
            "chef"
        );
        this.icon.setDisplaySize(70, 70);
        this.icon.setOrigin(0.5, 0.5);
        this.add(this.icon)

        this.totalText = this.scene.add.text(
            0,
            this.displayHeight * 0.425,
            `${this.total} minutes`,
            {
                fontFamily: 'WorkSansRegular, Arial, sans-serif',
                fontSize: "16px",
                color: "#000000",
            }
        );
        this.totalText.setOrigin(0.5, 0.5);
        this.add(this.totalText)
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