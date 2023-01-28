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
import { ButtonGroup } from "./common/Button"

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
            <HabitInfoModalWrapper
                onDismiss={close}
            >
                <header>
                    <button onClick={close}>Close</button>
                </header>
                <HabitContentWrapper>
                    <TitleWrapper>
                        <h1>{name}</h1>
                        <p>{timeframe}</p>
                    </TitleWrapper>
                    {description && <DescriptionWrapper>{description}</DescriptionWrapper>}
                    <ProgressWrapper>
                        <button onClick={() =>
                            setCount(prev => {
                                if (prev > 0) {
                                    return prev - 1
                                } else {
                                    return prev
                                }
                            })
                        }>
                            -
                        </button>
                        {count} / {goal}
                        <button onClick={() =>
                            setCount(count + 1)
                        }>
                            +
                        </button>
                    </ProgressWrapper>
                    <Streak>Current streak: 1 day</Streak>
                </HabitContentWrapper>
                <Footer>
                    <ButtonGroup>
                        <button>Edit</button>
                        <button>Delete</button>
                    </ButtonGroup>
                </Footer>
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
    line-height: 1.2;
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

        color: ${props => props.theme.textPrimary + "80"};
    }
`

const DescriptionWrapper = styled.p`
    font-size: ${13 / 16}rem;
    line-height: ${25 / 13};
`

const ProgressWrapper = styled.div`
    align-self: center;
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 24px;
    text-align: center;

    font-weight: 400;
    font-size: ${29 / 16}rem;

    // Enable monospace numerals
    font-feature-settings: 'tnum' on, 'lnum' on;
    font-variant-numeric: tabular-nums;
`

const Streak = styled.p`
    align-self: center;
    text-transform: uppercase;
    letter-spacing: 0.04em;
`

const Footer = styled.footer`
    display: flex;
    flex-direction: column;
    align-items: center;
`