import * as React from "react";

let style: React.CSSProperties = {
  position: 'fixed',
  top: 0,
  bottom: 0,
  left: 0,
  right: 0,
  zIndex: 100
};

interface IDimmedLayer {
  showSignLayer: boolean;
}

class DimmedLayer extends React.Component<IDimmedLayer, React.ComponentState> {
  render() {
    const {showSignLayer, children} = this.props;
    const display = showSignLayer ? 'block' : 'none';
    style = Object.assign({}, style, { display });

    return (
      <div style={style}>
        {children}
      </div>
    );
  }
}

export default DimmedLayer;
