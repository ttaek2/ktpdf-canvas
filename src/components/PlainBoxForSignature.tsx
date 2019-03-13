import * as React from "react";

interface IBoxForSignatureProps {
  backgroundColor: string;
  name: string;
  color: string;
  controlSignLayer: (...args) => void;
  boxIndex: number;
  w: string;
  h: string;
  signUrl: string;
  editable: boolean 
}

class PlainBoxForSignature extends React.Component<IBoxForSignatureProps, React.ComponentState> {

  constructor(props) {
    super(props);

    this.showSignatureLayer = this.showSignatureLayer.bind(this);
  }

  showSignatureLayer() {
    const { boxIndex, controlSignLayer } = this.props;
    controlSignLayer(boxIndex);
  }

  doNothing = () => {

  }

  render() {
    const {
      backgroundColor,
      name,
      color,
      w,
      h,
      signUrl,
      editable
    } = this.props;

    const nonEditableStyle = {
      position: 'relative',
      width: `${w}px`,
      height: `${h}px`,
      border: 'none',
      backgroundColor: 'rgba(0, 0, 0, 0.0)',
      color
    };

    const editableStyle = {
      ...nonEditableStyle,
      border: '1px solid #000',
      backgroundColor: backgroundColor ? backgroundColor : '#fff',
    }

    return (
      <div
        style={editable ? editableStyle : nonEditableStyle}
        onClick={editable ? this.showSignatureLayer : this.doNothing}
      >
        {signUrl
          ? <img
            src={signUrl}
            alt={'서명'}  
            width={`${w}px`}
            height={`${h}px`}
          />
          // : <span>{name} signature</span>
          : <span></span>
        }
      </div>
    );
  }
}

export default PlainBoxForSignature;
