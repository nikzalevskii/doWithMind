import { fireEvent, render, screen } from "@testing-library/react";
import { store } from "./store/store";
import { Provider } from "react-redux";
import App from "./App";
import { addTodo, toggleTodo } from "./store/slices/todoSlice";

describe("App Component", () => {
  beforeEach(() => {
    store.dispatch({ type: "RESET_STATE" });
  });

  test("отображает заголовки", () => {
    render(
      <Provider store={store}>
        <App />
      </Provider>
    );
    expect(screen.getByText("DoWithMind")).toBeInTheDocument();
    expect(screen.getByText("todos")).toBeInTheDocument();
  });

  test("отображает количество активных задач", () => {
    store.dispatch(addTodo("Задача 1"));
    store.dispatch(addTodo("Задача 2"));
    const state = store.getState().todo.todos;
    store.dispatch(toggleTodo(state[1].id));

    render(
      <Provider store={store}>
        <App />
      </Provider>
    );
    expect(screen.getByText("1 item left")).toBeInTheDocument();
  });
  test("переключает фильтры", () => {
    render(
      <Provider store={store}>
        <App />
      </Provider>
    );
    const allButton = screen.getByText("All");
    const activeButton = screen.getByText("Active");
    const completedButton = screen.getByText("Completed");

    fireEvent.click(activeButton);
    expect(activeButton).toHaveClass("active");
    expect(allButton).not.toHaveClass("active");

    fireEvent.click(completedButton);
    expect(completedButton).toHaveClass("active");
    expect(activeButton).not.toHaveClass("active");
  });

  test("очищает выполненные задачи", () => {
    store.dispatch(addTodo("Задача 1"));
    store.dispatch(addTodo("Задача 2"));
    const state = store.getState().todo.todos;
    store.dispatch(toggleTodo(state[1].id));

    render(
      <Provider store={store}>
        <App />
      </Provider>
    );

    const clearButton = screen.getByText("Clear completed");
    fireEvent.click(clearButton);

    expect(store.getState().todo.todos.length).toBe(1);
  });
  test("рендерит дочерние компоненты", () => {
    render(
      <Provider store={store}>
        <App />
      </Provider>
    );
    expect(
      screen.getByPlaceholderText("What needs to be done?")
    ).toBeInTheDocument();
    expect(screen.getByRole("list")).toBeInTheDocument();
  });
});
