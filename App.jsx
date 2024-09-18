import { useState } from "react";
import "./App.css";

const App = () => {
  // State quản lý các việc cần làm và trạng thái hiển thị (All, Active, Completed)
  const [todos, setTodos] = useState([
    { id: 1, text: "Do coding challenges", completed: false },
    { id: 2, text: "Do coding challenges", completed: false },
    { id: 3, text: "Do coding challenges", completed: true },
  ]);
  const [filter, setFilter] = useState("All"); // State để quản lý tab hiện tại
  const [newTodo, setNewTodo] = useState(""); // State để lưu giá trị của input mới

  // Hàm thêm việc mới (Chỉ hoạt động khi tab là "All" hoặc "Active")
  const addTodo = () => {
    if (newTodo.trim() === "") return; // Kiểm tra input không được rỗng
    if (filter === "Completed") return; // Không cho phép thêm việc mới khi đang ở tab "Completed"

    const newTodoItem = {
      id: todos.length + 1,
      text: newTodo,
      completed: false, // Mặc định trạng thái là "Active"
    };
    setTodos([...todos, newTodoItem]);
    setNewTodo(""); // Reset input sau khi thêm
  };

  // Hàm lọc các việc dựa trên tab
  const getFilteredTodos = () => {
    if (filter === "Active") {
      return todos.filter((todo) => !todo.completed); // Hiển thị các việc chưa hoàn thành
    }
    if (filter === "Completed") {
      return todos.filter((todo) => todo.completed); // Hiển thị các việc đã hoàn thành
    }
    return todos; // Hiển thị tất cả nếu ở tab "All"
  };

  // Hàm thay đổi trạng thái hoàn thành của việc
  const toggleTodoCompletion = (id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  // Hàm xóa một task đã completed
  const deleteCompletedTodo = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  // Hàm xóa tất cả các việc đã hoàn thành
  const deleteAllCompletedTodos = () => {
    setTodos(todos.filter((todo) => !todo.completed));
  };

  return (
    <div className="main">
      <div className="header">
        <h1>#todo</h1>
      </div>

      <div className="tab">
        <div
          className={`itemT ${filter === "All" ? "active" : ""}`}
          onClick={() => setFilter("All")}
        >
          All
        </div>
        <div
          className={`itemT ${filter === "Active" ? "active" : ""}`}
          onClick={() => setFilter("Active")}
        >
          Active
        </div>
        <div
          className={`itemT ${filter === "Completed" ? "active" : ""}`}
          onClick={() => setFilter("Completed")}
        >
          Completed
        </div>
      </div>

      <div className="header2">
        <div className="search">
          <input
            type="text"
            placeholder="add details"
            value={newTodo}
            onChange={(e) => setNewTodo(e.target.value)}
          />
        </div>
        <div className="button-add">
          <button onClick={addTodo}>Add</button>
        </div>
      </div>

      <div className="content">
        {getFilteredTodos().length > 0 ? (
          getFilteredTodos().map((todo) => (
            <div key={todo.id} className="item">
              <input
                type="checkbox"
                checked={todo.completed}
                onChange={() => toggleTodoCompletion(todo.id)}
              />
              <label
                style={{
                  textDecoration: todo.completed ? "line-through" : "none",
                  color: todo.completed ? "gray" : "black",
                }}
              >
                {todo.text}
              </label>
              {filter === "Completed" && (
                <button
                  className="delete-button"
                  onClick={() => deleteCompletedTodo(todo.id)}
                >
                  🗑️
                </button>
              )}
            </div>
          ))
        ) : (
          <p>No tasks to display</p>
        )}
      </div>

      {filter === "Completed" && getFilteredTodos().length > 0 && (
        <div className="delete">
          <button onClick={deleteAllCompletedTodos}>🗑️Delete All</button>
        </div>
      )}
    </div>
  );
};

export default App;
