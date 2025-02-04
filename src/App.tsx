import './App.css'
import TodoContainer from "./features/todo/todoContainer.tsx";

function App() {

  return (
    <div className="app">
        <nav className="app__nav">
            Some nav
        </nav>
        <div className={'app__content'}>
            <TodoContainer />
        </div>
    </div>
  )
}

export default App
