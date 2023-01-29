import { useState } from "react"
import { ThemeProvider } from "styled-components"
import { useHabitState } from "../App"
import Input from "./common/Input"
import RadioButtons from "./common/RadioButtons"
import { Timeframe } from "./Habit"
import { ModalWrapper } from "./common/Modal"
import { lightColorTheme } from "../colorTheme"

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
                <h2>edit habit</h2>
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