import * as React from "react";

interface IPopup {
  updateInputBox: (boxIndex: number, update: object) => void;
  boxIndex: number;
}

class PopupForMemo extends React.Component<IPopup, React.ComponentState> {

  constructor(props) {
    super(props);
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
          <button>1</button>
          <button>2</button>
          <button>3</button>
          <button>4</button>
        </div>
      </React.Fragment>
    );
  }
}

export default PopupForMemo;