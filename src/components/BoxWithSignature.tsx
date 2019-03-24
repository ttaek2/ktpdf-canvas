import React, {Component} from 'react';
import Popup from "./Popup";
import PopupForSignature from "./PopupForSignature";
import {IoMdCloseCircle} from 'react-icons/io';
import { IconContext } from "react-icons";
import { SignBox } from 'src/interface/InputBox';
import { ISigner } from 'src/interface/ISigner';
import {Rnd} from 'react-rnd';
import $ from 'jquery';

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
        onDragStop={(e, d) => { updateInputBox(boxIndex, {left: d.x / scale, top: d.y / scale}) }}
        onResizeStop={(e, direction, ref, delta, position) => {
            updateInputBox(boxIndex, {
              width: (width + delta.width) / scale,
              height: (height + delta.height) / scale,
                // ...position,
            });
        }}
        enableResizing={{ top:false, right:false, bottom:false, left:false, topRight:false, bottomRight:true, bottomLeft:false, topLeft:false }}
        enableUserSelectHack={true}
        bounds='parent'
        lockAspectRatio={true}
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
          style={{
            width: '100%',
            height: '100%',
            border: `1px solid ${backgroundColor}`,
            overflow: 'hidden',
            backgroundColor: 'white',
            opacity: 0.7,
          }}
          className='inputbox-body'
          data-number={boxIndex}
          data-type={type}
          data-page={page}
          onMouseOver={this.onMouseOver}
        >
          
        </div>

        
      </Rnd>
    );
  }
}

export default BoxWithSignature;