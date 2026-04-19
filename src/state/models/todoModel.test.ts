import { createStore } from "easy-peasy";

import todoModel from "./todoModel";

describe("todoModel", () => {
  it("adds and toggles todos while updating the computed total", () => {
    const store = createStore(todoModel);

    store.getActions().addTodo("Ship the first safety gate");

    const addedTodo = store.getState().todoList[0];

    expect(store.getState().todoList).toHaveLength(1);
    expect(addedTodo.task).toBe("Ship the first safety gate");
    expect(addedTodo.isComplete).toBe(false);
    expect(store.getState().completedTasks).toBe(0);

    store.getActions().toggleTodo(addedTodo);

    expect(store.getState().todoList[0].isComplete).toBe(true);
    expect(store.getState().completedTasks).toBe(1);
  });
});
