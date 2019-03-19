import React, {Component, Fragment} from 'react';
import PopupForTextarea from "./PopupForTextarea";
import Popup from "./Popup";
// import Popup from 'reactjs-popup';
import {IoMdCloseCircle} from 'react-icons/io';
import { IconContext } from "react-icons";
import {Rnd} from 'react-rnd'
import { TextBox } from 'src/interface/InputBox';
import { ISigner } from 'src/interface/ISigner';
import $ from 'jquery';

const defaultZIndex = 20;
const oo = 987654321;

interface Props {
  boxData: TextBox;
  users: Array<ISigner>;
  updateInputBox: (boxIndex: number, update: object) => void;
  deleteInputBox: (index: number) => void;
  scale: number;
}

class BoxWithTextArea extends Component<Props, any> {

  constructor(props) {
    super(props);

    this.state = {
      isShowPopup: false,
      zIndex: defaultZIndex,
      showCloseBtn: false,
    };

    // this.keyPositionMouseDown = this.keyPositionMouseDown.bind(this);
    // this.keyMouseDown = this.keyMouseDown.bind(this);
    // this.updateType = this.updateType.bind(this);
    // this.resetType = this.resetType.bind(this);
    // this.updateTypePos = this.updateTypePos.bind(this);
    this.closePopup = this.closePopup.bind(this);
    this.showPopup = this.showPopup.bind(this);
  }

  // keyMouseDown(e) {
  //   if (e !== this.props.e) {
  //     this.props.updateEventObject(e);
  //     e.stopPropagation();
  //   }
  // }

  // keyPositionMouseDown(e) {
  //   if(e !== this.props.e) {
  //     this.props.updateEventObject(e);
  //     this.props.updateType('pos');
  //   }
  // }

  // onMouseDown = (e) => {
  //   console.log('mouse down')
  //   this.mouseDown = true;
  //   this.pageX = e.pageX;
  //   this.pageY = e.pageY;
  //   this.setState({
  //     zIndex: oo
  //   })
  // }

  // onMouseMove = (e) => {
  //   e.preventDefault();
  //   // console.log('mouse move')
  //   if(!this.mouseDown)
  //     return;

  //   const movementX = e.pageX - this.pageX;
  //   const movementY = e.pageY - this.pageY;

  //   // const movementX = e.movementX;
  //   // const movementY = e.movementY;

  //   this.pageX = e.pageX;
  //   this.pageY = e.pageY;

  //   // let {boxIndex, left, top, updateMarkerPos} = this.props;
  //   let {left, top} = this.state;
  //   // const left = marker.left + movementX;
  //   // const top = marker.top + movementY;
  //   left += movementX;
  //   if(left < 0) left = 0;
  //   top += movementY;
  //   if(top < 0) top = 0;
  //   // this.setState({
  //   //   left,
  //   //   top
  //   // })
  //   // updateMarkerPos(boxIndex, left, top);
  //   this.setState({
  //     left,
  //     top,
  //     isShowPopup: false,
  //   })
  // }
  // onMouseUp = (e) => {
  //   this.mouseDown = false;
  //   this.setState({
  //     zIndex: defaultZIndex
  //   })
  // }
  

  // updateType(e) {
  //   this.props.updateType('size');
  //   e.stopPropagation();
  // }

  // resetType(e) {
  //   this.props.updateEventObjectToNull();
  //   e.stopPropagation();
  // }

  // updateTypePos() {
  //   const controlType = this.props.type;
  //   if(!controlType || controlType === 'size') return false;

  //   this.props.updateType('pos');
  // }

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

  onMouseEnter = (e) => {
    console.log('mouse enter!')
    this.setState({
      showCloseBtn: true,
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
    const {
      top,
      left,
      width,
      height,
      page,
      type,
      boxIndex,
      signerIndex,
      fontFamily,
      fontSize,
    } = this.props.boxData;

    console.log('rendering textbox')
    console.log(width, height);

    const {
      users,
      deleteInputBox,
      updateInputBox,
    } = this.props;

    const { isShowPopup, showCloseBtn } = this.state;
    const { backgroundColor } = users[signerIndex];

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
        <Rnd
          size={{ width: width,  height: height }}
          position={{ x: left, y: top }}
          onDragStop={(e, d) => { updateInputBox(boxIndex, {left: d.x, top: d.y}) }}
          onResizeStop={(e, direction, ref, delta, position) => {
              updateInputBox(boxIndex, {
                  width: width + delta.width,
                  height: height + delta.height,
                  ...position,
              });
          }}
          enableResizing={{ top:false, right:false, bottom:false, left:false, topRight:false, bottomRight:true, bottomLeft:false, topLeft:false }}
          enableUserSelectHack={false}
          bounds='parent'
          dragHandleClassName={`textbox-${boxIndex}`}
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
          onMouseLeave={this.onMouseLeave}
        >
          <Popup
            isShowPopup={isShowPopup}
            closePopup={this.closePopup}
          >
            <PopupForTextarea
              updateInputBox={updateInputBox}
              boxIndex={boxIndex}
              fontFamily={fontFamily}
              fontSize={fontSize}
            />
          </Popup>

          <div
            className='inputbox-header' 
            style={{
              width: '100%',
              height: '18px',
              position: 'absolute',
              top: '-17px',
              border: `1px solid ${backgroundColor}`,
              backgroundColor: `${backgroundColor}`,
              color: 'white',
              borderRadius: '10px 10px 0 0',
              textAlign: 'right',
              display: 'none',
            }}
          >
            <span
              onClick={this.onCloseBtnClick}  
            >
              <IconContext.Provider value={closeicon}>
                <IoMdCloseCircle  />
              </IconContext.Provider>
            </span>
          </div>

          <div
            className={`textbox-${boxIndex}`}
            style={{width: '100%', height: '100%'}}
            onMouseOver={this.onMouseOver}
            // onMouseLeave={this.onMouseLeave}
          >
            <textarea
              // disabled={false}
              data-number={boxIndex}
              data-type={type}
              data-page={page}
            
              style={{
                width: '100%',
                height: '100%',
                fontFamily: fontFamily,
                fontSize: fontSize,
                resize: 'none',
                boxSizing: 'border-box',
                backgroundColor: '#fff',
                opacity: 0.7,
                border: `1px solid ${backgroundColor}`,
              }}
              placeholder="텍스트 입력란"
              onDoubleClick={this.togglePopup}
              
            />
            {/* {showCloseBtn && 
            // {true && 
              <div 
                style={{
                  position: 'absolute',
                  right: '-20px',
                  top: '0px'
                }}
                onClick={this.onCloseBtnClick}
              >
                <IconContext.Provider value={closeicon}>
                  <IoMdCloseCircle  />
                </IconContext.Provider>
              </div>
            } */}
          </div>
        </Rnd>
    );
  }
}

export default BoxWithTextArea;