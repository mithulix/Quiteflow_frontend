import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './main.css' // Important for Tailwind

// ReactDOM.createRoot(document.getElementById('root')).render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>
// )

console.log('React version:', React.version)
console.log('DOM element:', document.getElementById('root'))

const root = ReactDOM.createRoot(document.getElementById('root'))
console.log('React root:', root)

root.render(
  <React.StrictMode>
    <div style={{ backgroundColor: 'red', padding: '20px' }}>
      <h1>REACT TEST</h1>
    </div>
  </React.StrictMode>
)