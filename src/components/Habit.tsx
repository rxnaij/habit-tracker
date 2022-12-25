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
}

export interface HabitProps extends HabitNode {

}

const Habit = ({ name, goal, description, timeframe }: HabitProps) => {
  const { setHabits } = useHabitState()

  const [current, setCurrent] = useState(0)
  const [editModalIsVisible, setEditModalIsVisible] = useState(false)

  const remove = () => {
    setHabits(prev => prev.filter(item => item.name !== name))
  }

  return(
    <HabitWrapper>
      <div>
        { name }
      </div>
      <div>
        { current } / { goal }
      </div>
      <div>
        <button onClick={() => {if (current > 0) setCurrent(current - 1)}}>-</button>
        <button onClick={() => {setCurrent(current + 1)}}>+</button>
      </div>
      <div>
        <button onClick={() => setEditModalIsVisible(true)}>Edit</button>
        <button onClick={() => remove()}>Delete</button>
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


const HabitWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  gap: 24px;
  padding: 24px;
  border-bottom: 1px solid gray;
`

export default Habit