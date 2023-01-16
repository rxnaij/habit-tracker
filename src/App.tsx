import React, { useState, useEffect, createContext, useContext } from 'react'
import './App.css'
import { HabitNode } from './components/Habit'
import { tasks } from './sampleData'
import Home from './components/Home'

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
  const [habits, setHabits] = useState<HabitNode[]>(tasks)

  // Current date stored at the top level
  const today = new Date()
  const [date, setDate] = useState<Date>(today)
  
  return (
    <HabitStateContext.Provider value={{ habits, setHabits, date, setDate }}>
      <Home />
    </HabitStateContext.Provider>
  )
}
