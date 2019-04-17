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
  customStyle ?: object;
  boxHeight: number; // 팝업 아래 박스의 높이
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
      boxHeight,
    } = this.props;
    const display = isShowPopup ? 'block' : 'none';
    const style = customStyle ? customStyle : null;

    PopupStyle = Object.assign({}, PopupStyle, style, { display });

    return (
      <div style={{
        position: 'absolute',
        // top: '-110px',
        left: '50%',
        transform: 'translateX(-50%)',
        bottom: boxHeight + 17,
        display,
      }}>
        <div style={{
          padding: '10px',
          margin: '0px',
          backgroundColor: '#eee',
          border: 'solid 1px',
          borderRadius: '10px',
          width: '200px',
          fontSize: '15px', 
        }}>
          {children}
        </div>
      </div>
    );
  }
}

export default Popup;
