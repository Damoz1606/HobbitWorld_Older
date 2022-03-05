export enum PlayerEvent {
    ATTACK = 'attack',
    BLOCK = 'block',
    DEATH = 'death',
    HIT = 'hit',
    JUMP = 'jump',
    RUN = 'run',
    GAIN_COIN = 'gainCoin',
    GAIN_EXP = 'gainExp',
    GAIN_HEALTH = 'gainHealth',
}

export enum EnemyEvent {
    ATTACK = 'attack',
    DEATH = 'death',
    HIT = 'hit',
}

export enum GameEvent {
    GAME_START,
    GAME_OVER,
    GAME_PAUSE,
    GAME_RESUME,
    GAME_WIN,
}

export enum LevelEvent {
    LEVEL_START,
    LEVEL_OVER,
    LEVEL_COMPLETED,
}