import { fireEvent, render, screen } from "@testing-library/react";
import { addTodo, setFilter, toggleTodo } from "../../store/slices/todoSlice";
import { store } from "../../store/store";
import { Provider } from "react-redux";
import TodoList from "./TodoList";

describe("TodoList Component", () => {
  beforeEach(() => {
    store.dispatch({ type: "RESET_STATE" });
    store.dispatch(addTodo("Задача 1"));
    store.dispatch(addTodo("Задача 2"));
    const state = store.getState().todo.todos;
    const secondTaskId = state[1].id; // Получаем ID второй задачи
    store.dispatch(toggleTodo(secondTaskId)); // выполнили
  });

  test('отображает все задачи при фильтре "all"', () => {
    store.dispatch(setFilter("all"));
    render(
      <Provider store={store}>
        <TodoList />
      </Provider>
    );
    expect(screen.getByText("Задача 1")).toBeInTheDocument();
    expect(screen.getByText("Задача 2")).toBeInTheDocument();
  });

  test('отображает все активные задачи при фильтре "active"', async () => {
    store.dispatch(setFilter("active"));
    render(
      <Provider store={store}>
        <TodoList />
      </Provider>
    );

    expect(await screen.findByText("Задача 1")).toBeInTheDocument();
    expect(screen.queryByText("Задача 2")).not.toBeInTheDocument();
  });

  test('отображает только выполненные задачи при фильтре "completed"', async () => {
    store.dispatch(setFilter("completed"));
    render(
      <Provider store={store}>
        <TodoList />
      </Provider>
    );
    expect(screen.queryByText("Задача 1")).not.toBeInTheDocument();
    expect(await screen.findByText("Задача 2")).toBeInTheDocument();
  });

  test("переключает статус задачи при клике на чекбокс", () => {
    store.dispatch(setFilter("all"));
    render(
      <Provider store={store}>
        <TodoList />
      </Provider>
    );
    const taskText = screen.getByText("Задача 1");
    const checkbox = taskText
      .closest("li")
      ?.querySelector("input[type='checkbox']") as HTMLInputElement;

    expect(checkbox).not.toBeChecked();
    fireEvent.click(checkbox);
    expect(checkbox).toBeChecked();
  });

  test("применяет правильные классы для выполненных задач", () => {
    store.dispatch(setFilter("all"));
    render(
      <Provider store={store}>
        <TodoList />
      </Provider>
    );
    const completedTask = screen.getByText("Задача 2").closest("li");
    expect(completedTask).toHaveClass("completed");
  });
});
