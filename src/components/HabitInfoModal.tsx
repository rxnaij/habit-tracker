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
            <HabitInfoModalWrapper>
                <header>
                    <button onClick={close}>Close</button>
                    <div>{ date.toLocaleDateString("en-US", { dateStyle: "full" }) }</div>
                </header>
                <HabitContentWrapper>
                    <TitleWrapper>
                        <h1>{name}</h1>
                        <p>{timeframe}</p>
                    </TitleWrapper>
                    {description && <DescriptionWrapper>{description}</DescriptionWrapper>}
                    <ProgressWrapper>{count} / {goal}</ProgressWrapper>
                </HabitContentWrapper>
                <footer>
                    <button>Edit</button>
                    <button>Delete</button>
                </footer>
            </HabitInfoModalWrapper>
        </ThemeProvider>
    )
}

const HabitInfoModalWrapper = styled(ModalWrapper)`
    justify-content: space-between;
`

const HabitContentWrapper = styled.section`
    display: flex;
    flex-direction: column;
    gap: 48px;

    text-align: start;
`

const TitleWrapper = styled.div`
    h1 {
        font-size: 1rem;
        font-weight: 700;
        margin: 0;
    }
    
    p {
        margin: 0;
        font-size: 0.875rem;
        text-transform: uppercase;
        letter-spacing: 0.04em;
    }
`

const DescriptionWrapper = styled.p`
    font-size: ${13 / 16}rem;
    line-height: ${25 / 13};
`

const ProgressWrapper = styled.p`
    font-weight: 700;
    font-size: ${29/16}rem;

    // Enable monospace numerals
    font-feature-settings: 'tnum' on, 'lnum' on;
    font-variant-numeric: tabular-nums;
`