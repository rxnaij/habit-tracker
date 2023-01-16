/*
Read habit info.
*Temporary component*
*/

import { ThemeProvider } from "styled-components"
import { useHabitState } from "../App"
import { lightColorTheme } from "../colorTheme"
import { HabitNode } from "./Habit"
import { ModalWrapper } from "./common/Modal"
import styled from "styled-components"

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
                <TitleWrapper>
                    <h1>{name}</h1>
                    <p>Timeframe: {timeframe}</p>
                </TitleWrapper>
                {description && <DescriptionWrapper>{description}</DescriptionWrapper>}
                <ProgressWrapper>{count} / {goal}</ProgressWrapper>
            </ModalWrapper>
        </ThemeProvider>
    )
}

const TitleWrapper = styled.div`
    h1 {
        font-size: 1rem;
        font-weight: 400;
        margin: 0;
        /* line-height: 1.5; */
    }
    
    p {
        margin: 0;
        font-size: 0.875rem;
        text-transform: uppercase;
        letter-spacing: 4%;
    }
`

const DescriptionWrapper = styled.p`
    font-size: ${13/16}rem;
`

const ProgressWrapper = styled.p`
    font-weight: 700;
    font-size: ${29/16}rem;

    // Enable monospace numerals
    font-feature-settings: 'tnum' on, 'lnum' on;
    font-variant-numeric: tabular-nums;
`