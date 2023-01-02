import { useState } from "react"
import { HabitProps, HabitNode, Timeframe } from "./Habit"
import { useHabitState } from "../App"
import styled from "styled-components"

export const ModalWrapper = styled.div`
  background-color: #000;
  z-index: 10;
  position: fixed;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;

  padding: 0 24px;

  display: flex;
  flex-direction: column;
  gap: 16px;
`

interface EditHabitModalProps {
  close: () => void
  habitName: string
}

/**
 * Use same modal as CreateHabitModal
 * Pre-populate with habit values
 * Provide option to cancel, submit, or delete
 */
export const EditHabitModal = ({ close, habitName }: EditHabitModalProps) => {
  const { habits, setHabits } = useHabitState()
  const currentHabit = habits.find(result => result.name === habitName)
  // Need error checking if current habit does not exist

  const [name, setName] = useState(currentHabit!.name)
  const [description, setDescription] = useState(currentHabit!.description)
  const [goal, setGoal] = useState(currentHabit!.goal)
  const [frequency, setFrequency] = useState<Timeframe | undefined>(currentHabit!.timeframe)

  const handleUpdateHabit = () => {
    setHabits(prev => {
      const removeOriginal = prev.filter(item => item.name !== habitName)
      return ([
        {
          name,
          description,
          goal,
          timeframe: frequency!,
          progress: currentHabit!.progress
        },
        ...removeOriginal
      ])
    })
  }

  return (
    <ModalWrapper>
      <button onClick={close}>Close</button>
      <h2>edit habit: {habitName}</h2>
      <label>
        Name
        <input type="text" value={name} onChange={e => { setName(e.target.value) }} />
      </label>
      <label>
        Description
        <input type="text" value={description} onChange={e => { setDescription(e.target.value) }} />
      </label>
      <label>
        Goal
        <input type="number" step={1} value={goal} onChange={(e) => { setGoal(e.target.value!) }} />
      </label>
      <fieldset>
        Frequency
        <label>
          <input type="radio" name="frequency" id="create-habit-timeframe-radio-daily" onChange={() => setFrequency("day")} />
          Daily
        </label>
        <label>
          <input type="radio" name="frequency" id="create-habit-timeframe-radio-weekly" onChange={() => setFrequency("week")} />
          Weekly
        </label>
        <label>
          <input type="radio" name="frequency" id="create-habit-timeframe-radio-monthly" onChange={() => setFrequency("month")} />
          Monthly
        </label>
        <label>
          <input type="radio" name="frequency" id="create-habit-timeframe-radio-yearly" onChange={() => setFrequency("year")} />
          Yearly
        </label>
      </fieldset>
      <button onClick={() => {
        handleUpdateHabit()
        close()
      }}>Update habit</button>
    </ModalWrapper>
  )
}


/*
Read habit info.
*Temporary component*
*/

interface HabitInfoModalProps {
  close: () => void
  data: HabitNode
  count: number
}

export const HabitInfoModal = ({ close, data, count }: HabitInfoModalProps) => {
  const {
    name,
    description,
    goal,
    timeframe,
    progress
  } = data

  const { date } = useHabitState()

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