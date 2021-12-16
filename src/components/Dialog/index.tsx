import React from "react"
import { Text } from "../Text"
import { FlexBox } from "../FlexBox"
import { Button } from "../Button"
import { Pane } from "../Pane"
import { Animation } from "../Animation"
import { DialogWrapper } from "./styled"
 
type Props = {
  title?: string;
  content?: any;
  actions?: Array<{ label: string; onClick: Function }>;
  remove(): void;
}


export const Dialog = (props: Props) => {

  const { 
    remove, 
    title,
    content,
    actions,
    ...rest
  } = props
  const [variant, setVariant] = React.useState("modal-open")
  const duration = 1 // seconds
  const DURATION = duration * 1000  // milliseconds
  let timerId: number | null = null

  const cleanUp = () => {
    if (timerId) {
      clearTimeout(timerId)
      timerId = null
    }
  }

  React.useEffect(() => {
    return () => cleanUp() 
  }, [])

  const onClose = React.useCallback(() => {
    setVariant("modal-close")
    cleanUp()

    // @ts-ignore
    timerId = setTimeout(remove, DURATION)
  }, [remove])

  const handleClick = React.useCallback((onClick) => {
    return async () => {
      await onClick()
      onClose()
    }
  }, [onClose])

  return (
    <Animation {...rest} duration={duration} variant={variant}>
      <DialogWrapper>
        <Pane 
          m="auto" 
          width={["90%", "50%"]}
          borderRadius={1}
          p={3}
          backgroundColor="white"
        >
          <Text color="grey.700" as="h3">{title}</Text>
          <Pane color="grey.600" my={3} overflowY="auto">
            {content}
          </Pane>
          <FlexBox flex={1} justifyContent="right">
            <Button variant="secondary" onClick={onClose}>Close</Button>
            {actions?.map(({ label, onClick }) => (
              <Button 
                key={label} 
                variant="primary"
                onClick={handleClick(onClick)}
                ml={2}
              >
                {label}
              </Button>
            ))}
          </FlexBox>
        </Pane>
      </DialogWrapper>
    </Animation>
  )
}

