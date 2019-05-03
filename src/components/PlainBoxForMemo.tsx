import * as React from "react";
import { Rnd } from 'react-rnd';
import { MemoInput } from "src/interface/Input";
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
      
    console.log('rendering plainboxformemo!', minW, minH)
    
    x *= scale;
    y *= scale;
    w *= scale;
    h *= scale;


    const {updateInputBox, deleteInputBox, boxIndex} = this.props;

    return (
      <Rnd // 리사이즈 및 드래그 모듈
          size={{ width: w,  height: h }}
          position={{ x: x, y: y }}
          // 객체이동 드래그 멈춤시 위치 업데이트
          onDragStop={(e, d) => { updateInputBox(boxIndex, {x: d.x / scale, y: d.y / scale}) }}
           // 크기조절 드래그 멈춤시 크기 업데이트
          onResizeStop={(e, direction, ref, delta, position) => {
              updateInputBox(boxIndex, {
                  w: (w + delta.width) / scale,
                  h: (h + delta.height) / scale,
              });
          }}
          // 리사이징 허용여부 - 우측하단만 true로함
          enableResizing={{ top:false, right:false, bottom:false, left:false, topRight:false, bottomRight:editable, bottomLeft:false, topLeft:false }}
          enableUserSelectHack={false}
          bounds='.document-wrapper' // .document-wrapper 영역 안에서만 이동 및 리사이징 가능
          dragHandleClassName={`memo-${boxIndex}`}
          resizeHandleStyles={{ // 우측하단의 리사이즈 핸들 스타일
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
          disableDragging={!editable} // 편집가능 여부에 따라 드래그 허용여부 결정함
          minWidth={minW ? minW * scale : undefined} // 최소 가로길이
          minHeight={minH ? minH * scale : undefined} // 최소 세로길이
        >

        {editable &&
          <Popup
            isShowPopup={true}
            customStyle={{top: '-50px', width: '170px' }}
          >
            <PopupForMemo
              updateInputBox={updateInputBox}
              boxIndex={boxIndex}
            />
          </Popup>
        }
          
        <MemoMarker
          boxIndex={this.props.boxIndex}
          input={this.props.input as MemoInput}
          updateTextArea={this.props.updateTextArea}
          editable={editable}
          updateInputBox={this.props.updateInputBox}
          deleteInputBox={this.props.deleteInputBox}
          className={`memo-${boxIndex}`}
          scale={scale}
        />

      </Rnd>
    )
  }
}

export default PlainBoxForMemo;
