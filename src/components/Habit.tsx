import { useEffect, useState } from 'react'
import { useHabitState } from '../App'
import styled, { ThemeProvider } from 'styled-components'
import { lightColorTheme } from '../colorTheme'
import { EditHabitModal } from './EditHabitModal'
import { HabitInfoModal } from './HabitInfoModal'

export type Timeframe =
  "day" | "week" | "month" | "year"

export interface HabitNode {
  name: string
  description: string
  goal: number
  timeframe: Timeframe
  progress: HabitProgress
}

/*
  Progress of a habit across its total existence
*/
interface HabitProgress {
  dates: DayProgress[]
  recordStreak: number
}

/*
  Progress of a habit on a certain given day

  All days should have the same progress data
  Don't differentiate for today

  To identify "today": check if date of habit progress === today's date
*/
type DayProgress = {
  date: Date
  count: number
  goal: number
}

export interface HabitProps {
  data: HabitNode
  initialCount?: number // Initial value for "count" state
}

const Habit = ({ data, initialCount = 0 }: HabitProps) => {
  const {
    name,
    goal,
    description,
    timeframe,
    progress
  } = data

  const { habits, setHabits, date } = useHabitState()

  // Update app state when habit count is updated
  const handleUpdateHabitState = () => {
    // Identify the habit to update (this habit)
    const index = habits.findIndex(item => item.name === name)
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

  const [editModalIsVisible, setEditModalIsVisible] = useState(false)
  const [infoModalIsVisible, setInfoModalIsVisible] = useState(false)

  const handleRemoveHabit = () => {
    setHabits(prev => prev.filter(item => item.name !== name))
  }

  return (
    <ThemeProvider theme={lightColorTheme}>
      <HabitWrapper isGoalMet={isGoalMet}>
        <Title onClick={() => setInfoModalIsVisible(true)}>
          <h4>{name}</h4>
          <span>{count} / {goal}</span>
        </Title>
        <Modifiers>
          <button onClick={() =>
            setCount(prev => {
              if (prev > 0) {
                return prev - 1
              } else {
                return prev
              }
            })
          }>
            -
          </button>
          <button onClick={() =>
            setCount(count + 1)
          }>
            +
          </button>
        </Modifiers>
        {
          editModalIsVisible &&
          <EditHabitModal
            close={() => setEditModalIsVisible(false)}
            habitName={name}
          />
        }
        {
          infoModalIsVisible &&
          <HabitInfoModal
            close={() => setInfoModalIsVisible(false)}
            data={data}
            count={count}
          />
        }
      </HabitWrapper>
    </ThemeProvider>
  )
}

interface HabitWrapperProps {
  isGoalMet: boolean
}

const HabitWrapper = styled.div<HabitWrapperProps>`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 14px 20px;
  border-radius: 8px;

  background-color: ${props => props.isGoalMet ? "#E5E2C3" : props.theme.background};
  box-shadow: 0 4px 4px #54534825;

  color: ${({ theme }) => theme.textPrimary};
`

const Title = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  gap: 0;
  
  // Habit title
  h4 {
    margin: 0;
    padding: 0;
    font-weight: 300;
  }
  // Habit count
  span {
    font-size: 1.5rem;

    // Enable monospace numerals
    font-feature-settings: 'tnum' on, 'lnum' on;
    font-variant-numeric: tabular-nums;
  }
`

const Modifiers = styled.div`
  display: flex;
  flex-direction: row;
  gap: 8px;

  button {
    width: 24px;
    height: 24px;
    border-radius: 50%;
    padding: 0;
    color: #36494e;
    background-color: #00000016;
  }
`

export default Habit

function replaceElementInArray<T,>(origArray: T[], removeIndex: number, newElem: T) {
  return origArray.map((item, i) => {
    if (i === removeIndex) {
      return newElem
    } else {
      return item
    }
  })
}

function updateArray<T,>(origArray: T[], newElem: T, existingElemIndex?: number,) {
  if (existingElemIndex) {
    return replaceElementInArray(origArray, existingElemIndex, newElem)
  } else {
    return [newElem].concat(origArray)  // add to top
  }
}