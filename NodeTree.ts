class NodeTree {
  public data: number;
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
