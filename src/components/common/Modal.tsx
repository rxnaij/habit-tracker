import styled, { ThemeProvider } from "styled-components"

export const ModalWrapper = styled.div`
  background-color: ${props => props.theme.background};
  z-index: 10;
  position: fixed;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;

  padding: 0 24px;

  display: flex;
  flex-direction: column;
  gap: 16px;

  color: ${props => props.theme.textPrimary};

  // Modal title
  h2 {
    color: ${props => props.theme.textPrimary + "70"};

    font-weight: 300;
    font-size: 2rem;
    letter-spacing: 4%;
    text-align: start;
  }
`