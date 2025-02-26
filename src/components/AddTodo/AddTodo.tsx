import { FormEvent, useState } from "react";
import styles from "./AddTodo.module.css";
import { useDispatch } from "react-redux";
import { addTodo } from "../../store/slices/todoSlice";

const AddTodo = () => {
  const [text, setText] = useState("");
  const dispatch = useDispatch();

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (text.trim()) {
      dispatch(addTodo(text));
      setText("");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className={styles.form}
      data-testid="todo-form"
    >
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="What needs to be done?"
        className={styles.input}
      />
    </form>
  );
};

export default AddTodo;
