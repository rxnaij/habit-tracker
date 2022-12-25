import { useState } from "react"
import { HabitProps, HabitNode, Timeframe } from "./Habit"
import { useHabitState } from "../App"
import styled from "styled-components"

interface CreateHabitModalProps {
    close: () => void
    remove: (habitName: string) => void
  }
  
 export function CreateHabitModal({ close, remove }: CreateHabitModalProps) {
    const { setHabits } = useHabitState()

    const [name, setName] = useState<string>("")
    const [description, setDescription] = useState("")
    const [goal, setGoal] = useState(0)
    const [frequency, setFrequency] = useState<Timeframe | null>(null)

    const createHabit = () => {
        setHabits(prev => prev.concat({
            name,
            description,
            goal,
            timeframe: frequency || "day",
        }))
    }
  
    return (
      <CreateHabitModalWrapper>
        <button onClick={close}>Close</button>
        <h2>new habit</h2>
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
            createHabit()
            close()
        }}>
            Create habit
        </button>
      </CreateHabitModalWrapper>
    )
  }
  
  const CreateHabitModalWrapper = styled.div`
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
  
    label {
      display: flex;
      flex-direction: row;
      justify-content: flex-start;
      gap: 8px;
    }
  `
  
  
  interface EditHabitModalProps {
    close: () => void
    updateHabit: (habit: HabitProps) => void
    remove: () => void,
    habit: HabitNode
  }
  
  /**
   * Use same modal as CreateHabitModal
   * Pre-populate with habit values
   * Provide option to cancel, submit, or delete
   */
  export const EditHabitModal = ({ close, updateHabit, remove, habit }: EditHabitModalProps) => {
    const [name, setName] = useState<string>(habit.name)
    const [description, setDescription] = useState(habit.description)
    const [goal, setGoal] = useState(habit.goal)
    const [frequency, setFrequency] = useState<Timeframe>(habit.timeframe)
    return (
      <CreateHabitModalWrapper>
        <button onClick={close}>Close</button>
        <h2>edit habit</h2>
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
          updateHabit({
            name,
            description,
            goal,
            timeframe: frequency,
            remove
          })
          close()
        }}>Update habit</button>
      </CreateHabitModalWrapper>
    )
  }