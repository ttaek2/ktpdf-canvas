import $ from 'jquery';
import * as React from "react";
import { IconContext } from "react-icons";
import { IoMdCloseCircle } from 'react-icons/io';
import { MemoInput } from "src/interface/Input";

interface IBoxForTextAreaProps {
  input: MemoInput;
  boxIndex: number;
  updateTextArea: (...args) => void;
  editable: boolean;
  updateInputBox: (boxIndex: number, update: object) => void;
  deleteInputBox: (index: number) => void;
}

export default class MemoMarker extends React.Component<IBoxForTextAreaProps, React.ComponentState> {

  constructor(props) {
    super(props);

    this.state = {
      text: ''
    };

    this.handleOnChange = this.handleOnChange.bind(this);
  }

  handleOnChange(e) {
    const { updateTextArea, boxIndex } = this.props;
    const val = e.target.value;
    updateTextArea(boxIndex, val);
  }

  onCloseBtnClick = (e) => {
    const {deleteInputBox, boxIndex} = this.props;
    deleteInputBox(boxIndex);
  }

  onMouseOver = (e) => {
    $(e.currentTarget).prev('.memo-header').show();
  }

  onMouseLeave = (e) => {
    $(e.currentTarget).find('.memo-header').hide();
  }

  render() {
    let {
      addText,
      font,
      charSize,
    } = this.props.input;

    const {editable} = this.props;

    const editableStyle = {
      width: '100%',
      height: '100%',
      resize: 'none',
      fontFamily: `${font}`,
      fontSize: `${charSize}px`,
      // boxSizing: 'border-box',
      // backgroundColor: 'white',
      // opacity: 0.7,
      // border: 'dotted 2px orange',
      textDecoration:'none',
      color:'#000',
      background:'#ffc',
      padding: 0,
      margin: 0,
      border: 'none',
      boxShadow: '5px 5px 7px rgba(33,33,33,.7)',
      opacity: 0.9,
    };

    const nonEditableStyle = {
      ...editableStyle,
      // border: 'none',
      // backgroundColor: 'rgba(0, 0, 0, 0.0)'
    };

    const closeicon = {
      color: "orange", 
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
      <div style={{width: '100%', height: '100%'}} 
        // onMouseLeave={this.onMouseLeave}
      >
        <div
          className='memo-header' 
          style={{
            width: '100%',
            height: '18px',
            position: 'absolute',
            top: '-17px',
            // border: `1px solid #ffc`,
            // borderBottom: `2px solid orange`,
            backgroundColor: `#ffc`,
            color: 'black',
            // borderRadius: '10px 10px 0 0',
            textAlign: 'right',
            // display: 'none',
          }}
        >
          <span
            style={{
              float: 'left',
              fontSize: '0.9em',
              textDecoration: 'underline',
            }}
          >{this.props.input.signerNo}님의 메모</span>
          
          {editable &&
            <span
              onClick={this.onCloseBtnClick}  
            >
              <IconContext.Provider value={closeicon}>
                <IoMdCloseCircle  />
              </IconContext.Provider>
            </span>
          }
          
        </div>
        
        <div
          style={{
            width: '100%',
            height: '100%',
            // position: 'relative',
          }}
          // onMouseOver={this.onMouseOver}
        >
          {/* <input type="text" */}
          <textarea
            className="memo"
            disabled={editable ? false : true}
            style={editable ? editableStyle : nonEditableStyle}
            onChange={this.handleOnChange}
            placeholder={editable ? "메모 입력" : undefined}
            value={addText}
          />
        </div>
      </div>
    )
  }
}
