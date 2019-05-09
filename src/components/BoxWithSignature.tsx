import React, { Component } from 'react';
import { Rnd } from 'react-rnd';
import { SignBox } from 'src/interface/InputBox';
import { ISigner } from 'src/interface/ISigner';
import SignatureMarker from './SignatureMarker';

interface Props {
  boxData: SignBox;
  users: Array<ISigner>;
  updateInputBox: (boxIndex: number, update: object) => void;
  deleteInputBox: (index: number) => void;
  scale: number;
}

class BoxWithSignature extends Component<Props, any> {

  constructor(props: Props) {
    super(props);

  }


  render() {
    let {
      top,
      left,
      width,
      height,
      page,
      type,
      boxIndex,
      signerIndex,
      minWidth,
    } = this.props.boxData;

    const {
      users,
      deleteInputBox,
      updateInputBox,
      scale,
    } = this.props;

    top *= scale;
    left *= scale;
    width *= scale;
    height *= scale;

    const { backgroundColor } = users[signerIndex];


    return (
      <Rnd // 리사이즈 및 드래그 모듈
        size={{ width: width,  height: height }}
        position={{ x: left, y: top }}
        onDragStop={(e, d) => { updateInputBox(boxIndex, {left: d.x / scale, top: d.y / scale}) }} // 객체이동 드래그 멈춤시 위치 업데이트
        onResizeStop={(e, direction, ref, delta, position) => { // 크기조절 드래그 멈춤시 크기 업데이트
            updateInputBox(boxIndex, {
              width: (width + delta.width) / scale,
              height: (height + delta.height) / scale,
            });
        }}
        // 리사이징 허용여부 - 우측하단만 true로함
        enableResizing={{ top:false, right:false, bottom:false, left:false, topRight:false, bottomRight:true, bottomLeft:false, topLeft:false }}
        enableUserSelectHack={true}
        bounds='parent' // 부모 요소 안에서만 이동 및 리사이징 가능
        lockAspectRatio={true} // 가로 세로 비율 고정
        resizeHandleStyles={{ // 우측하단의 리사이즈 핸들 스타일
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
        minWidth={minWidth * scale} // 최소 가로길이
        minHeight={minWidth * scale} // 최소 세로길이
      >
        
        <SignatureMarker
          boxData={this.props.boxData}
          users={this.props.users}
          updateInputBox={this.props.updateInputBox}
          deleteInputBox={this.props.deleteInputBox}
          className={`signatureMarker-${boxIndex}`}
        />
      </Rnd>
    );
  }
}

export default BoxWithSignature;