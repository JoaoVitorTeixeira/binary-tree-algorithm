import NodeTree from "./NodeTree";

export default class Tree {
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
