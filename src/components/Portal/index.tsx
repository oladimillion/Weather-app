import React from "react";
import ReactDOM from "react-dom";

type Props = {
  children: React.ReactNode;
  root?: string;
};

export class Portal extends React.Component<Props> {
  element: HTMLDivElement = document.createElement("div");

  componentDidMount() {
    const { root } = this.props;
    if (!document.contains(this.element)) {
      this.element.setAttribute("id", root || "root-portal");
      document.body.appendChild(this.element);
    }
  }

  componentWillUnmount() {
    document.body.removeChild(this.element);
  }

  render() {
    const { children } = this.props;
    return ReactDOM.createPortal(children, this.element);
  }
}
