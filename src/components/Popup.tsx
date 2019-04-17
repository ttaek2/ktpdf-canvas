import * as React from "react";


interface IPopupProps {
  isShowPopup: boolean;
  customStyle ?: object;
}

class Popup extends React.Component<IPopupProps, React.ComponentState> {

  constructor(props) {
    super(props);
  }

  render() {
    const {
      isShowPopup,
      children,
      customStyle,
    } = this.props;
    const display = isShowPopup ? 'block' : 'none';

    return (
      <div style={{
        position: 'absolute',
        // top: '-110px',
        left: '50%',
        transform: 'translateX(-50%)',
        display,
        ...customStyle,
      }}>
        <div style={{
          padding: '0px',
          margin: '0px',
          backgroundColor: '#eee',
          border: 'solid 0.5px',
          borderRadius: '10px',
          // width: '200px',
          // fontSize: '15px', 
        }}>
          {children}
        </div>
      </div>
    );
  }
}

export default Popup;
