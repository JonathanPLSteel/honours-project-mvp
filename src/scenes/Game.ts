import { Scene } from 'phaser';
import TaskManager from '../managers/TaskManager';
import LevelManager, { Level } from '../managers/LevelManager';

export class Game extends Scene
{
    private task_manager: TaskManager;
    private level_manager: LevelManager;
    private current_level: Level;

    constructor ()
    {
        super('Game');
    }

    create ()
    {
        
        this.level_manager = new LevelManager(this);

        this.current_level = this.level_manager.getCurrentLevel();

        this.task_manager = new TaskManager(this, this.current_level.task_keys, this.current_level.machine_names);

        this.events.on('submit', this.onSubmit, this);
    }

    onSubmit() {
        let total_duration = this.task_manager.getTotalDuration();
        let grade = this.current_level.scoreChart[total_duration];
        if (grade === undefined) {
            grade = 1;
        }
        this.scene.start('SubmitScreen', { grade: grade });
    }

    update(time: number, delta: number): void {
        this.task_manager.update();
    }
}
