import Todo from "./components/Todo";
import ListTodo from "./components/ListTodo";

function App() {
  return (
    <div className="App">
      <h1 className="text-center">TODO</h1>
      <div className="row ">
        <div className="col-lg-2 col-md-2 col-sm-12 mx-auto my-auto">
          <Todo />
        </div>
        <div className="col-lg-10 col-md-10 col-sm-12 mx-auto my-auto">
          <ListTodo />
        </div>
      </div>
    </div>
  );
}

export default App;
