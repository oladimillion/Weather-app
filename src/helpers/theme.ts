import { get } from "lodash";

export const themeGet =
  (path: string, defaultProps: any = null) =>
  (props: { theme: any }) => {
    return get(props.theme, path, defaultProps);
  };
