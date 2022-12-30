import { useState } from 'react'
import { useHabitState } from '../App'
import styled from 'styled-components'
import { EditHabitModal } from './Modal'

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

const defaultDayProgress = {
  date: new Date,
  count: 0,
  goal: 0
}

/*
  Progress of a habit across its total existence
*/
interface HabitProgress {
  dates: DayProgress[]
  recordStreak: number
}

export interface HabitProps extends HabitNode {

}

const Habit = ({ name, goal, description, timeframe }: HabitProps) => {
  const { setHabits } = useHabitState()

  const [current, setCurrent] = useState(0)
  const [progress, setProgress] = useState<DayProgress>(defaultDayProgress)

  const [editModalIsVisible, setEditModalIsVisible] = useState(false)

  const isGoalMet = progress.count >= goal

  // currentStreak = count number of consecutive days into the past where goal was met (count > goal)

  const handleRemoveHabit = () => {
    setHabits(prev => prev.filter(item => item.name !== name))
  }

  return (
    <HabitWrapper isGoalMet={isGoalMet}>
      <div>
        <div>{name}</div>
        <div>{progress.count} / {goal}</div>
      </div>
      <div>
        <button onClick={() =>
          setProgress(prev => ({ ...prev, count: prev.count + 1 }))
        }>
          +
        </button>
        <button onClick={() =>
          setProgress(prev => { 
            if (prev.count > 0) {
              return { 
                ...prev, 
                count: prev.count - 1 
              } 
            }
            else return prev
          })
        }>
          -
        </button>
      </div>
      <div>
        <button onClick={() => setEditModalIsVisible(true)}>Edit</button>
        <button onClick={() => handleRemoveHabit()}>Delete</button>
      </div>
      {
        editModalIsVisible &&
        <EditHabitModal
          close={() => setEditModalIsVisible(false)}
          habitName={name}
        />
      }
    </HabitWrapper>
  )
}

interface HabitWrapperProps {
  isGoalMet: boolean
}

const HabitWrapper = styled.div<HabitWrapperProps>`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  gap: 24px;
  padding: 24px;
  border-bottom: 1px solid gray;

  background-color: ${props => props.isGoalMet ? 'green' : 'transparent'};

  & > div {
    flex-direction: column;
  }
`

export default Habit