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

  return (
    <HabitStateContext.Provider value={{ habits, setHabits }}>
      <div className="App" >
        <button onClick={() => setCreateModalIsVisible(true)}>Create new habit</button>
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
      {
        sectionHabits.length > 0
          ? sectionHabits
          : "No habits"
      }
    </section>
  )
}

export default App
