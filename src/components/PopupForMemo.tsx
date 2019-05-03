import * as React from "react";
import { FiArrowDownLeft, FiArrowDownRight, FiArrowUpLeft, FiArrowUpRight } from "react-icons/fi";
import { IconContext } from "react-icons";

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

    return (
      <React.Fragment>
        <div style={{
          padding: '10px',
        }}>
        {/* <IconContext.Provider value={closeicon}>
        </IconContext.Provider> */}
          <button onClick={() => this.onShapeMemo('lu')}><FiArrowUpLeft  /></button>
          <button onClick={() => this.onShapeMemo('ld')}><FiArrowDownLeft/></button>
          <button onClick={() => this.onShapeMemo('ru')}><FiArrowUpRight /></button>
          <button onClick={() => this.onShapeMemo('rd')}><FiArrowDownRight /></button>
        </div>
      </React.Fragment>
    );
  }
}

export default PopupForMemo;