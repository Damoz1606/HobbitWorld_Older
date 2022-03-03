interface MainScreen {
    game: Phaser.Game;
    sizeChanged: () => void;
}

export class GameMainState implements MainScreen{
    private static _instance: GameMainState;
    game!: Phaser.Game;
    sizeChanged!: () => void;

    private constructor() { }

    public static instance(): GameMainState {
        if (this._instance === undefined) {
            this._instance = new GameMainState();
        }
        return this._instance;
    }

}