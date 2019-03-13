import * as React from "react";

const style: React.CSSProperties = {
  position: "absolute",
  backgroundColor: "transparent",
};

// type func = (...args) => any;

interface IBoxProps {
  left: number;
  top: number;
}

class PlainBox extends React.Component<IBoxProps, React.ComponentState> {
  render() {
    const {
      left,
      top,
      children
    } = this.props;

    return(
      <div style={{ ...style, left, top }}>{children}</div>
    );
  }
}

export default PlainBox;
