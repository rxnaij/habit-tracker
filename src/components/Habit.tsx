import { useEffect, useState } from 'react'
import { useHabitState } from '../App'
import styled from 'styled-components'
import { EditHabitModal, HabitInfoModal } from './Modal'

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

  const { setHabits } = useHabitState()

  const [count, setCount] = useState(initialCount)

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
    <HabitWrapper isGoalMet={isGoalMet}>
      <Title>
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
  )
}

interface HabitWrapperProps {
  isGoalMet: boolean
}

const HabitWrapper = styled.div<HabitWrapperProps>`
  color: #36494E;

  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 14px 20px;
  border-bottom: 1px solid gray;
  border-radius: 8px;

  background-color: ${props => props.isGoalMet ? 'green' : '#ECEBE1'};
`

const Title = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  gap: 0;
  
  h4 {
    margin: 0;
    padding: 0;
    font-weight: 300;
  }
  span {
    font-size: 1.5rem;
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

const Controls = () => (
  <div>
    <button onClick={() => setInfoModalIsVisible(true)}>View</button>
    <button onClick={() => setEditModalIsVisible(true)}>Edit</button>
    <button onClick={() => handleRemoveHabit()}>Delete</button>
  </div>
)

export default Habit