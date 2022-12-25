import { useState } from 'react'
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
    remove: (habitName: string) => void
}

const Habit = ({ name, goal, description, timeframe, remove }: HabitProps) => {
  const [current, setCurrent] = useState(0)
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
        <button onClick={() => remove(name)}>Delete</button>
      </div>
    </HabitWrapper>
  )
}

export default Habit