export default class Machine extends Phaser.GameObjects.Container {
    scene: Phaser.Scene;
    name: string;
    id: number;
    total: number;
    background: Phaser.GameObjects.Sprite;
    hitbox: Phaser.Geom.Rectangle;

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
        this.hitbox = new Phaser.Geom.Rectangle(x, y, width, height)

        // Add the sprite to the scene
        this.scene.add.existing(this);
    }

    public update() {

    }
}