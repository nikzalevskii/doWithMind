import AddTodo from "./components/AddTodo/AddTodo";
import styles from "./App.module.css";
import TodoList from "./components/TodoList/TodoList";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "./store/store";
import { clearCompleted, setFilter } from "./store/slices/todoSlice";

function App() {
  const todos = useSelector((state: RootState) => state.todo.todos);
  const filter = useSelector((state: RootState) => state.todo.filter);
  const dispatch = useDispatch();

  const activeCount = todos.filter((todo) => !todo.completed).length;

  return (
    <div className={styles.container}>
      <span className={styles.logo}>DoWithMind</span>
      <h1 className={styles.title}>todos</h1>
      <AddTodo />
      <TodoList />
      <footer className={styles.footer}>
        <span>
          {activeCount} {activeCount === 1 ? "item" : "items"} left
        </span>
        <button
          onClick={() => dispatch(setFilter("all"))}
          className={filter === "all" ? styles.active : ""}
        >
          All
        </button>
        <button
          onClick={() => dispatch(setFilter("active"))}
          className={filter === "active" ? styles.active : ""}
        >
          Active
        </button>
        <button
          onClick={() => dispatch(setFilter("completed"))}
          className={filter === "completed" ? styles.active : ""}
        >
          Completed
        </button>
        <button onClick={() => dispatch(clearCompleted())}>
          Clear completed
        </button>
      </footer>
    </div>
  );
}

export default App;
