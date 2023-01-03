/*
Read habit info.
*Temporary component*
*/

import { ThemeProvider } from "styled-components"
import { useHabitState } from "../App"
import { lightColorTheme } from "../colorTheme"
import { HabitNode } from "./Habit"
import { ModalWrapper } from "./common/Modal"

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