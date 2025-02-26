import { fireEvent, render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { store } from "../../store/store";
import AddTodo from "./AddTodo";
import "@testing-library/jest-dom";

test("очищает поле ввода после добавления задачи", () => {
  render(
    <Provider store={store}>
      <AddTodo />
    </Provider>
  );

  const input = screen.getByPlaceholderText("What needs to be done?");
  fireEvent.change(input, { target: { value: "Новая задача" } });
  fireEvent.submit(screen.getByTestId("todo-form"));

  expect(input).toHaveValue("");
});
