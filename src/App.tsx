import React, { useState, useEffect, createContext, useContext } from 'react'
import './App.css'
import Habit, { HabitNode } from './components/Habit'
import styled from 'styled-components'
import CreateHabitModal from './components/CreateHabitModal'
import { tasks } from './sampleData'

/* State context */
interface HabitState {
  habits: Array<HabitNode>
  setHabits: React.Dispatch<React.SetStateAction<Array<HabitNode>>>
  date: Date
  setDate: React.Dispatch<React.SetStateAction<Date>>
}

const HabitStateContext = createContext<HabitState>(null!)

// Helper function
export function useHabitState() {
  return useContext(HabitStateContext)
}

export default function App() {
  const [createModalIsVisible, setCreateModalIsVisible] = useState(false)

  const [habits, setHabits] = useState<HabitNode[]>(tasks)

  // Current date stored at the top level
  const today = new Date()
  const [date, setDate] = useState<Date>(today)

  return (
    <HabitStateContext.Provider value={{ habits, setHabits, date, setDate }}>
      <div className="App" >
        <button type='button' onClick={() => setCreateModalIsVisible(true)}>
          Create new habit
        </button>
        <Header />
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

const Header = () => {
  const { date, setDate } = useHabitState()
  return (
    <header>
      <DateHeader>
        {date.toLocaleDateString("en-US", { dateStyle: "full" })}
      </DateHeader>
      <button onClick={() => setDate(new Date(date.getFullYear(), date.getMonth(), date.getDate() - 1))}>Previous</button>
      <button onClick={() => setDate(new Date(date.getFullYear(), date.getMonth(), date.getDate() + 1))}>Next</button>
    </header>
  )
}

const DateHeader = styled.h2`
  font-weight: 700;
  font-size: ${19 / 16}rem;
  text-align: center;

  margin-left: auto;
  margin-right: auto;
`

interface SectionProps {
  title: string,
  timeframe: string
}

const Section = ({ title, timeframe }: SectionProps) => {
  const { habits, date } = useHabitState()

  const sectionHabits = habits.filter(
    item => item.timeframe === timeframe
  ).map(
    item => {
      // Apply count from current date
      // Look for current date in item.dates
      const currentDate = item.progress.dates.find(result => result.date.getDate() === date.getDate())
      const initialValue = currentDate?.count
      return (
        <Habit data={item} key={item.name} initialCount={initialValue} />  // initialCount should sync with the `count` of the habit on the current date
      )
    }
  )

  return (
    <section>
      <h2>{title}</h2>
      <SectionHabitListWrapper>
        {
          sectionHabits.length > 0
            ? sectionHabits
            : "No habits"
        }
      </SectionHabitListWrapper>
    </section>
  )
}

const SectionHabitListWrapper = styled.section`
  display: flex;
  flex-direction: column;
  gap: 16px;
`