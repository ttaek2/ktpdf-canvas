import * as React from "react";

interface IPopup {
  updateInputBox: (boxIndex: number, update: object) => void;
  boxIndex: number;
}

class PopupForMemo extends React.Component<IPopup, React.ComponentState> {

  constructor(props) {
    super(props);
  }

  onShapeMemo = (gbnCd) => {
    const { boxIndex, updateInputBox } = this.props;
    updateInputBox(boxIndex, { gbnCd });
  }

  render() {
    const {
      children,
    } = this.props;

    return (
      <React.Fragment>
        <div style={{
          position: 'relative',
          zIndex: 11,
          height: '20px',
          padding: '2px',
        }}>
          <button onClick={() => this.onShapeMemo('lu')}>lu</button>
          <button onClick={() => this.onShapeMemo('ld')}>ld</button>
          <button onClick={() => this.onShapeMemo('ru')}>ru</button>
          <button onClick={() => this.onShapeMemo('rd')}>rd</button>
        </div>
      </React.Fragment>
    );
  }
}

export default PopupForMemo;