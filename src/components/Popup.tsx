import * as React from "react";

let PopupStyle: React.CSSProperties = {
  position: 'absolute',
  top: '-110px',
  // left: 0,
  left: '50%',
  transform: 'translateX(-50%)',
  zIndex: 100,
  // right: 0
  // width: '204px',
  // height: '130px',
  // border: '1px solid #000',
  // backgroundColor: '#fff'
};

interface IPopupProps {
  isShowPopup: boolean;
  closePopup: (...args) => void;
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
      closePopup,
      customStyle
    } = this.props;
    const display = isShowPopup ? 'block' : 'none';
    const style = customStyle ? customStyle : null;

    PopupStyle = Object.assign({}, PopupStyle, style, { display });

    return (
      <div style={PopupStyle}>
        {/* <div style={{
          textAlign: 'right'
        }}>
          <button onClick={closePopup}>X</button>
        </div> */}
        {children}
      </div>
    );
  }
}

export default Popup;
