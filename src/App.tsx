import './App.css'
import TodoContainer from "./features/todo/todoContainer.tsx";

function App() {

  return (
    <div className="App">
        <nav className="App-nav">
            Some nav
        </nav>
        <div className={'App-content'}>
            <TodoContainer />
        </div>
    </div>
  )
}

export default App
