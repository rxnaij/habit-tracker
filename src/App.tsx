import React, { useState, createContext, useContext } from 'react'
import './App.css'
import Habit, { HabitNode, HabitProps, Timeframe } from './components/Habit'
import styled from 'styled-components'
import { CreateHabitModal, EditHabitModal } from './components/Modal'
import { tasks } from './sampleData'

function returnFalseIfEmpty(array: Array<any>) {
  if (array.length === 0) return false

  return array
}

/* State context */
interface HabitState {
  habits: Array<HabitProps>
  setHabits: React.Dispatch<React.SetStateAction<Array<HabitProps>>>
}

const HabitStateContext = createContext<HabitState>(null!)

export function useHabitState() {
  return useContext(HabitStateContext)
}

function App() {
  const [createModalIsVisible, setCreateModalIsVisible] = useState(false)
  const [editModalIsVisible, setEditModalIsVisible] = useState(false)
  const [habits, setHabits] = useState<HabitProps[]>(tasks)

  const removeHabitHandler = (habitName: string) => {
    setHabits(habits.filter(item => item.name !== habitName))
  }

  return (
    <HabitStateContext.Provider value={{ habits, setHabits }}>
      <div className="App" >
        <h2>Today</h2>
        {
          returnFalseIfEmpty(habits.filter(item => item.timeframe === "day")
            .map(item => <Habit {...item} key={item.name} remove={removeHabitHandler} />))
          || "No habits"
        }
        <h2>Week</h2>
        {
          returnFalseIfEmpty(habits.filter(item => item.timeframe === "week")
            .map(item => <Habit {...item} key={item.name} remove={removeHabitHandler} />))
          || "No habits"
        }
        <h2>Month</h2>
        {
          returnFalseIfEmpty(habits.filter(item => item.timeframe === "month")
            .map(item => <Habit {...item} key={item.name} remove={removeHabitHandler} />))
          || "No habits"
        }
        <h2>Year</h2>
        {
          returnFalseIfEmpty(habits.filter(item => item.timeframe === "year")
            .map(item => <Habit {...item} key={item.name} remove={removeHabitHandler} />))
          || "No habits"
        }
        <hr />
        <button onClick={() => setCreateModalIsVisible(true)}>Create new habit</button>
        {
          createModalIsVisible &&
          <CreateHabitModal
            close={() => setCreateModalIsVisible(false)}
            createHabit={(habit: HabitProps) => {
              setHabits(prev => prev.concat(habit))
            }}
            remove={removeHabitHandler}
          />
        }
        {/* {
        editModalIsVisible &&
        <EditHabitModal
          close={() => setEditModalIsVisible(false)}
          updateHabit={(prevHabit: string, habit: HabitProps) => {
            setHabits(prev => prev.find(item => item.name === prevHabit) = habit)
          }}
      } */}
      </div>
    </HabitStateContext.Provider>
  )
}



export default App
