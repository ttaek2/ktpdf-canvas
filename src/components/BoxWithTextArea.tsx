import React, {Component} from 'react';
import PopupForTextarea from "./PopupForTextarea";
// import Popup from "./Popup";
import Popup from 'reactjs-popup';

class BoxWithTextArea extends Component<any, any> {
  mouseDown = false;
  pageX = -1;
  pageY = -1;

  constructor(props) {
    super(props);

    this.state = {
      width: 200,
      height: 100,
      isShowPopup: false,
      left: props.left,
      top: props.top,
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
  }

  onMouseMove = (e) => {
    console.log('mouse move')
    if(!this.mouseDown)
      return;

    // const movementX = e.pageX - this.pageX;
    // const movementY = e.pageY - this.pageY;

    const movementX = e.movementX;
    const movementY = e.movementY;

    this.pageX = e.pageX;
    this.pageY = e.pageY;

    let {boxIndex, left, top, updateMarkerPos} = this.props;
    // let {left, top} = this.state;
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
    updateMarkerPos(boxIndex, left, top);
  }
  onMouseUp = (e) => {
    this.mouseDown = false;
  }
  onMouseLeave = (e) => {
    this.mouseDown = false;
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

  handleDoubleClick = (e) => {
    this.popup.open = true;
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

    // console.log('rendering BoxWithTextArea', fontFamily, fontSize);

    const { isShowPopup } = this.state;
    const { backgroundColor } = users[signerIndex];

    const box = (
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
          zIndex: 20,
          backgroundColor: '#fff'
        }}
        // onMouseDown={this.onMouseDown}
        // onMouseMove={this.onMouseMove}
        // onMouseUp={this.onMouseUp}
        // onMouseLeave={this.onMouseLeave}
        onDoubleClick={this.handleDoubleClick}
      >
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
         onDoubleClick={this.showPopup}
        >
          {/* <input type='text' */}
          <textarea
            disabled={true}
          
            style={{
              width: `${width}px`,
              height: `${height}px`,
              resize: 'none',
              fontFamily: fontFamily,
              fontSize: fontSize,
              boxSizing: 'border-box'
            }}
            placeholder="텍스트"
          />
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
    );
    
    return (

      <Popup 
        trigger={box} 
        position="top"
        contentStyle={{
          padding: '0px',
          borderRadius: '10px',
          overflow: 'hidden'
        }}
        // on='click'
        on='never'
        open={false}
        ref={ref => this.popup = ref}
        // closeOnDocumentClick={false}
      >
        {close => (
          <PopupForTextarea
            setFontSize={setFontSize}
            setFontFamily={setFontFamily}
            deleteTextArea={deleteTextArea}
            boxIndex={boxIndex}
            fontFamily={this.props.fontFamily}
            fontSize={this.props.fontSize}
            
          />
        )}
      </Popup>


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