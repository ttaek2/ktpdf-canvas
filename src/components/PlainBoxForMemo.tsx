import * as React from "react";
import {Rnd} from 'react-rnd'

interface IBoxForTextAreaProps {
  backgroundColor: string;
  name: string;
  color: string;
  boxIndex: number;
  updateTextArea: (...args) => void;
  x: number;
  y: number;
  w: number;
  h: number;
  addText: string;
  charSize: string;
  font: string;
  editable: boolean;
  updateInputBox: (boxIndex: number, update: object) => void;
  deleteInputBox: (index: number) => void;
}

class PlainBoxForMemo extends React.Component<IBoxForTextAreaProps, React.ComponentState> {

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
      x,
      y,
      w,
      h,
      font,
      charSize,
      editable
    } = this.props;
    console.log('rendering memo!')
    console.log(x, y, w, h)

    const editableStyle = {
      width: '100%',
      height: '100%',
      resize: 'none',
      fontFamily: `${font}`,
      fontSize: `${charSize}px`,
      // boxSizing: 'border-box',
      // backgroundColor: 'white',
      // opacity: 0.7,
      // border: 'dotted 2px orange',
      textDecoration:'none',
      color:'#000',
      background:'#ffc',
      padding: 0,
      margin: 0,
      border: 'none',
      boxShadow: '5px 5px 7px rgba(33,33,33,.7)',
      opacity: 0.9,
    };

    const nonEditableStyle = {
      ...editableStyle,
      // border: 'none',
      // backgroundColor: 'rgba(0, 0, 0, 0.0)'
    };

    const {updateInputBox, deleteInputBox, boxIndex} = this.props;

    return (
      <Rnd
          size={{ width: w,  height: h }}
          position={{ x: x, y: y }}
          onDragStop={(e, d) => { updateInputBox(boxIndex, {x: d.x, y: d.y}) }}
          // onDragStop={(e, d) => { console.log(d.x, d.y) }}
          onResizeStop={(e, direction, ref, delta, position) => {
              updateInputBox(boxIndex, {
                  w: w + delta.width,
                  h: h + delta.height,
                  ...position,
              });
              // console.log('resize stop')
          }}
          enableResizing={{ top:false, right:false, bottom:false, left:false, topRight:false, bottomRight:editable, bottomLeft:false, topLeft:false }}
          enableUserSelectHack={false}
          bounds='parent'
          resizeHandleStyles={{
            bottomRight: {
              position: 'absolute',
              width: '10px',
              height: '10px',
              background: `${backgroundColor}`,
              borderRadius: '10px 0 0 0',
              right: 0,
              bottom: 0,
              cursor: 'se-resize',
            }
          }}
          disableDragging={!editable}
          // onMouseLeave={this.onMouseLeave}
        >
      <div
        style={{
          width: '100%',
          height: '100%',
          // position: 'relative',
        }}
      >
        {/* <input type="text" */}
        <textarea
          className="memo"
          disabled={editable ? false : true}
          style={editable ? editableStyle : nonEditableStyle}
          onChange={this.handleOnChange}
          defaultValue={`signer님의 메모입력 : \n${addText}`}
          placeholder="메모 입력"
        />
      </div>
      </Rnd>
    )
  }
}

export default PlainBoxForMemo;
