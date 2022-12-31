import { useState } from 'react'
import { useHabitState } from '../App'
import styled from 'styled-components'
import { EditHabitModal, ModalWrapper } from './Modal'

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
  initialCount: number // Initial value for "count" state
}

const Habit = ({ data }: HabitProps) => {
  const {
    name,
    goal,
    description,
    timeframe,
    progress
  } = data

  const { setHabits } = useHabitState()

  const [count, setCount] = useState(0)
  const isGoalMet = count >= goal

  const [editModalIsVisible, setEditModalIsVisible] = useState(false)
  const [infoModalIsVisible, setInfoModalIsVisible] = useState(false)

  const handleRemoveHabit = () => {
    setHabits(prev => prev.filter(item => item.name !== name))
  }

  return (
    <HabitWrapper isGoalMet={isGoalMet}>
      <div>
        <div>{name}</div>
        <div>{count} / {goal}</div>
      </div>
      <div>
        <button onClick={() =>
          setCount(count + 1)
        }>
          +
        </button>
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
      </div>
      <div>
        <button onClick={() => setInfoModalIsVisible(true)}>View</button>
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

/*
  Read habit info.
  *Temporary component*
*/

interface HabitInfoModalProps {
  close: () => void
  data: HabitNode
  count: number
}

const HabitInfoModal = ({ close, data, count }: HabitInfoModalProps) => {
  const {
    name,
    description,
    goal,
    timeframe,
    progress
  } = data

  const { date } = useHabitState()

  const currentDateProgress = progress.dates.find(item => item.valueOf() === date.valueOf())

  return (
    <ModalWrapper>
      <button onClick={close}>Close</button>
      <hr />
      <h4><>Current date: {date.toDateString()}</></h4>
      <h1>{name}</h1>
      <p>Timeframe: {timeframe}</p>
      {description && <p>{description}</p>}
      <h2><>Progress on {date.toDateString()}:</></h2>
      <p>{count} / {goal}</p>
    </ModalWrapper>
  )
}