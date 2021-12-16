import React from "react";
import { AnimationWrapper } from "./styled";

type Props = {
  duration: number;
  variant: string;
  children: React.ReactNode;
};

export const Animation = (props: Props) => {
  const { variant, children, duration, ...rest } = props;

  return (
    <AnimationWrapper variant={variant} duration={duration} {...rest}>
      {children}
    </AnimationWrapper>
  );
};

Animation.defaultProps = {
  duration: 1, // default duration is 1sec
};
