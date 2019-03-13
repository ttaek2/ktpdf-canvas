import React, {Component} from 'react';
import Popup from "./Popup";
import PopupForSignature from "./PopupForSignature";
import {IoMdCloseCircle} from 'react-icons/io';
import { IconContext } from "react-icons";

class BoxWithSignature extends Component<any, any> {

  constructor(props) {
    super(props);

    this.state = {
      width: 200,
      height: 100,
      isShowPopup: false
    };

    this.keyPositionMouseDown = this.keyPositionMouseDown.bind(this);
    this.keyMouseDown = this.keyMouseDown.bind(this);
    this.updateType = this.updateType.bind(this);
    this.resetType = this.resetType.bind(this);
    this.updateTypePos = this.updateTypePos.bind(this);
    this.closePopup = this.closePopup.bind(this);
    this.showPopup = this.showPopup.bind(this);
  }

  keyMouseDown(e) {
    if (e !== this.props.e) {
      this.props.updateEventObject(e);
      e.stopPropagation();
    }
  }

  keyPositionMouseDown(e) {
    if(e !== this.props.e) {
      this.props.updateEventObject(e);
      this.props.updateType('pos');
    }
  }

  updateType(e) {
    this.props.updateType('size');
    e.stopPropagation();
  }

  resetType(e) {
    this.props.updateEventObjectToNull();
    e.stopPropagation();
  }

  updateTypePos() {
    const controlType = this.props.type;
    if(!controlType || controlType === 'size') return false;

    this.props.updateType('pos');
  }

  closePopup() {
    this.setState({ isShowPopup: false });
  }

  showPopup() {
    this.setState({ isShowPopup: true });
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
      users,
      deleteSignatureArea
    } = this.props;

    const { isShowPopup } = this.state;
    const { backgroundColor } = users[signerIndex];

    const closeicon = {
      color: "white", 
      className: "global-class-name", 
      size: "1.3em",
      style: {
        float: 'right'
      }
    }

    const signMarker = (
      <div 
        style={{
          position: 'absolute',
          width: `${width}px`,
          height: `${height}px`,
          top,
          left,
          zIndex: 20,
          borderRadius: '10px',
          border: `1px solid ${backgroundColor}`,
          overflow: 'hidden',
        }}
        data-number={boxIndex}
        data-type={type}
        data-page={page}
        onMouseOver={this.updateTypePos}
        onMouseDown={this.keyPositionMouseDown}
        onMouseUp={this.resetType}
        onDoubleClick={this.showPopup}
      >
        <div style={{
          height: '20px',
          position: 'relative',
          backgroundColor: `${backgroundColor}`,
          color: 'white',
        }}>
          <IconContext.Provider value={closeicon}>
            <IoMdCloseCircle  />
          </IconContext.Provider>
        </div>
        <div style={{
          position: 'relative',
          width: '100%',
          height: '100%',
          backgroundColor: 'white',
          opacity: 0.8
        }}/>
        <div 
          style={{
            position: 'absolute',
            width: '15px',
            height: '15px',
            background: `${backgroundColor}`,
            borderRadius: '15px 0 0 0',
            right: 0,
            bottom: 0,
            cursor: 'se-resize',
            // -moz-border-radius: '20px 0 0 0',
            // -webkit-border-radius: '20px 0 0 0',
          }}
          onMouseOver={this.updateType}
          onMouseDown={this.keyMouseDown}
          onMouseUp={this.resetType}
        />
      </div>
    )

    return (
      <div>{signMarker}</div>
      // <div
      //   data-number={boxIndex}
      //   data-type={type}
      //   data-page={page}
      //   style={{
      //     position: 'absolute',
      //     width: `${width}px`,
      //     height: `${height}px`,
      //     top,
      //     left,
      //     zIndex: 20,
      //     backgroundColor: `${backgroundColor}`
      //   }}>
      //   <Popup
      //     isShowPopup={isShowPopup}
      //     closePopup={this.closePopup}
      //     customStyle={{
      //       height: '50px',
      //       top: '-70px'
      //     }}
      //   >
      //     <PopupForSignature
      //       boxIndex={boxIndex}
      //       deleteSignatureArea={deleteSignatureArea}
      //     />
      //   </Popup>
      //   <div
      //     data-number={boxIndex}
      //     data-type={type}
      //     data-page={page}
      //     style={{
      //       position: 'relative',
      //       width: `${width}px`,
      //       height: `${height}px`,
      //     }}
      //     onMouseOver={this.updateTypePos}
      //     onMouseDown={this.keyPositionMouseDown}
      //     onMouseUp={this.resetType}
      //     onDoubleClick={this.showPopup}
      //   />
      //   <div style={{
      //     position: 'absolute',
      //     bottom: 0,
      //     right: 0,
      //     width: '10px',
      //     height: '10px',
      //     backgroundColor: '#000',
      //     zIndex: 30
      //   }}
      //        onMouseOver={this.updateType}
      //        onMouseDown={this.keyMouseDown}
      //        onMouseUp={this.resetType}
      //   />
      // </div>
    );
  }
}

export default BoxWithSignature;