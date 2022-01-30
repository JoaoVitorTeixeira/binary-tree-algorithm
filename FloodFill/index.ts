export default class FloodFill {
  private screen: number[][];

  constructor(screen: number[][]) {
    this.screen = screen;
  }

  /**
   * Flood fill algorithm to fill the screen with a color
   * @param x The x position
   * @param y The y position
   * @param newColor The new color
   * @param solutionType The solution type
   */
  public floodFill(
    x: number,
    y: number,
    newColor: number,
    solutionType: "recursive" | "bfs"
  ) {
    if (solutionType == "recursive")
      this.recursiveSolution(x, y, newColor, this.screen[x][y]);
    else this.bfsSolution(x, y, newColor);

    this.printScreen();
  }

  /**
   * Recursive solution
   * @param x The x position
   * @param y The y position
   * @param newColor The new color
   * @param previousCollor The color must be changed
   * @returns Nothing, just stop the recursion
   */
  private recursiveSolution(
    x: number,
    y: number,
    newColor: number,
    previousCollor: number
  ) {
    if (this.isOutsideScreen(x, y)) return;
    if (this.screen[x][y] != previousCollor) return;
    if (this.screen[x][y] == newColor) return;

    this.screen[x][y] = newColor;

    this.recursiveSolution(x + 1, y, newColor, previousCollor); // East
    this.recursiveSolution(x - 1, y, newColor, previousCollor); // West
    this.recursiveSolution(x, y + 1, newColor, previousCollor); // North
    this.recursiveSolution(x, y - 1, newColor, previousCollor); // South
  }

  /**
   * Breadth First Search solution
   * @param x The x position
   * @param y The y position
   * @param newColor The new color
   */
  private bfsSolution(x: number, y: number, newColor: number) {
    const queue = new Array<number[]>();
    const visitsMarking = new Array(this.screen.length)
      .fill(0)
      .map(() => new Array(this.screen[0].length).fill(false));

    queue.push([x, y]);
    visitsMarking[x][y] = true;

    while (queue.length) {
      const [elementX, elementY] = queue.shift();
      const colorToChange = this.screen[elementX][elementY];

      this.screen[elementX][elementY] = newColor;

      if (
        !this.isOutsideScreen(elementX + 1, elementY) &&
        !visitsMarking[elementX + 1][elementY] &&
        this.screen[elementX + 1][elementY] == colorToChange
      ) {
        queue.push([elementX + 1, elementY]);
        visitsMarking[elementX + 1][elementY] = true;
      }

      if (
        !this.isOutsideScreen(elementX - 1, elementY) &&
        !visitsMarking[elementX - 1][elementY] &&
        this.screen[elementX - 1][elementY] == colorToChange
      ) {
        queue.push([elementX - 1, elementY]);
        visitsMarking[elementX - 1][elementY] = true;
      }

      if (
        !this.isOutsideScreen(elementX, elementY + 1) &&
        !visitsMarking[elementX][elementY + 1] &&
        this.screen[elementX][elementY + 1] == colorToChange
      ) {
        queue.push([elementX, elementY + 1]);
        visitsMarking[elementX][elementY + 1] = true;
      }

      if (
        !this.isOutsideScreen(elementX, elementY - 1) &&
        !visitsMarking[elementX][elementY - 1] &&
        this.screen[elementX][elementY - 1] == colorToChange
      ) {
        queue.push([elementX, elementY - 1]);
        visitsMarking[elementX][elementY - 1] = true;
      }
    }
  }

  /**
   * Print the screen
   */
  private printScreen() {
    for (let i = 0; i < this.screen.length; i++) {
      for (let j = 0; j < this.screen[i].length; j++) {
        console.log(`${this.screen[i][j]} `);
      }
      console.log("");
    }
  }

  /**
   *
   * @param x The x position
   * @param y The y position
   * @returns True if the position is outside the screen
   */
  private isOutsideScreen(x: number, y: number) {
    /**
     * Outside screen
     */
    return (
      x < 0 || y < 0 || x >= this.screen.length || y >= this.screen[0].length
    );
  }
}
