import styled from "styled-components";
import { List as BaseList } from "../../../components/List";
import { Text } from "../../../components/Text";
import { FontAwesomeIcon } from "../../../components/Icon";
import { TextArea as BaseTextArea } from "../../../components/TextArea";
import { Button as BaseButton } from "../../../components/Button";
import { themeGet } from "../../../helpers";

export const List = styled(BaseList)`
  height: fit-content;
  min-height: fit-content;
  box-shadow: none;
  margin-bottom: ${themeGet("space.2")};

  ${BaseList.Item} {
    max-width: 100%;
    border-bottom: 1px solid ${themeGet("colors.grey.200")};
    padding-left: 0;

    &:last-child {
      border-bottom: none;
    }

    ${Text} {
      flex: 1;
      white-space: break-spaces;
    }

    ${FontAwesomeIcon} {
      align-self: start;

      &:nth-child(1) {
        color: ${themeGet("colors.grey.500")};
      }

      &:nth-child(2) {
        margin-left: ${themeGet("space.1")};
        color: ${themeGet("colors.red.600")};
      }
    }
  }
`;

export const TextArea = styled(BaseTextArea)`
  resize: vertical;
  font-size: ${themeGet("fontSizes.1")};
  outline: none;
  border: 1px solid ${themeGet("colors.blueGrey.200")};
  color: ${themeGet("colors.grey.700")};
  border-radius: ${themeGet("radii.1")};
  padding: ${themeGet("space.1")};
  min-height: 100px;
`;

export const Button = styled(BaseButton)``;
