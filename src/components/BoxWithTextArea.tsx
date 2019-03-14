import React, {Component} from 'react';
import PopupForTextarea from "./PopupForTextarea";
import Popup from "./Popup";
// import Popup from 'reactjs-popup';
import {IoMdCloseCircle} from 'react-icons/io';
import { IconContext } from "react-icons";

const defaultZIndex = 20;
const oo = 987654321;

class BoxWithTextArea extends Component<any, any> {
  mouseDown = false;
  pageX = -1;
  pageY = -1;

  constructor(props) {
    super(props);

    this.state = {
      width: props.width,
      height: props.height,
      isShowPopup: false,
      left: props.left,
      top: props.top,
      zIndex: defaultZIndex,
      showCloseBtn: false,
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

  onMouseDown = (e) => {
    console.log('mouse down')
    this.mouseDown = true;
    this.pageX = e.pageX;
    this.pageY = e.pageY;
    this.setState({
      zIndex: oo
    })
  }

  onMouseMove = (e) => {
    e.preventDefault();
    // console.log('mouse move')
    if(!this.mouseDown)
      return;

    const movementX = e.pageX - this.pageX;
    const movementY = e.pageY - this.pageY;

    // const movementX = e.movementX;
    // const movementY = e.movementY;

    this.pageX = e.pageX;
    this.pageY = e.pageY;

    // let {boxIndex, left, top, updateMarkerPos} = this.props;
    let {left, top} = this.state;
    // const left = marker.left + movementX;
    // const top = marker.top + movementY;
    left += movementX;
    if(left < 0) left = 0;
    top += movementY;
    if(top < 0) top = 0;
    // this.setState({
    //   left,
    //   top
    // })
    // updateMarkerPos(boxIndex, left, top);
    this.setState({
      left,
      top,
      isShowPopup: false,
    })
  }
  onMouseUp = (e) => {
    this.mouseDown = false;
    this.setState({
      zIndex: defaultZIndex
    })
  }
  onMouseLeave = (e) => {
    console.log('mouse leave')
    this.mouseDown = false;
    this.setState({
      zIndex: defaultZIndex,
      showCloseBtn: false,
    })
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

  togglePopup = (e) => {
    this.setState({
      isShowPopup: !this.state.isShowPopup
    })
  }

  handleDoubleClick = (e) => {
    this.popup.open = true;
  }

  onMouseEnter = (e) => {
    console.log('mouse enter!')
    this.setState({
      showCloseBtn: true,
    })
  }

  onCloseBtnClick = (e) => {
    const {deleteTextArea, boxIndex} = this.props;
    deleteTextArea(boxIndex);
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
      deleteTextArea,
      setFontSize,
      setFontFamily,
      fontFamily,
      fontSize
    } = this.props;

    // const {
    //   left,
    //   top,
    //   zIndex
    // } = this.state;

    // console.log('rendering BoxWithTextArea', fontFamily, fontSize);

    const { isShowPopup, showCloseBtn } = this.state;
    const { backgroundColor } = users[signerIndex];

    const closeicon = {
      color: backgroundColor, 
      className: "global-class-name", 
      size: "2em",
      style: {
        // position: 'absolute',

      }
    }

    return (

      <div
        data-number={boxIndex}
        data-type={type}
        data-page={page}
        style={{
          position: 'absolute',
          width: `${width}px`,
          height: `${height}px`,
          top,
          left,
          border: `1px solid ${backgroundColor}`,
          // zIndex: zIndex,
          backgroundColor: '#fff',
          opacity: 0.7
        }}
        // onMouseDown={this.onMouseDown}
        // onMouseMove={this.onMouseMove}
        // onMouseUp={this.onMouseUp}
        // onMouseLeave={this.onMouseLeave}
        // onDoubleClick={this.handleDoubleClick}
      >
        <Popup
          isShowPopup={isShowPopup}
          closePopup={this.closePopup}
          // customStyle={{
          //   top: '-150px',
          //   height: '130px'
          // }}
        >
          <PopupForTextarea
            setFontSize={setFontSize}
            setFontFamily={setFontFamily}
            deleteTextArea={deleteTextArea}
            boxIndex={boxIndex}
            fontFamily={this.props.fontFamily}
            fontSize={this.props.fontSize}
          />
        </Popup>
        <div
          data-number={boxIndex}
          data-type={type}
          data-page={page}
          style={{
            position: 'relative',
          }}
         onMouseOver={this.updateTypePos}
         onMouseDown={this.keyPositionMouseDown}
         onMouseUp={this.resetType}
         onDoubleClick={this.togglePopup}

         onMouseEnter={this.onMouseEnter}
         onMouseLeave={this.onMouseLeave}
        >
          {/* <input type='text' */}
          <textarea
            disabled={false}
          
            style={{
              width: `${width}px`,
              height: `${height}px`,
              resize: 'none',
              fontFamily: fontFamily,
              fontSize: fontSize,
              boxSizing: 'border-box',
            }}
            placeholder="텍스트"
          />
          {showCloseBtn && 
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
          }
          
        </div>
        <div style={{
          position: 'absolute',
          bottom: 0,
          right: 0,
          width: '10px',
          height: '10px',
          backgroundColor: '#000',
          zIndex: 30,
          cursor: 'se-resize',
        }}
          onMouseOver={this.updateType}
          onMouseDown={this.keyMouseDown}
          onMouseUp={this.resetType}
        />
        
      </div>



      // <Popup 
      //   trigger={box} 
      //   position="top"
      //   contentStyle={{
      //     padding: '0px',
      //     borderRadius: '10px',
      //     overflow: 'hidden'
      //   }}
      //   // on='click'
      //   on='hover'
      //   open={false}
      //   ref={ref => this.popup = ref}
      //   // closeOnDocumentClick={false}
      // >
      //   {close => (
      //     <PopupForTextarea
      //       setFontSize={setFontSize}
      //       setFontFamily={setFontFamily}
      //       deleteTextArea={deleteTextArea}
      //       boxIndex={boxIndex}
      //       fontFamily={this.props.fontFamily}
      //       fontSize={this.props.fontSize}
            
      //     />
      //   )}
      // </Popup>


      // <div
      //   data-number={boxIndex}
      //   data-type={type}
      //   data-page={page}
      //   style={{
      //   position: 'absolute',
      //   width: `${width}px`,
      //   height: `${height}px`,
      //   top,
      //   left,
      //   border: `1px solid ${backgroundColor}`,
      //   zIndex: 20,
      //   backgroundColor: '#fff'
      // }}>
      //   <Popup
      //     isShowPopup={isShowPopup}
      //     closePopup={this.closePopup}
      //     customStyle={{
      //       top: '-150px',
      //       height: '130px'
      //     }}
      //   >
      //     <PopupForTextarea
      //       setFontSize={setFontSize}
      //       setFontFamily={setFontFamily}
      //       deleteTextArea={deleteTextArea}
      //       boxIndex={boxIndex}
      //     />
      //   </Popup>
      //   <div
      //     data-number={boxIndex}
      //     data-type={type}
      //     data-page={page}
      //     style={{
      //       position: 'relative',
      //     }}
      //    onMouseOver={this.updateTypePos}
      //    onMouseDown={this.keyPositionMouseDown}
      //    onMouseUp={this.resetType}
      //    onDoubleClick={this.showPopup}
      //   >
      //     {/* <input type='text' */}
      //     <textarea
      //       // disabled={true}
          
      //       style={{
      //         width: `${width}px`,
      //         height: `${height}px`,
      //         resize: 'none',
      //         fontFamily: fontFamily,
      //         fontSize: fontSize,
      //         boxSizing: 'border-box'
      //       }}
      //       placeholder="텍스트"
      //     />
      //   </div>
      //   <div style={{
      //     position: 'absolute',
      //     bottom: 0,
      //     right: 0,
      //     width: '10px',
      //     height: '10px',
      //     backgroundColor: '#000',
      //     zIndex: 30
      //   }}
      //      onMouseOver={this.updateType}
      //      onMouseDown={this.keyMouseDown}
      //      onMouseUp={this.resetType}
      //   />
      // </div>
    );
  }
}

export default BoxWithTextArea;