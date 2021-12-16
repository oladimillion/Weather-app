import React from 'react';
import {
  List as BaseList,
  Header,
  Item,
} from "./styled"

type Props = {
  title?: string;
  children: React.ReactNode;
}

export const List = (props: Props) => {

  const { title, children, ...rest } = props

  return (
    <BaseList {...rest}>
      {title && <Header>{ title }</Header>}
      {children}
    </BaseList>
  );
};

List.Header = Header
List.Item = Item
