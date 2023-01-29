import { ThemeProvider } from "styled-components"
import { useHabitState } from "../App"
import { lightColorTheme } from "../colorTheme"
import { HabitNode } from "./Habit"
import styled from "styled-components"
import { ButtonGroup } from "./common/Button"

import { useLoaderData, Link, LoaderFunction } from 'react-router-dom'
import { tasks as habitData } from "../sampleData"

export const habitLoader: LoaderFunction = async ({ params }) => {
    return habitData.find(habit => habit.id === params.habitId)
}

export default function HabitPage() {

    // @TODO: How do we define initialCount?
    const data = useLoaderData() as HabitNode
    const {
        name,
        description,
        timeframe,
        progress,
        id
    } = data

    const { date } = useHabitState()

    // get current day's progress
    // get today's habit count
    const areDatesEqual = (date1: Date, date2: Date) => {
        return (
            date1.getMonth() === date2.getMonth()
            && date1.getDate() === date2.getDate()
            && date1.getFullYear() === date2.getFullYear()
        )
    }

    const currentDaysProgress = progress.dates.find(item => areDatesEqual(item.date, date))
    const count = currentDaysProgress ? currentDaysProgress.count : 0
    const goal = currentDaysProgress ? currentDaysProgress.goal : data.goal

    return (
        <ThemeProvider theme={lightColorTheme}>
            <HabitPageWrapper>
                <header>
                    <Link to="/">
                        <button>Close</button>
                    </Link>
                </header>
                <HabitContentWrapper>
                    <TitleWrapper>
                        <h1>{name}</h1>
                        <p>{timeframe}</p>
                    </TitleWrapper>
                    {<DescriptionWrapper>{description}</DescriptionWrapper>}
                    <ProgressWrapper>
                        {/* <button onClick={() =>
                            setCount(prev => {
                                if (prev > 0) {
                                    return prev - 1
                                } else {
                                    return prev
                                }
                            })
                        }>
                            -
                        </button> */}
                        {count} / {goal}
                        {/* <button onClick={() =>
                            setCount(count + 1)
                        }>
                            +
                        </button> */}
                    </ProgressWrapper>
                    <Streak>Current streak: X day</Streak>
                </HabitContentWrapper>
                <Footer>
                    <ButtonGroup>
                        <button>Edit</button>
                        <button>Delete</button>
                    </ButtonGroup>
                </Footer>
            </HabitPageWrapper>
        </ThemeProvider>
    )
}

const HabitPageWrapper = styled.div`
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