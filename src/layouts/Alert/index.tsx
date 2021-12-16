import React from "react";
import { createGlobalStyle } from "styled-components"
import { isEmptyValue, themeGet } from "../../helpers"
import { Alert as AlertComponent } from "../../components/Alert"
import { Portal } from "../../components/Portal"
import { IAppStore } from "../../stores/types"
import connect from "./connect"

const AlertRootStyle = createGlobalStyle`
  div#alert-root {
    position: fixed;
    bottom: ${themeGet("space.4")};
    right: ${themeGet("space.4")};
    max-width: 50%;
    z-index: 1000;

    ${themeGet("mediaQueries.small")} {
      max-width: 80%;
    }
  }
`

type Props = {
  appStore: IAppStore;
}

export const Alert = connect((props: Props) => {

  const { appStore } = props
  const [alerts, setAlerts] = React.useState<Array<IAppStore["alert"]>>([])

  const addAlert = React.useCallback((arg: IAppStore["alert"]) => {
    setAlerts(alerts => [...alerts, arg]) 
  }, [alerts]) 

  const removeAlert = React.useCallback((index: number) => {
    let newAlerts = alerts.slice()
    if (index === 0) {
      newAlerts = newAlerts.slice(index + 1)
    } else {
      newAlerts = newAlerts.slice(0, index).concat(newAlerts.slice(index + 1))
    }
    setAlerts(newAlerts)
  }, [alerts]) 

  React.useEffect(() => {
    const { alert } = appStore
    if (!isEmptyValue(alert)) {
      addAlert(alert)
    }
  }, [appStore.alert])

  return (
    <>
      <AlertRootStyle />
      <Portal root="alert-root">
        {alerts.map((alert, index) => (
          <AlertComponent 
            key={index} 
            remove={() => removeAlert(index)} 
            variant={alert?.status || "success"}
          >
            {alert.content}
          </AlertComponent>
        ))}
      </Portal>
    </>
  )
})

