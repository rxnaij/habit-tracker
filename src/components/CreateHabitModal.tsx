import { useState } from 'react'
import { useHabitState } from "../App"
import { Timeframe } from './Habit'
import { ModalWrapper } from './common/Modal'
import RadioButtons from './common/RadioButtons'
import Input from './common/Input'
import { ThemeProvider } from 'styled-components'
import { lightColorTheme } from '../colorTheme'

interface CreateHabitModalProps {
    close: () => void
}

export default function CreateHabitModal({ close }: CreateHabitModalProps) {
    const { setHabits } = useHabitState()

    const [name, setName] = useState<string>("")
    const [description, setDescription] = useState("")
    const [goal, setGoal] = useState(0)
    const [frequency, setFrequency] = useState<Timeframe>("day")

    const frequencyOptions = [
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
            label: "monthly"
        },
        {
            value: "year",
            label: "Yearly"
        },
    ]

    const createHabit = () => {
        setHabits(prev => prev.concat({
            name,
            description,
            goal,
            timeframe: frequency || "day",
            progress: {
                dates: [],
                recordStreak: 0
            }
        }))
    }

    return (
        <ThemeProvider theme={lightColorTheme}>
        <ModalWrapper>
            <button onClick={close}>Close</button>
            <h2>new habit</h2>
            <Input>
                <span>Name</span>
                <input type="text" value={name} onChange={e => { setName(e.target.value) }} />
            </Input>
            <Input>
                Description
                <input type="text" value={description} onChange={e => { setDescription(e.target.value) }} />
            </Input>
            <Input>
                Goal
                <input type="number" step={1} value={goal} onChange={(e) => { setGoal(e.target.value!) }} />
            </Input>
            <RadioButtons
                title="Frequency"
                name='frequency'
                values={frequencyOptions}
                state={frequency}
                setState={setFrequency}
            />
            <button onClick={() => {
                createHabit()
                close()
            }}>
                Create habit
            </button>
        </ModalWrapper>
        </ThemeProvider>
    )
}

