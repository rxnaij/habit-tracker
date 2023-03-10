import { useState } from "react"
import CreateHabitModal from "./CreateHabitModal"
import { useHabitState } from "../App"
import { ButtonGroup } from "./common/Button"
import HabitItem from "./HabitItem"
// Styling
import { lightColorTheme } from "../colorTheme"
import VisuallyHidden from './common/VisuallyHidden.jsx'
import styled, { ThemeProvider } from "styled-components"

export default function Home() {
    const [createModalIsVisible, setCreateModalIsVisible] = useState(false)
  
    return (
        <ThemeProvider theme={lightColorTheme}>
          <div className="App" >
            <FixedShim>
              <CreateHabitButton type='button' onClick={() => setCreateModalIsVisible(true)}>
                Create habit
              </CreateHabitButton>
            </FixedShim>
            <Header />
            <SectionsWrapper>
              <Section title="Today" timeframe="day" />
              <Section title="Weekly" timeframe="week" />
              <Section title="Monthly" timeframe="month" />
              <Section title="Yearly" timeframe="year" />
            </SectionsWrapper>
            {
              createModalIsVisible &&
              <CreateHabitModal
                close={() => setCreateModalIsVisible(false)}
              />
            }
          </div>
        </ThemeProvider>
    )
  }

const SectionsWrapper = styled.section`
  display: flex;
  flex-direction: column;
  gap: 32px;
`

const FixedShim = styled.div`
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0px;
  height: 100px;
  display: flex;
  justify-content: center;
  align-items: center;
  background: linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.2) 100%);
`

const CreateHabitButton = styled.button`
  margin: auto;
`

const Header = () => {
  const { date, setDate } = useHabitState()

  const day = new Intl.DateTimeFormat("en-us", { weekday: "long" }).format(date)
  const month = new Intl.DateTimeFormat("en-us", { month: "long" }).format(date)

  return (
    <HeaderWrapper>
      <DateHeader>
        {day},
        <br />
        {month + " " + date.getDate()}
        <br />
        {date.getFullYear()}
      </DateHeader>
      <ButtonGroup>
        <button onClick={() => setDate(new Date(date.getFullYear(), date.getMonth(), date.getDate() - 1))}>
          <VisuallyHidden>
            Previous date
          </VisuallyHidden>
          &larr;
        </button>
        <button onClick={() => setDate(new Date(date.getFullYear(), date.getMonth(), date.getDate() + 1))}>
          <VisuallyHidden>
            Next date
          </VisuallyHidden>
          &rarr;
        </button>
      </ButtonGroup>
    </HeaderWrapper>
  )
}

const HeaderWrapper = styled.header`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
`

const DateHeader = styled.h2`
  color: ${props => props.theme.textPrimary + "70"};

  font-weight: 300;
  font-size: 2rem;
  line-height: 1.25;
  text-align: end;
`

interface SectionProps {
  title: string,
  timeframe: string
}

const Section = ({ title, timeframe }: SectionProps) => {
  const { habits, date } = useHabitState()

  const sectionHabits = habits.filter(
    item => item.timeframe === timeframe
  ).map(
    item => {
      // Apply count from current date
      // Look for current date in item.dates
      const currentDate = item.progress.dates.find(result => result.date.getDate() === date.getDate())
      const initialValue = currentDate?.count
      return (
        <HabitItem 
          data={item} 
          key={item.name} 
          initialCount={initialValue} 
        />  // initialCount should sync with the `count` of the habit on the current date
      )
    }
  )

  return (
    <section>
      <SectionHeading>{title}</SectionHeading>
      <SectionHabitListWrapper>
        {
          sectionHabits.length > 0
            ? sectionHabits
            : "No habits"
        }
      </SectionHabitListWrapper>
    </section>
  )
}

const SectionHabitListWrapper = styled.section`
  display: flex;
  flex-direction: column;
  gap: 24px;
`

const SectionHeading = styled.h2`
  color: ${props => props.theme.textPrimary + "80"};
  text-align: start;
  text-transform: uppercase;
  font-size: 0.875rem;
  font-weight: 400;
  letter-spacing: 0.04em;
`