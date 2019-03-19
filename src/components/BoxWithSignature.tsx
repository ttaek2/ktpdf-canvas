import React, {Component} from 'react';
import Popup from "./Popup";
import PopupForSignature from "./PopupForSignature";
import {IoMdCloseCircle} from 'react-icons/io';
import { IconContext } from "react-icons";
import { SignBox } from 'src/interface/InputBox';
import { ISigner } from 'src/interface/ISigner';
import {Rnd} from 'react-rnd'

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

    // this.keyPositionMouseDown = this.keyPositionMouseDown.bind(this);
    // this.keyMouseDown = this.keyMouseDown.bind(this);
    // this.updateType = this.updateType.bind(this);
    // this.resetType = this.resetType.bind(this);
    // this.updateTypePos = this.updateTypePos.bind(this);
    // this.closePopup = this.closePopup.bind(this);
    // this.showPopup = this.showPopup.bind(this);
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

  // closePopup() {
  //   this.setState({ isShowPopup: false });
  // }

  // showPopup() {
  //   this.setState({ isShowPopup: true });
  // }

  onCloseBtnClick = (e) => {
    const {deleteInputBox, boxData} = this.props;
    deleteInputBox(boxData.boxIndex);
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
    } = this.props.boxData;

    console.log(width, height)
    const {
      users,
      deleteInputBox,
      updateInputBox,
    } = this.props;

    const { backgroundColor } = users[signerIndex];

    const closeicon = {
      color: "white", 
      className: "global-class-name", 
      size: "1.3em",
      style: {
        float: 'right'
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
        enableUserSelectHack={true}
        bounds='parent'
        lockAspectRatio={true}
        style={{
          borderRadius: '10px',
          border: `1px solid ${backgroundColor}`,
          overflow: 'hidden',
        }}
        resizeHandleStyles={{
          bottomRight: {
              position: 'absolute',
              width: '15px',
              height: '15px',
              background: `${backgroundColor}`,
              borderRadius: '15px 0 0 0',
              right: 0,
              bottom: 0,
              cursor: 'se-resize',
          }
        }}
      >
        <div 
          style={{
            width: '100%',
            height: '100%',
          }}
          data-number={boxIndex}
          data-type={type}
          data-page={page}
        >
          <div style={{
            height: '20px',
            position: 'relative',
            backgroundColor: `${backgroundColor}`,
            color: 'white',
          }}>
            <span
              onClick={this.onCloseBtnClick}  
            >
              <IconContext.Provider value={closeicon}>
                <IoMdCloseCircle  />
              </IconContext.Provider>
            </span>
          </div>
          <div style={{
            position: 'relative',
            width: '100%',
            height: '100%',
            backgroundColor: 'white',
            opacity: 0.7
          }}/>
        </div>
      </Rnd>
    );
  }
}

export default BoxWithSignature;