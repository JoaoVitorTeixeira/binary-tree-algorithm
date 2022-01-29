import NodeTree from "./NodeTree";

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
   * @returns Level order of the tree in an array
   */
  public getLevelOrderInLine(): number[] {
    const queue = new Array<NodeTree>();
    const levelOrder = new Array<number>();

    queue.push(this.root);

    while (queue.length) {
      const element = queue.shift();

      levelOrder.push(element.data);

      if (element.leftNode) queue.push(element.leftNode);
      if (element.rightNode) queue.push(element.rightNode);
    }

    return levelOrder;
  }

  /**
   *
   * @returns An array of top view of the tree
   */
  public getTopView(): number[] {
    const queue = new Array<NodeTree>();
    const mapTopView = new Map();
    let horizontalDistance = 0;

    this.root.horizontalDistance = horizontalDistance;
    queue.push(this.root);

    while (queue.length) {
      const element = queue.shift();
      horizontalDistance = element.horizontalDistance;

      if (!mapTopView.has(horizontalDistance)) {
        mapTopView.set(horizontalDistance, element.data);
      }

      if (element.leftNode) {
        element.leftNode.horizontalDistance = horizontalDistance - 1;
        queue.push(element.leftNode);
      }

      if (element.rightNode) {
        element.rightNode.horizontalDistance = horizontalDistance + 1;
        queue.push(element.rightNode);
      }
    }

    /**
     * There's no flaMap method :(
     */
    const result = Array.from(mapTopView)
      .sort((a, b) => a[0] - b[0])
      .reduce<number[]>((acc, element) => {
        acc.unshift(element[1]);
        return acc;
      }, []);

    return result;
  }

  /**
   *
   * @returns The root of the tree in order traversal
   */
  public getInOrderTraversals(): number[] {
    return this.recursiveInOrderTraversals(this.root);
  }

  /**
   * It make a no binary tree.
   * @param dataToCompare The data to compare and if is equal,
   * the left and right nodes will be set to elements of the array
   * @param elements An array of two elements: 0 - left, 1 - right
   */
  public addElementsAfterData(dataToCompare: number, elements: number[]) {
    const queue = new Array<NodeTree>();

    queue.push(this.root);

    while (queue.length) {
      const actualElement = queue.shift();

      if (!actualElement) continue;

      if (actualElement.data == dataToCompare) {
        actualElement.leftNode =
          elements[0] > -1 ? new NodeTree(elements[0]) : null;
        actualElement.rightNode =
          elements[1] > -1 ? new NodeTree(elements[1]) : null;

        return;
      }

      queue.push(actualElement.leftNode);
      queue.push(actualElement.rightNode);
    }
  }

  /**
   * Given a value, it will swap the the subtree of all the nodes at each depth h,
   * where h is a multiple of value.
   * @param value The value to swap
   */
  public swapNodes(value: number) {
    this.recursiveSwapNode(this.root, value, 0);
  }

  /**
   *
   * @param root The root of the tree
   * @param value The value to swap
   * @param height The actual height
   * @returns Nothing, just stop the recursion
   */
  public recursiveSwapNode(root: NodeTree, value: number, height: number) {
    if (!root) return;

    // Height is multiple of value
    if (++height % value == 0) {
      const nodeToChange = root.rightNode;

      root.rightNode = root.leftNode;
      root.leftNode = nodeToChange;
    }

    this.recursiveSwapNode(root.leftNode, value, height);
    this.recursiveSwapNode(root.rightNode, value, height);
  }

  /**
   *
   * @param root The root of the tree
   * @returns An array of in order traversal
   */
  private recursiveInOrderTraversals(root: NodeTree): number[] {
    let queue = new Array<number>();

    if (!root) return queue;

    queue = queue.concat(this.recursiveInOrderTraversals(root.leftNode));
    queue.push(root.data);
    queue = queue.concat(this.recursiveInOrderTraversals(root.rightNode));

    return queue;
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

    if (root.data < newElement.data) {
      root.rightNode = this.recursiveAddElement(root.rightNode, newElement);
    } else {
      root.leftNode = this.recursiveAddElement(root.leftNode, newElement);
    }

    return root;
  }
}
