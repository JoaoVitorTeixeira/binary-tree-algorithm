export default class BalancedBrackets {
  private str: string;

  /**
   *
   * @param str The string to check for balanced brackets
   */
  constructor(str: string) {
    this.str = str;
  }

  /**
   *
   * @returns true if the brackets are balanced, false otherwise
   */
  public validate(): boolean {
    const stack = new Array<string>();
    for (const element of this.str) {
      if (element == "{" || element == "(" || element == "[") {
        stack.push(element);
        continue;
      }

      // Must close at least one bracket
      if (stack.length == 0) return false;

      const toCheck = stack.pop();

      switch (element) {
        case "}":
          if (toCheck != "{") return false;
          break;

        case ")":
          if (toCheck != "(") return false;
          break;

        case "]":
          if (toCheck != "[") return false;
          break;
      }
    }

    return stack.length == 0;
  }
}
