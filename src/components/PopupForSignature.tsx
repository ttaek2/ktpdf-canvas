import * as React from "react";

interface IPopup {
  deleteSignatureArea: (...args) => void;
  boxIndex: number;
}

class PopupForSignature extends React.Component<IPopup, React.ComponentState> {

  constructor(props) {
    super(props);

    this.deleteThisSignature = this.deleteThisSignature.bind(this);
  }

  deleteThisSignature() {
    const { boxIndex, deleteSignatureArea } = this.props;
    deleteSignatureArea(boxIndex);
  }

  render() {
    const {
      children
    } = this.props;

    return (
      <div>
        <div style={{textAlign: 'center'}}>
          <button style={{width: '80%'}} onClick={this.deleteThisSignature}>삭제</button>
        </div>
        {children}
      </div>
    );
  }
}

export default PopupForSignature;
