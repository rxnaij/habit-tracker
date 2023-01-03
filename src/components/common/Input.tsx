import styled from "styled-components"

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

export default Input