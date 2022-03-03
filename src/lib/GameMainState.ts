export class GameMainState {
    private static _instance: GameMainState;
    public game?: Phaser.Game;
    public sizeChanged?: () => void;

    private constructor() { }

    public static instance(): GameMainState {
        if (this._instance === undefined) {
            this._instance = new GameMainState();
        }
        return this._instance;
    }

}