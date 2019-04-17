import * as React from "react";
import { IconContext } from "react-icons";
import { IoMdCloseCircle } from 'react-icons/io';
import { Rnd } from 'react-rnd';
import { MemoInput } from "src/interface/Input";
import $ from 'jquery';
import MemoMarker from "./MemoMarker";
import Popup from "./Popup";
import PopupForMemo from "./PopupForMemo";

interface IBoxForTextAreaProps {
  input: MemoInput;
  boxIndex: number;
  updateTextArea: (...args) => void;
  editable: boolean;
  updateInputBox: (boxIndex: number, update: object) => void;
  deleteInputBox: (index: number) => void;
  scale: number;
}

class PlainBoxForMemo extends React.Component<IBoxForTextAreaProps, React.ComponentState> {

  constructor(props) {
    super(props);

    this.state = {
      text: ''
    };
  }


  render() {
    let {
      x,
      y,
      w,
      h,
      minW,
      minH
    } = this.props.input;

    const {editable, scale} = this.props;

    x *= scale;
    y *= scale;
    w *= scale;
    h *= scale;

    const {updateInputBox, deleteInputBox, boxIndex} = this.props;

    return (
      <Rnd
          size={{ width: w,  height: h }}
          position={{ x: x, y: y }}
          onDragStop={(e, d) => { updateInputBox(boxIndex, {x: d.x / scale, y: d.y / scale}) }}
          // onDragStop={(e, d) => { console.log(d.x, d.y) }}
          onResizeStop={(e, direction, ref, delta, position) => {
              updateInputBox(boxIndex, {
                  w: (w + delta.width) / scale,
                  h: (h + delta.height) / scale,
              });
              // console.log('resize stop')
          }}
          enableResizing={{ top:false, right:false, bottom:false, left:false, topRight:false, bottomRight:editable, bottomLeft:false, topLeft:false }}
          enableUserSelectHack={false}
          bounds='.document-wrapper'
          resizeHandleStyles={{
            bottomRight: {
              position: 'absolute',
              width: '10px',
              height: '10px',
              background: `orange`,
              borderRadius: '10px 0 0 0',
              right: 0,
              bottom: 0,
              cursor: 'se-resize',
            }
          }}
          disableDragging={!editable}
          minWidth={minW * scale}
          minHeight={minH * scale}
        >

          <Popup
            isShowPopup={true}
            boxHeight={h}
          >
            <PopupForMemo
              updateInputBox={updateInputBox}
              boxIndex={boxIndex}
            />
          </Popup>

        <MemoMarker
          boxIndex={this.props.boxIndex}
          input={this.props.input as MemoInput}
          updateTextArea={this.props.updateTextArea}
          editable={editable}
          updateInputBox={this.props.updateInputBox}
          deleteInputBox={this.props.deleteInputBox}
          scale={scale}
        />


      {/* <div
        className='memo-header' 
        style={{
          width: '100%',
          height: '18px',
          position: 'absolute',
          top: '-17px',
          border: `1px solid orange`,
          backgroundColor: `orange`,
          color: 'white',
          borderRadius: '10px 10px 0 0',
          textAlign: 'right',
          display: 'none',
        }}
      >
        <span
          style={{
            float: 'left',
            fontSize: '0.9em',
          }}
        >{this.props.input.signerNo}님의 메모</span>
        <span
          onClick={this.onCloseBtnClick}  
        >
          <IconContext.Provider value={closeicon}>
            <IoMdCloseCircle  />
          </IconContext.Provider>
        </span>
      </div>
      
      <div
        style={{
          width: '100%',
          height: '100%',
          // position: 'relative',
        }}
        onMouseOver={this.onMouseOver}
      >
        <textarea
          className="memo"
          disabled={editable ? false : true}
          style={editable ? editableStyle : nonEditableStyle}
          onChange={this.handleOnChange}
          placeholder={editable ? "메모 입력" : undefined}
          value={addText}
        />
      </div> */}
      </Rnd>
    )
  }
}

export default PlainBoxForMemo;
