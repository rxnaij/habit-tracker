import { useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'

interface TodoProps {
  name: string
  description: string
  goal: number
  timeframe: "day" | "week" | "month" | "year"
}

const tasks: TodoProps[] = [
  {
    name: "Write a blog post",
    description: "",
    goal: 1,
    timeframe: "week"
  },
  {
    name: "Take a walk",
    description: "",
    goal: 3,
    timeframe: "week"
  },
  {
    name: "Fix my bed",
    description: "",
    goal: 1,
    timeframe: "day"
  },
  {
    name: "Cook a healthy meal",
    description: "",
    goal: 3,
    timeframe: "week"
  },
  {
    name: "Read for 20 mins",
    description: "",
    goal: 1,
    timeframe: "day"
  }
]

const Todo = ({ name, goal, description, timeframe }: TodoProps) => {
  const [current, setCurrent] = useState(0)
  return(
    <div>
      <div>
        { name }
      </div>
      <div>
        { current } / { goal }
      </div>
      <div>
        <button onClick={() => {setCurrent(prev => prev > 0 && prev - 1)}}>-</button>
        <button onClick={() => {setCurrent(prev => prev + 1)}}>+</button>
      </div>
    </div>
  )
}

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="App">
      <h2>Today</h2>
      {
        tasks.filter(task => task.timeframe === "day")
          .map(task => <Todo {...task} />)
        || "No tasks"
      }
      <h2>Week</h2>
      {
        tasks.filter(task => task.timeframe === "week")
          .map(task => <Todo {...task} />)
       || "No tasks" 
      }
      <h2>Month</h2>
      {
        tasks.filter(task => task.timeframe === "month")
          .map(task => <Todo {...task} />)
       || "No tasks" 
      }
      <h2>Year</h2>
      {
        tasks.filter(task => task.timeframe === "year")
          .map(task => <Todo {...task} />)
       || "No tasks" 
      }
    </div>
  )
}

export default App
