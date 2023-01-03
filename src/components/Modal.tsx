import { useState } from "react"
import { HabitProps, HabitNode, Timeframe } from "./Habit"
import { useHabitState } from "../App"
import styled, { ThemeProvider } from "styled-components"
import { lightColorTheme } from "../colorTheme"
import Input from "./common/Input"
import RadioButtons from "./common/RadioButtons"

export const ModalWrapper = styled.div`
  background-color: ${props => props.theme.background};
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

  color: ${props => props.theme.textPrimary};
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

  const frequencyValues = [
    {
      value: "day",
      label: "Daily"
    },
    {
      value: "week",
      label: "Weekly"
    },
    {
      value: "month",
      label: "Monthly"
    },
    {
      value: "year",
      label: "Yearly"
    },
  ]

  return (
    <ThemeProvider theme={lightColorTheme}>
      <ModalWrapper>
        <button onClick={close}>Close</button>
        <h2>edit habit: {habitName}</h2>
        <Input>
          Name
          <input type="text" value={name} onChange={e => { setName(e.target.value) }} />
        </Input>
        <Input>
          Description
          <input type="text" value={description} onChange={e => { setDescription(e.target.value) }} />
        </Input>
        <Input>
          Goal
          <input type="number" step={1} value={goal} onChange={(e) => { setGoal(e.target.value) }} />
        </Input>
        <RadioButtons 
          name="frequency"
          title="Frequency"
          values={frequencyValues}
          state={frequency}
          setState={setFrequency}
        />
        <button onClick={() => {
          handleUpdateHabit()
          close()
        }}>Update habit</button>
      </ModalWrapper>
    </ThemeProvider>
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
    <ThemeProvider theme={lightColorTheme}>
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
    </ThemeProvider>
  )
}