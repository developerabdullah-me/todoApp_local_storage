import { useEffect, useState } from "react";
export default function App() {
  const [todos, setTodos] = useState(() => {
    const savedTodos = localStorage.getItem("todos");
    if (savedTodos) {
      return JSON.parse(savedTodos);
    } else {
      return [];
    }
  });
  const [todo, setTodo] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [currentTodo, setCurrentTodo] = useState({});

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  function handleInputChange(e) {
    setTodo(e.target.value);
  }

  function handleEditInputChange(e) {
    setCurrentTodo({ ...currentTodo, text: e.target.value });
    
  }

  function handleFormSubmit(e) {
    e.preventDefault();

    if (todo !== "") {
      setTodos([
        ...todos,
        {
          id: todos.length + 1,
          text: todo.trim(),
        },
      ]);
    }

    setTodo("");
  }

  function handleEditFormSubmit(e) {
    e.preventDefault();

    handleUpdateTodo(currentTodo.id, currentTodo);
  }

  function handleDeleteClick(id) {
    const removeItem = todos.filter((todo) => {
      return todo.id !== id;
    });
    setTodos(removeItem);
  }
  function handleUpdateTodo(id, updatedTodo) {
    const updatedItem = todos.map((todo) => {
      return todo.id === id ? updatedTodo : todo;
    });
    setTodos(updatedItem);
  }

  function handleEditClick(todo) {
    setIsEditing(true);

    setCurrentTodo({ ...todo });
  }

  return (
    <div className="text-center mt-20">
      {isEditing ? (
        <form onSubmit={handleEditFormSubmit}>
          <h2 className="font-bold text-xl">Edit Todo</h2>
          <input className=""
            name="editTodo"
            type="text"
            required
            placeholder="Edit todo"
            value={currentTodo.text}
            onChange={handleEditInputChange}
          />
          <button className="bg-sky-500 py-2 px-5 rounded m-2" type="submit">Update</button>
          <button className="bg-red-500 py-2 px-5 rounded m-2 " onClick={() => setIsEditing(false)}>Cancel</button>
        </form>
      ) : (
        <form className="text-center" onSubmit={handleFormSubmit}>
          <h2 className="text-2xl font-bold text-amber-500 text-center">Add Todo</h2>
          <input
          required
            name="todo"
            type="text"
            placeholder="Create a new todo"
            value={todo}
            onChange={handleInputChange}
          />
          <button className="bg-sky-500 py-2 px-5 rounded hover:bg-black hover:text-white font-bold" type="submit">Add</button>
        </form>
      )}

      <ol className="todo-list">
        {todos.map((todo) => (
          <li key={todo.id}>
            {todo.text}
            <button
              className="bg-sky-500 py-2 px-5 rounded-md hover:text-white font-bold m-3"
              onClick={() => handleEditClick(todo)}
            >
              Edit
            </button>
            <button
              className="bg-red-500 py-2 px-7 rounded font-bold text-white m-3 hover:bg-black tr"
              onClick={() => handleDeleteClick(todo.id)}
            >
              Delet
            </button>
          </li>
        ))}
      </ol>
    </div>
  );
}
