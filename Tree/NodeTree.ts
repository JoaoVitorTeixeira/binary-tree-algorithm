export default class NodeTree {
  public data: number;
  public horizontalDistance: number;
  public rightNode: NodeTree;
  public leftNode: NodeTree;

  /**
   *
   * @param element The element to add
   */
  constructor(element: number) {
    this.data = element;
  }
}
