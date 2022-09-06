class History {
  #historyStack;
  #tempHistoryStack;

  constructor() {
    this.#historyStack = [];
    this.#tempHistoryStack = [];
  }

  Undo() {
    if (this.#historyStack.length === 1) return;

    const lastAction = this.#historyStack.pop();
    const currentAction = this.#historyStack[this.#historyStack.length - 1];
    this.#tempHistoryStack.push(lastAction);
    return currentAction.functions.FromJSON(
      currentAction.cells,
      currentAction.config
    );
  }

  Redo() {
    if (this.#tempHistoryStack.length === 0) return;

    const lastAction = this.#tempHistoryStack.pop();
    this.#historyStack.push(lastAction);
    return lastAction.functions.FromJSON(lastAction.cells, lastAction.config);
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
  }

  Clear() {
    this.#historyStack = [];
    this.#tempHistoryStack = [];
  }
}
