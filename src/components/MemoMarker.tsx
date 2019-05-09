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
  className: string;
  scale: number;
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
      gbnCd,
    } = this.props.input;

    const {editable, scale} = this.props;

    const editableStyle = {
      // fontFamily: `${font}`,
      // fontSize: `${Number(charSize) * scale}px`,
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

    const ptrHeight = 0.6; //rem
    const ptrWidth = 0.9; //rem
    const ptrTop = 0.8; //rem
    const ptrBottom = 0.5; //rem

    const ptrStyle: React.CSSProperties = {
      width: 0, 
      height: 0, 
      boxSizing: 'border-box',
      position: 'absolute',
      opacity: 0.9,
    }

    const ptrStyleLeftUp = {
      ...ptrStyle,
      borderTop: `${ptrHeight * 0.5 * scale}rem solid transparent`,
      borderBottom: `${ptrHeight * 0.5 * scale}rem solid transparent`,
      borderRight: `${ptrWidth * scale}rem solid #FFF2AB`,
      top: `${ptrTop * scale}rem`,
      left: `${(-ptrWidth + 0.05) * scale}rem`,
    }

    const ptrStyleLeftDown = {
      ...ptrStyle,
      borderTop: `${ptrHeight * 0.5 * scale}rem solid transparent`,
      borderBottom: `${ptrHeight * 0.5 * scale}rem solid transparent`,
      borderRight: `${ptrWidth * scale}rem solid #FFF2AB`,
      bottom: `${ptrBottom * scale}rem`,
      left: `${(-ptrWidth + 0.05) * scale}rem`,
    }

    const ptrStyleRightUp = {
      ...ptrStyle,
      borderTop: `${ptrHeight * 0.5 * scale}rem solid transparent`,
      borderBottom: `${ptrHeight * 0.5 * scale}rem solid transparent`,
      borderLeft: `${ptrWidth * scale}rem solid #FFF2AB`,
      top: `${ptrTop * scale}rem`,
      right: `${(-ptrWidth + 0.05) * scale}rem`,
    }

    const ptrStyleRightDown = {
      ...ptrStyle,
      borderTop: `${ptrHeight * 0.5 * scale}rem solid transparent`,
      borderBottom: `${ptrHeight * 0.5 * scale}rem solid transparent`,
      borderLeft: `${ptrWidth * scale}rem solid #FFF2AB`,
      bottom: `${ptrBottom * scale}rem`,
      right: `${(-ptrWidth + 0.05) * scale}rem`,
    }

    let ps = ptrStyleLeftUp;
    if(gbnCd === 'lu') ps = ptrStyleLeftUp;
    else if(gbnCd === 'ld') ps = ptrStyleLeftDown;
    else if(gbnCd === 'ru') ps = ptrStyleRightUp;
    else if(gbnCd === 'rd') ps = ptrStyleRightDown;

    return (
      <div style={{width: '100%', height: '100%'}} 
        // onMouseLeave={this.onMouseLeave}
        className={this.props.className}
      >
        <span
          style={ps}
        />


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

        <div
          className='memo-header' 
          style={{
            // width: '100%',
            // height: '18px',
            // position: 'absolute',
            // top: '-17px',
            // // border: `1px solid #ffc`,
            // // borderBottom: `2px solid orange`,
            // backgroundColor: `#ffc`,
            // color: 'black',
            // // borderRadius: '10px 10px 0 0',
            // textAlign: 'right',
            // // display: 'none',
          }}
        >
          <span
            style={{
              float: 'left',
              fontSize: '0.9em',
              // textDecoration: 'underline',
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
      </div>
    )
  }
}
