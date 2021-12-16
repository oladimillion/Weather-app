import React from "react";
import { Icon } from "../Icon";
import { Text } from "../Text";
import { FlexBox } from "../FlexBox";
import { Pane } from "../Pane";
import { Animation } from "../Animation";
import { AlertWrapper } from "./styled";

type Props = {
  variant: string;
  children: React.ReactNode;
  remove(): void;
};

const iconTypes: any = {
  success: "circle-check",
  error: "circle-exclamation",
};

export const Alert = (props: Props) => {
  const { variant, children, remove, ...rest } = props;
  const icon = iconTypes[variant];
  const duration = 10; // seconds
  const DURATION = duration * 1000; // milliseconds
  let timerId: number | null = null;

  const cleanUp = () => {
    if (timerId) {
      clearTimeout(timerId);
      timerId = null;
    }
  };

  React.useEffect(() => {
    cleanUp();

    //@ts-ignore
    timerId = setTimeout(remove, DURATION);
    return () => cleanUp();
  }, [timerId, remove, DURATION]);

  const onClose = React.useCallback(() => {
    cleanUp();
    remove();
  }, [remove]);

  return (
    <Animation {...rest} duration={duration} variant="alert">
      <AlertWrapper variant={variant}>
        <FlexBox flex={1}>
          <Icon icon={icon} />
          <Text ml={1} my={0}>
            {children}
          </Text>
        </FlexBox>
        <Pane ml={1} mr={-1}>
          <Icon icon="close" onClick={onClose} />
        </Pane>
      </AlertWrapper>
    </Animation>
  );
};
