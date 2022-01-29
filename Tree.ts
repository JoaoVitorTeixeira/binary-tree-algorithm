class Tree {
  private root: NodeTree;

  /**
   *
   * @param data The data of a node
   */
  constructor(data: number[]) {
    data.forEach((element) => this.addElementOnTree(element));
  }

  /**
   *
   * @returns The height of the tree
   */
  public getHeight(): number {
    return this.recursiveGetHeight(this.root, -1, 0);
  }

  /**
   *
   * @param actualNode The actual node
   * @param actualHeight The actual height
   * @param greatestHeight The greatest height
   * @returns The height of the tree
   */
  private recursiveGetHeight(
    actualNode: NodeTree,
    actualHeight: number,
    greatestHeight: number
  ) {
    if (!actualNode) return greatestHeight;

    if (++actualHeight > greatestHeight) {
      greatestHeight = actualHeight;
    }

    greatestHeight = this.recursiveGetHeight(
      actualNode.leftNode,
      actualHeight,
      greatestHeight
    );
    greatestHeight = this.recursiveGetHeight(
      actualNode.rightNode,
      actualHeight,
      greatestHeight
    );

    return greatestHeight;
  }

  /**
   *
   * @param element The element to add
   */
  private addElementOnTree(element: number) {
    this.root = this.recursiveAddElement(this.root, new NodeTree(element));
  }

  /**
   *
   * @param root The root of the tree
   * @param newElement The new element to add
   * @returns The root of the tree
   */
  private recursiveAddElement(root: NodeTree, newElement: NodeTree): NodeTree {
    if (!root) {
      return newElement;
    }

    if (root.data > newElement.data) {
      root.rightNode = this.recursiveAddElement(root.rightNode, newElement);
    } else {
      root.leftNode = this.recursiveAddElement(root.leftNode, newElement);
    }

    return root;
  }
}
