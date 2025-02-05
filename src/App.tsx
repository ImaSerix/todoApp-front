import './App.css'
import TodoContainer from "./features/todo/todoContainer.tsx";
import NavigationContainer from "./features/navigation/NavigationContainer.tsx";

function App() {

    return (
        <div className="app">
            <NavigationContainer/>
            <div className={'app__content'}>
                <TodoContainer/>
            </div>
        </div>
    )
}

export default App
