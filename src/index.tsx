import React from 'react'
import { render } from 'react-dom'
import { App } from './App'
import { unstable_trace as trace } from 'scheduler/tracing'
import reportWebVitals from './reportWebVitals'

trace('initial render', performance.now(), () =>
    render(
        <React.Profiler id="App" onRender={() => null}>
            <App/>
        </React.Profiler>,
        document.querySelector('#root'),
    ),
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
