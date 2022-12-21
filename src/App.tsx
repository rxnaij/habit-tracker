import React, { useState } from 'react'
import './App.css'
import Habit, { HabitProps, Timeframe } from './components/Habit'
import styled from 'styled-components'
import { tasks } from './sampleData'

function returnFalseIfEmpty(array: Array<any>) {
  if (array.length === 0) return false

  return array
}


function App() {
  const [createModalIsVisible, setCreateModalIsVisible] = useState(false)
  const [habits, setHabits] = useState<HabitProps[]>(tasks)

  return (
    <div className="App">
      <h2>Today</h2>
      {
        returnFalseIfEmpty(habits.filter(item => item.timeframe === "day")
          .map(item => <Habit {...item} key={item.name} />))
        || "No habits"
      }
      <h2>Week</h2>
      {
        returnFalseIfEmpty(habits.filter(item => item.timeframe === "week")
          .map(item => <Habit {...item} key={item.name} />))
       || "No habits" 
      }
      <h2>Month</h2>
      {
        returnFalseIfEmpty(habits.filter(item => item.timeframe === "month")
          .map(item => <Habit {...item} key={item.name} />))
       || "No habits" 
      }
      <h2>Year</h2>
      {
        returnFalseIfEmpty(habits.filter(item => item.timeframe === "year")
          .map(item => <Habit {...item} key={item.name} />))
       || "No habits" 
      }
      <hr />
      <button onClick={() => setCreateModalIsVisible(true)}>Create new habit</button>
      {
        createModalIsVisible &&
        <CreateHabitModal 
          close={() => setCreateModalIsVisible(false)} 
          createHabit={(habit: HabitProps) => { 
            setHabits(prev => prev.concat(habit))
          }} 
        />
      }
    </div>
  )
}

interface CreateHabitModalProps {
  close: () => void
  createHabit: (habit: HabitProps) => void
}

function CreateHabitModal({ close, createHabit }: CreateHabitModalProps) {
  const [name, setName] = useState<string>("")
  const [description, setDescription] = useState("")
  const [goal, setGoal] = useState(0)
  const [frequency, setFrequency] = useState<Timeframe|null>(null)

  return(
    <CreateHabitModalWrapper>
      <button onClick={close}>Close</button>
      <h2>new habit</h2>
      <label>
        Name
        <input type="text" value={name} onChange={e => {setName(e.target.value)}} />
      </label>
      <label>
        Description
        <input type="text" value={description} onChange={e => {setDescription(e.target.value)}}/>
      </label>
      <label>
        Goal
        <input type="number" step={1} value={goal} onChange={(e) => {setGoal(e.target.value!)}}/>
      </label>
      <fieldset>
        Frequency
        <label>
          <input type="radio" name="frequency" id="create-habit-timeframe-radio-daily" onChange={() => setFrequency("day")}/>
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
        createHabit({
          name,
          description,
          goal,
          timeframe: frequency || "day"
        })
        close()
      }}>Create habit</button>
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

export default App
