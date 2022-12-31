import React, { useState, useEffect, createContext, useContext } from 'react'
import './App.css'
import Habit, { HabitNode, HabitProps, Timeframe } from './components/Habit'
import styled from 'styled-components'
import { CreateHabitModal, EditHabitModal } from './components/Modal'
import { tasks } from './sampleData'

/* State context */
interface HabitState {
  habits: Array<HabitNode>
  setHabits: React.Dispatch<React.SetStateAction<Array<HabitNode>>>
  date: Date
}

const HabitStateContext = createContext<HabitState>(null!)

// Helper function
export function useHabitState() {
  return useContext(HabitStateContext)
}

function App() {
  const [createModalIsVisible, setCreateModalIsVisible] = useState(false)

  const [habits, setHabits] = useState<HabitNode[]>(tasks)

  // Current date stored at the top level
  const today = new Date()
  const [date, setDate] = useState<Date>(today)
  // Use to compare dates - idk of a better way
  const [dateData, setDateData] = useState({
    year: date.getFullYear(),
    month: date.getMonth(),
    date: date.getDate()
  })

  // sync dateData with date
  useEffect(() => {
    setDateData({
      year: date.getFullYear(),
      month: date.getMonth(),
      date: date.getDate()
    })
  }, [date])

  return (
    <HabitStateContext.Provider value={{ habits, setHabits, date }}>
      <div className="App" >
        <button onClick={() => setCreateModalIsVisible(true)}>Create new habit</button>
        <hr />
        <h2>
          <button onClick={() => setDate(new Date(dateData.year, dateData.month, dateData.date - 1))}>Previous</button>
          Date: {date.toDateString()}
          <button onClick={() => setDate(new Date(dateData.year, dateData.month, dateData.date + 1))}>Next</button>
        </h2>
        <hr />
        <Section title="Today" timeframe="day" />
        <Section title="Weekly" timeframe="week" />
        <Section title="Monthly" timeframe="month" />
        <Section title="Yearly" timeframe="year" />
        {
          createModalIsVisible &&
          <CreateHabitModal
            close={() => setCreateModalIsVisible(false)}
          />
        }
      </div>
    </HabitStateContext.Provider>
  )
}

interface SectionProps {
  title: string,
  timeframe: string
}

const Section = ({ title, timeframe }: SectionProps) => {
  const { habits } = useHabitState()

  const sectionHabits = habits.filter(
    item => item.timeframe === timeframe
  ).map(
    item => <Habit data={item} key={item.name} initialCount={0} />  // initialCount should sync with the `count` of the habit on the current date
  )

  return (
    <section>
      <h2>{title}</h2>
      <div>
        Habits completed:
      </div>
      {
        sectionHabits.length > 0
          ? sectionHabits
          : "No habits"
      }
    </section>
  )
}

export default App
