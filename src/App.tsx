import React, { useState, createContext, useContext } from 'react'
import './App.css'
import { HabitNode } from './components/Habit'
import HabitPage, { habitLoader } from './components/HabitPage'
import { HabitInfoModal } from './components/HabitInfoModal'
import { tasks } from './sampleData'
import Home from './components/Home'
import styled from 'styled-components'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

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

// Update app state when habit count is updated
const handleUpdateHabitState = (id: string) => {
  const { habits, setHabits } = useHabitState()
  // Identify the habit to update (this habit)
  const index = habits.findIndex(item => item.id === id)
  const thisHabit = habits[index]
  // Get data from current app date
  const currentDateIndex = thisHabit.progress.dates.findIndex(item => item.date.getDate() === date.getDate())

  // Is there a positive count value?
  if (count > 0) {
    // If current date exists in thisHabit.progress.dates, modify existing date
    // If not, add a new date to thisHabit.progress.dates

    // Create DayProgress if index doesn't exist; update otherwise
    const currentDayProgress: DayProgress = currentDateIndex === -1
      // new object
      ? { date, count, goal }
      // modified existing object
      : {
        ...thisHabit.progress.dates[currentDateIndex],
        count
      }

    const updatedDatesArray = currentDateIndex === -1
      ? [currentDayProgress].concat(thisHabit.progress.dates)
      : thisHabit.progress.dates.map((item, i) => {
        if (i === currentDateIndex) {
          return currentDayProgress
        } else {
          return item
        }
      })

    const updatedThisHabit = {
      ...thisHabit,
      progress: {
        ...thisHabit.progress,
        dates: updatedDatesArray
      }
    }

    // Update habit state
    // Replace old habit object with new habit object
    setHabits(habits.map((item, i) => {
      if (i === index) {
        return updatedThisHabit
      } else {
        return item
      }
    }))
  }
  // Is the count value 0?
  // else if (count === 0 && ) {
  //   setHabits(habits.map((item, i) => {
  //     if (i === index) {
  //       return({
  //         ...item,
  //         progress: {
  //           ...item.progress,
  //           dates: {
  //             ...item.progress.dates.filter((_, i) => i !== currentDateIndex)
  //           }
  //         }
  //       })
  //     }
  //     return item
  //   }))
  // }

}

const [count, setCount] = useState(initialCount)

useEffect(() => {
  handleUpdateHabitState()
}, [count])

const isGoalMet = count >= goal

// Sync count with initialCount
useEffect(() => {
  setCount(initialCount)
}, [initialCount])

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
    loader: () => {
      return tasks
    }
  },
  {
    path: "habits/:habitId",
    element: <HabitPage />,
    loader: habitLoader
  }
])

export default function App() {
  const [habits, setHabits] = useState<HabitNode[]>(tasks)

  // Current date stored at the top level
  const today = new Date()
  const [date, setDate] = useState<Date>(today)
  
  return (
    <HabitStateContext.Provider value={{ habits, setHabits, date, setDate }}>
      <AppLayoutWrapper>
        <RouterProvider router={router} />
      </AppLayoutWrapper>
    </HabitStateContext.Provider>
  )
}

const AppLayoutWrapper = styled.div`
  /* padding: 32px 0; */
`