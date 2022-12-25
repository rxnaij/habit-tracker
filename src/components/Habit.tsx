import { useState } from 'react'
import { useHabitState } from '../App'
import styled from 'styled-components'

const HabitWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;

`

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
  const { habits, setHabits } = useHabitState()

  const [current, setCurrent] = useState(0)

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
        <button onClick={() => remove()}>Delete</button>
      </div>
    </HabitWrapper>
  )
}

export default Habit