import { useState } from 'react'

function App() {
  const [count, setCount] = useState(0)
  const apiBaseUrl = import.meta.env.VITE_API_BASE_URL ?? 'http://localhost:3000'

  return (
    <>
      <section id="center">
        <p>API: {apiBaseUrl}</p>
        <button
          className="counter"
          onClick={() => setCount((count) => count + 1)}
        >
          Count is {count}
        </button>
      </section>

      <div className="ticks"></div>
      <section id="spacer"></section>
    </>
  )
}

export default App
