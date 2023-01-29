import styled from "styled-components"
import { Dialog, DialogOverlay, DialogContent } from '@reach/dialog'
import "@reach/dialog/styles.css";

export const ModalWrapper = styled(Dialog)`
  background-color: ${props => props.theme.background};

  margin: 10vh 0 auto;
  width: 100%;
  /* margin-left: 24px;
  margin-right: 24px; */
  /* position: fixed;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0; */


  border-radius: 16px;

  padding: 32px;

  display: flex;
  flex-direction: column;
  gap: 32px;

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