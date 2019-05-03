import $ from 'jquery';
import React, { Component } from 'react';
import { Rnd } from 'react-rnd';
import { CheckBox } from 'src/interface/InputBox';
import { ISigner } from 'src/interface/ISigner';
import CheckboxMarker from './CheckboxMarker';


const defaultZIndex = 20;
const oo = 987654321;

interface Props {
  boxData: CheckBox;
  users: Array<ISigner>;
  updateInputBox: (boxIndex: number, update: object) => void;
  deleteInputBox: (index: number) => void;
  scale: number;
}

class BoxWithCheckbox extends Component<Props, any> {

  constructor(props) {
    super(props);

    this.state = {
      isShowPopup: false,
      zIndex: defaultZIndex,
      showCloseBtn: false,
    };

    this.closePopup = this.closePopup.bind(this);
    this.showPopup = this.showPopup.bind(this);
  }


  closePopup() {
    this.setState({ isShowPopup: false });
  }

  showPopup() {
    this.setState({ isShowPopup: true });
  }

  togglePopup = (e) => {
    this.setState({
      isShowPopup: !this.state.isShowPopup
    })
  }


  onCloseBtnClick = (e) => {
    const {deleteInputBox, boxData} = this.props;
    deleteInputBox(boxData.boxIndex);
  }

  onMouseOver = (e) => {
    $(e.currentTarget).prev('.inputbox-header').show();
  }

  onMouseLeave = (e) => {
    $(e.currentTarget).find('.inputbox-header').hide();
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



    const { isShowPopup, showCloseBtn } = this.state;
    const { backgroundColor } = users[signerIndex];

    const checkicon = {
      color: backgroundColor, 
      className: "global-class-name", 
      size: "100%",
      padding: 0,
      margin: 0,
      // width: '100%',
      // height: '100%',
      style: {
        // position: 'absolute',
      }
    }

    const closeicon = {
      color: "white", 
      className: "global-class-name", 
      size: "1.1em",
      style: {
        position: 'relative',
        right: '0px',
        // float: 'right'
        cursor: 'default',
      }
    }

    return (
        <Rnd // 리사이즈 및 드래그 모듈
          size={{ width: width,  height: height }}
          position={{ x: left, y: top }}
          // 객체이동 드래그 멈춤시 위치 업데이트
          onDragStop={(e, d) => { updateInputBox(boxIndex, {left: d.x / scale, top: d.y / scale}) }}
           // 크기조절 드래그 멈춤시 크기 업데이트
          onResizeStop={(e, direction, ref, delta, position) => {
              updateInputBox(boxIndex, {
                width: (width + delta.width) / scale,
                height: (height + delta.height) / scale,
                  // ...position,
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
          onMouseLeave={this.onMouseLeave}
          minWidth={minWidth * scale} // 최소 가로길이
          minHeight={minWidth * scale} // 최소 세로길이
        >

          <CheckboxMarker
            boxData={this.props.boxData}
            users={this.props.users}
            updateInputBox={this.props.updateInputBox}
            deleteInputBox={this.props.deleteInputBox}
            className={`checkboxMarker-${boxIndex}`}
          />
        </Rnd>
    );
  }
}

export default BoxWithCheckbox;