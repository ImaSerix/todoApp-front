import {StrictMode} from 'react'
import {createRoot} from 'react-dom/client'
import {store} from "./app/redux/store.ts";
import './index.css'
import App from './App.tsx'
import {Provider} from "react-redux";

createRoot(document.getElementById('root')!).render(
    <Provider store={store}>
        <StrictMode>
            <App/>
        </StrictMode>
    </Provider>,
)
