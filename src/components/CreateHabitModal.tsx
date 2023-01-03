import { useState, createContext, useContext } from 'react'
import { useHabitState } from "../App"
import { Timeframe } from './Habit'
import { ModalWrapper } from './Modal'
import RadioButtons from './common/RadioButtons'
import styled from 'styled-components'

interface CreateHabitModalProps {
    close: () => void
}

interface FrequencyState {
    frequency: Timeframe
    setFrequency: (t: Timeframe) => void
}

const FrequencyStateContext = createContext<FrequencyState>(null!)

type StateContextHook = {}

const useFrequencyState = () => {
    return useContext(FrequencyStateContext)
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
    )
}

const Input = styled.label`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 8px;

    font-size: 0.85rem;
    text-transform: uppercase;
    letter-spacing: 4%;

    input {
        align-self: stretch;
        background-color: #FFFFFF50;
        border: none;
        border-radius: 4px;
        padding: 16px;
    }
`
