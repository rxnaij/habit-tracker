import VisuallyHidden from './VisuallyHidden.jsx'
import styled from "styled-components"

interface RadioButtonsProps {
    title: string
    values: {
        value: string
        label: string
    }[]
    name: string
    // Is there a better way to type these?
    setState: (value: any) => void
    state: any
}

// How can I incorporate context in here? Is it the right tool, or should I just directly pass down form state as props?

export default function RadioButtons({ title, values, name, state, setState }: RadioButtonsProps) {
    return (
        <RadioButtonsWrapper>
            <div>{title}</div>
            <RadioWrapper>
                {
                    values.map(button => (
                        <RadioButton
                            isActive={button.value === state}
                            key={button.value}
                        >
                            <VisuallyHidden>
                                <input
                                    type="radio"
                                    name="frequency"
                                    id={`radiobutton__${name}--${button.value}`}
                                    onChange={() => setState(button.value)}
                                />
                            </VisuallyHidden>
                            { button.label }
                        </RadioButton>
                    ))
                }
            </RadioWrapper>
        </RadioButtonsWrapper>
    )
}

const RadioButtonsWrapper = styled.fieldset`
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
    isActive: boolean
}

const RadioButton = styled.label<RadioButtonProps>`
    flex: 1;

    padding-top: 16px;
    padding-bottom: 16px;

    background-color: ${props =>
        props.isActive
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