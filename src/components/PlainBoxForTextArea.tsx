import * as React from "react";
import { TextInput } from "src/interface/Input";
import Popup from "./Popup";
import PopupForTextarea from "./PopupForTextarea";

interface IBoxForTextAreaProps {
  input: TextInput;
  boxIndex: number;
  updateTextArea: (...args) => void;
  updateInputBox: (boxIndex: number, update: object) => void;
  editable: boolean
  scale: number;
  focused: boolean;
}

class PlainBoxForTextArea extends React.Component<IBoxForTextAreaProps, React.ComponentState> {

  constructor(props) {
    super(props);

    this.state = {
      text: '',
      isShowPopup: false,
    };

    this.handleOnChange = this.handleOnChange.bind(this);
  }

  handleOnChange(e) {
    const { updateTextArea, boxIndex } = this.props;
    const val = e.target.value;
    updateTextArea(boxIndex, val);
  }

  togglePopup = () => {
    this.setState({
      isShowPopup: !this.state.isShowPopup
    })
  }

  render() {
    
    let {
      addText,
      x,
      y,
      w,
      h,
      font,
      charSize,
    } = this.props.input;

    const {editable, scale, boxIndex, updateInputBox, focused} = this.props;
    x *= scale;
    y *= scale;
    w *= scale;
    h *= scale;

    const editableStyle: React.CSSProperties = {
      width: '100%',
      height: '100%',
      resize: 'none',
      fontFamily: font,
      // fontSize: `${charSize}px`,
      fontSize: `${Number(charSize) * scale}px`,
      // boxSizing: 'border-box',
      backgroundColor: 'white',
      opacity: 0.7,
      border: 'dotted 1.5px orange',
      padding: 0,
      margin: 0,
      overflow: 'hidden',
    };

    const focusedStyle = {
      ...editableStyle,
      outline: 'none',
      borderColor: '#9ecaed',
      boxShadow: '0 0 15px #9ecaed',
    }

    const nonEditableStyle = {
      ...editableStyle,
      border: 'none',
      backgroundColor: 'rgba(0, 0, 0, 0.0)'
    };

    return (
      <div
        style={{
          position: 'absolute',
          left: x,
          top: y,
          width: w,
          height: h,
          padding: 0,
          margin: 0,
        }}
      >
        {/* <input type="text" */}
        <textarea
          disabled={editable ? false : true}
          style={editable ? editableStyle : nonEditableStyle}
          onChange={this.handleOnChange}
          defaultValue={addText}
          onDoubleClick={this.togglePopup}
          className={focused ? 'focused-input' : undefined}
          placeholder='텍스트 입력'
        />

        <Popup
          isShowPopup={this.state.isShowPopup}
          customStyle={{top: '-90px', width: '200px'}}
        >
          <PopupForTextarea
            updateInputBox={updateInputBox}
            boxIndex={boxIndex}
            fontFamily={font}
            fontSize={charSize}
          />
        </Popup>
      </div>
    )
  }
}

export default PlainBoxForTextArea;
