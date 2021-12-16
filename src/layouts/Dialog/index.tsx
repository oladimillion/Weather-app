import React from "react";
import { createGlobalStyle } from "styled-components"
import { isEmptyValue } from "../../helpers"
import { Dialog as DialogComponent } from "../../components/Dialog"
import { Portal } from "../../components/Portal"
import { IAppStore } from "../../stores/types"
import connect from "./connect"

type Props = {
  appStore: IAppStore;
}

const ModalRootStyle = createGlobalStyle`
    div#modal-root {
    position: relative;
    z-index: 900;
  }
`

export const Dialog = connect((props: Props) => {

  const { dialog, setDialog } = props.appStore

  return (
    <>
      <ModalRootStyle />
      <Portal root="modal-root">
        {!isEmptyValue(dialog) && (
          <DialogComponent remove={() => setDialog({})} {...dialog} />
        )}
      </Portal>
    </>
  )
})

