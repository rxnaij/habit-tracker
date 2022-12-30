import React, { useState, createContext, useContext } from 'react'
import './App.css'
import Habit, { HabitNode, HabitProps, Timeframe } from './components/Habit'
import styled from 'styled-components'
import { CreateHabitModal, EditHabitModal } from './components/Modal'
import { tasks } from './sampleData'

/* State context */
interface HabitState {
  habits: Array<HabitProps>
  setHabits: React.Dispatch<React.SetStateAction<Array<HabitProps>>>
}

const HabitStateContext = createContext<HabitState>(null!)

// Helper function
export function useHabitState() {
  return useContext(HabitStateContext)
}

function App() {
  const [createModalIsVisible, setCreateModalIsVisible] = useState(false)
  const [editModalIsVisible, setEditModalIsVisible] = useState(false)
  const [habits, setHabits] = useState<HabitProps[]>(tasks)

  // Current date stored at the top level
  const today = new Date()
  const [date, setDate] = useState<Date>(today)


  return (
    <HabitStateContext.Provider value={{ habits, setHabits }}>
      <div className="App" >
        <button onClick={() => setCreateModalIsVisible(true)}>Create new habit</button>
        <hr />
        <h2>Date: {date.toDateString()}</h2>
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
    item => <Habit {...item} key={item.name} />
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
