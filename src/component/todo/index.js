import React, { useEffect, useState } from "react";
import "./style.css";

function ToDo() {
  const [todoList, setTodoList] = useState([
    { name: "Taste JavaScript", done: false },
    { name: "Code furiously", done: false },
    { name: "Promote Mavo", done: false },
    { name: "Have a life!", done: false },
  ]);
  const [todo, setTodo] = useState({ name: "", done: false });
  const [undoneCount, setUndoneCount] = useState(
    todoList.filter((item) => {
      return item.done === false;
    }).length
  );



  const [filter, setFilter] = useState(0);

  const filtered =
    filter === 0
      ? todoList.filter((item) => {
          return true;
        })
      : filter === 1
      ? todoList.filter((item) => {
          return item.done === false;
        })
      : todoList.filter((item) => {
          return item.done === true;
        });

//   const allDone = () => {
//     setTodoList(
//       todoList.map((todoList) =>
//         todoList.done === false ? { ...todoList, done: true }
//           : todoList.done === true ? { ...todoList, done: false } 
//           : { ...todoList }
//       )
//     );
//   };

const allDone = () => {
    var doneCount= (todoList.length)-undoneCount;

    doneCount===todoList.length ? //yapılan sayısı=listenin tamamı
    setTodoList(
        todoList.map((todo) =>
        todo.done === true ? { ...todo, done: false }: { ...todo } 
        )
  
      ) : setTodoList(
        todoList.map((todo) =>
        todo.done === false ? { ...todo, done: true }: { ...todo } 
        )
        
      ); 



    //elimde hiç false yoksa tüm done ları false yap
    //elimde bir tane bile true varsa tüm doneları true yap
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (todo.name === "") {
      return false;
    }
    setTodoList([...todoList, todo]);
  };

  const destroyItem = (id) => () => {
    setTodoList((items) => items.filter((_, i) => i !== id));
  };

  const clearCompleted = () => {
    setTodoList(todoList.filter((item) => item.done === false));
  };

  useEffect(() => {
    setTodo({ name: "", done: false });
    setUndoneCount(
      todoList.filter((item) => {
        return item.done === false;
      }).length
    );
  }, [todoList]);

  return (
    <div className="todoapp">
      <header className="header">
        <h1>ToDo List</h1>
        <form onSubmit={onSubmit}>
          <input
            name="name"
            value={todo.name}
            onChange={(e) =>
              setTodo({ [e.target.name]: e.target.value, done: false })
            }
            className="new-todo"
            placeholder="What needs to be done?"
            autoFocus
          />
        </form>
      </header>
      <ul className="todo-list">
        {filtered.map((item, id) => (
          <li mv-multiple="todo" className="listItem" key={id}>
            <span>
              <input
                type="checkbox"
                checked={item.done}
                onChange={() => {
                  item.done = !item.done;
                  setUndoneCount(
                    todoList.filter((item) => {
                      return item.done === false;
                    }).length
                  );
                }}
              />
            </span>

            {item.done ? (
              <span className="completed">{item.name}</span>
            ) : (
              <span>{item.name}</span>
            )}

            <span>
              <button className="destroy" onClick={destroyItem(id)}></button>
            </span>
          </li>
        ))}
      </ul>
      <hr />

      <div className="flex">
        <span className="text-11"><input type="checkbox"  onChange={allDone}  checked={(todoList.length- undoneCount)===todoList.length} />All Done </span>
        {filter === 0 ? (
          <span>|
            {undoneCount === 1 ? (
              <span className="text-13">{undoneCount} item left.</span>
            ) : undoneCount === 0 ? (
              <span className="text-13">All Completed!</span>
            ) : (
              <span className="text-13">{undoneCount} items left.</span>
            )}
          </span>
        ) : filter === 1 ? (
          <span>
            {undoneCount === 1 ? (
              <span className="text-13">{undoneCount} item active.</span>
            ) : undoneCount === 0 ? (
              <span className="text-13">All Completed!</span>
            ) : (
              <span className="text-13">{undoneCount} items active.</span>
            )}
          </span>
        ) : (
          <span>
            {undoneCount === 1 ? (
              <span className="text-13">
                {todoList.length - undoneCount} item completed.
              </span>
            ) : undoneCount === 0 ? (
              <span className="text-13">All Completed!</span>
            ) : (
              <span className="text-13">
                {todoList.length - undoneCount} items completed.
              </span>
            )}
          </span>
        )}

        <span>
          <button className="button-13" onClick={() => setFilter(0)}>
            All
          </button>

          <button className="button-13" onClick={() => setFilter(1)}>
            Active
          </button>

          <button className="button-13" onClick={() => setFilter(2)}>
            Completed
          </button>
        </span>
        <span>
          <button className="button-13" onClick={clearCompleted}>
            Clear Completed
          </button>
        </span>
      </div>
    </div>
    
  );
}

export default ToDo;
