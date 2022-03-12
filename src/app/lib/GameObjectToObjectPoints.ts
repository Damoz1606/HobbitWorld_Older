export const gameObjectToObjectPoints = (gameObjects: any[]): ObjectPoint[] => {
    return gameObjects.map(gameObject => gameObject as ObjectPoint);
}