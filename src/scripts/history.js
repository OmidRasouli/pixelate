class History {
  #historyStack;
  #tempHistoryStack;

  constructor() {
    this.#historyStack = [];
    this.#tempHistoryStack = [];
  }

  Undo() {
    if (this.#historyStack.length === 0) return;

    const lastAction = this.#historyStack.pop();
    this.#tempHistoryStack.push(lastAction);
    return lastAction.FromJson();
  }

  Redo() {
    if (this.#tempHistoryStack.length === 0) return;

    const lastAction = this.#tempHistoryStack.pop();
    this.#historyStack.push(lastAction);
    return lastAction.FromJson;
  }

  SaveHistory(action) {
    const jsonAction = action.ToJSON();
    if (
      this.#historyStack.length > 0 &&
      jsonAction === this.#historyStack[this.#historyStack.length - 1]
    )
      return;

    this.#historyStack.push(jsonAction);
    this.#tempHistoryStack = [];
    console.log(this.#historyStack);
  }

  Clear() {
    this.#historyStack = [];
    this.#tempHistoryStack = [];
  }
}
