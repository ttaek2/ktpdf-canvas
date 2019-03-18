import * as React from "react";

interface IBoxForTextAreaProps {
  backgroundColor: string;
  name: string;
  color: string;
  boxIndex: number;
  updateTextArea: (...args) => void;
  w: number;
  h: number;
  addText: string;
  charSize: string;
  font: string;
  editable: boolean
}

class PlainBoxForTextArea extends React.Component<IBoxForTextAreaProps, React.ComponentState> {

  constructor(props) {
    super(props);

    this.state = {
      text: ''
    };

    this.handleOnChange = this.handleOnChange.bind(this);
  }

  handleOnChange(e) {
    const { updateTextArea, boxIndex } = this.props;
    const val = e.target.value;
    updateTextArea(boxIndex, val);
  }

  render() {
    const {
      backgroundColor,
      color,
      addText,
      w,
      h,
      font,
      charSize,
      editable
    } = this.props;

    const editableStyle = {
      width: `${w}px`,
      height: `${h}px`,
      color,
      resize: 'none',
      fontFamily: `${font}`,
      fontSize: `${charSize}px`,
      // boxSizing: 'border-box',
      backgroundColor: 'white',
      opacity: 0.7,
      border: 'dotted 2px orange',
    };

    const nonEditableStyle = {
      ...editableStyle,
      border: 'none',
      backgroundColor: 'rgba(0, 0, 0, 0.0)'
    };

    return (
      <div
        style={{
          position: 'relative'
        }}
      >
        {/* <input type="text" */}
        <textarea
          disabled={editable ? false : true}
          style={editable ? editableStyle : nonEditableStyle}
          onChange={this.handleOnChange}
          defaultValue={addText}
        />
      </div>
    )
  }
}

export default PlainBoxForTextArea;
