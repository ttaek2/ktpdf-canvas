import React, {Component, Fragment} from 'react';
import PopupForTextarea from "./PopupForTextarea";
import Popup from "./Popup";
// import Popup from 'reactjs-popup';
import {IoMdCloseCircle} from 'react-icons/io';
import {IoMdRadioButtonOn, IoMdRadioButtonOff} from 'react-icons/io';
import { IconContext } from "react-icons";

import {Rnd} from 'react-rnd'
import { TextBox, CheckBox, RadioBox } from 'src/interface/InputBox';
import { ISigner } from 'src/interface/ISigner';
import $ from 'jquery';

const defaultZIndex = 20;
const oo = 987654321;

interface Props {
  boxData: RadioBox;
  users: Array<ISigner>;
  updateInputBox: (boxIndex: number, update: object) => void;
  deleteInputBox: (index: number) => void;
  scale: number;
}

class BoxWithRadio extends Component<Props, any> {

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

    console.log('rendering textbox')
    console.log(width, height);

    const {
      users,
      deleteInputBox,
      updateInputBox,
    } = this.props;

    const { isShowPopup, showCloseBtn } = this.state;
    const { backgroundColor } = users[signerIndex];

    const radioicon = {
      color: backgroundColor, 
      className: "global-class-name", 
    //   size: "100%",
      padding: 0,
      margin: 0,
      style: {
        position: 'absolute',
        top: '0px',
        height: '100%',
        width: height,
      }
    }

    const radioiconLeft = {
        ...radioicon,
        style: {
            ...radioicon.style,
            left: '0px',
        }
    }

    const radioiconRight = {
        ...radioicon,
        style: {
            ...radioicon.style,
            right: '0px',
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
          lockAspectRatio={false}
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
          minWidth={height * 2}
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
            //   overflow: 'hidden',
              backgroundColor: 'white',
              opacity: 0.7,
              position: 'absolute',
              textAlign: 'left',
            }}
            className='inputbox-body'
            data-number={boxIndex}
            data-type={type}
            data-page={page}
            onMouseOver={this.onMouseOver}
          >
            <IconContext.Provider value={radioiconLeft}>
              <IoMdRadioButtonOn />
            </IconContext.Provider>

            <IconContext.Provider value={radioiconRight}>
              <IoMdRadioButtonOn />
            </IconContext.Provider>
          </div>

          
        </Rnd>
    );
  }
}

export default BoxWithRadio;