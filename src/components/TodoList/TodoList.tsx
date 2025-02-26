import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/store";
import styles from "./TodoList.module.css";
import { toggleTodo } from "../../store/slices/todoSlice";

const TodoList = () => {
  const todos = useSelector((state: RootState) => state.todo.todos);
  const filter = useSelector((state: RootState) => state.todo.filter);
  const dispatch = useDispatch();

  const filteredTodos =
    filter === "all"
      ? todos
      : filter === "active"
      ? todos.filter((todo) => !todo.completed)
      : todos.filter((todo) => todo.completed);

  return (
    <ul className={styles.list}>
      {filteredTodos.map((todo) => (
        <li
          key={todo.id}
          className={`${styles.item} ${todo.completed ? styles.completed : ""}`}
        >
          <input
            type="checkbox"
            checked={todo.completed}
            onChange={() => dispatch(toggleTodo(todo.id))}
            className={styles.checkbox}
          />
          <span onClick={() => dispatch(toggleTodo(todo.id))}>{todo.text}</span>
        </li>
      ))}
    </ul>
  );
};

export default TodoList;
