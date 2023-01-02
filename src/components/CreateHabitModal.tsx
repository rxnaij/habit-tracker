import { useState, createContext, useContext } from 'react'
import { useHabitState } from "../App"
import { Timeframe } from './Habit'
import { ModalWrapper } from './Modal'
import VisuallyHidden from './VisuallyHidden'
import styled from 'styled-components'

interface CreateHabitModalProps {
    close: () => void
}

interface FrequencyState {
    frequency: Timeframe
    setFrequency: (t: Timeframe) => void
}

const FrequencyStateContext = createContext<FrequencyState>(null!)

const useFrequencyState = () => {
    return useContext(FrequencyStateContext)
}

export default function CreateHabitModal({ close }: CreateHabitModalProps) {
    const { setHabits } = useHabitState()

    const [name, setName] = useState<string>("")
    const [description, setDescription] = useState("")
    const [goal, setGoal] = useState(0)
    const [frequency, setFrequency] = useState<Timeframe>("day")

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
            <RadioButtons>
                Frequency
                <RadioWrapper>
                    <FrequencyStateContext.Provider value={{frequency, setFrequency}}>
                        <RadioButton
                            value="day"
                        >
                            <VisuallyHidden>
                                <input
                                    type="radio"
                                    name="frequency"
                                    id="create-habit-timeframe-radio-daily"
                                    
                                    onChange={() => setFrequency("day")}
                                />
                            </VisuallyHidden>
                            Daily
                        </RadioButton>
                        <RadioButton
                            value="week"
                        >
                            <VisuallyHidden>
                                <input
                                    type="radio"
                                    name="frequency"
                                    id="create-habit-timeframe-radio-weekly"
                                    
                                    onChange={() => setFrequency("week")}
                                />
                            </VisuallyHidden>
                            Weekly
                        </RadioButton>
                        <RadioButton
                            value="month"
                        >
                            <VisuallyHidden>
                                <input
                                    type="radio"
                                    name="frequency"
                                    id="create-habit-timeframe-radio-monthly"
                                    
                                    onChange={() => setFrequency("month")}
                                />
                            </VisuallyHidden>
                            Monthly
                        </RadioButton>
                        <RadioButton
                            value="year"
                        >
                            <VisuallyHidden>
                                <input
                                    type="radio"
                                    name="frequency"
                                    id="create-habit-timeframe-radio-yearly"
                                    
                                    onChange={() => setFrequency("year")}
                                />
                            </VisuallyHidden>
                            Yearly
                        </RadioButton>
                    </FrequencyStateContext.Provider>
                </RadioWrapper>
            </RadioButtons>
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

const RadioButtons = styled.fieldset`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 8px;

    padding: 0;
    border: none;

    font-size: 0.85rem;
    text-transform: uppercase;
    letter-spacing: 4%;
`

const RadioWrapper = styled.div`
    width: 100%;
    background-color: #FFFFFF50;
    border: none;
    border-radius: 4px;

    display: flex;
    flex-direction: row;

    overflow: hidden;   // Chopping off rounded corners
`

interface RadioButtonProps {
    value: string
}

const RadioButton = styled.label<RadioButtonProps>`
    flex: 1;

    padding-top: 16px;
    padding-bottom: 16px;

    background-color: ${props => 
        props.value === useFrequencyState().frequency
            ? "green"
            : "transparent"
    };

    font-size: 0.75rem;
    text-transform: uppercase;
    letter-spacing: 4%;

    &:not(:last-child) {
        border-right: 1px solid #FFF;
    }
`