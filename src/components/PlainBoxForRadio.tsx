import * as React from "react";
import {IoMdCheckmark} from 'react-icons/io';
import { IconContext } from "react-icons";
import {IoMdRadioButtonOn, IoMdRadioButtonOff} from 'react-icons/io';
import { RadioInput } from "src/interface/Input";

interface IBoxForCheckboxProps {
  input: RadioInput;
  updateTextArea: (...args) => void;
  boxIndex: number;
  editable: boolean;
  scale: number;
}

class PlainBoxForRadio extends React.Component<IBoxForCheckboxProps, React.ComponentState> {

  constructor(props) {
    super(props);

    this.state = {
      checked: !!this.props,
    }
  }

  toggleCheckbox = (e) => {
    
    const {input, updateTextArea, boxIndex} = this.props;
    const {addText: checked} = input;
    console.log('toggleCheckbox')
    console.log(checked, boxIndex)
    updateTextArea(boxIndex, !checked);
  }

  checkFirstRadioButton = e => {
    console.log('checkFirstRadioButton')
    const {updateTextArea, boxIndex} = this.props;
    updateTextArea(boxIndex, '1');
  }

  checkSecondRadioButton = e => {
    console.log('checkSecondRadioButton')
    const {updateTextArea, boxIndex} = this.props;
    updateTextArea(boxIndex, '2');
  }

  doNothing = () => {

  }

  render() {
    let {
      x,
      y,
      w,
      h,
    } = this.props.input;

    const {editable, scale, focused} = this.props;

    x *= scale;
    y *= scale;
    w *= scale;
    h *= scale;

    const checkicon = {
      // color: backgroundColor, 
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

    const nonEditableStyle = {
      position: 'absolute',
      left: x,
      top: y,
      width: w,
      height: h,
      border: 'none',
      backgroundColor: 'rgba(0, 0, 0, 0.0)',
    };

    const editableStyle = {
      ...nonEditableStyle,
      // border: '1px solid #000',
      // backgroundColor: backgroundColor ? backgroundColor : '#fff',
      opacity: 0.7,
      // border: 'dotted 2px black',
    }

    const radioiconHorizontal = {
      // color: backgroundColor, 
      // className: focused ? 'focused-input' : undefined,
    //   size: "100%",
      padding: 0,
      margin: 0,
      style: {
        position: 'absolute',
        top: '0px',
        height: '100%',
        width: `${h}px`,
      }
    }

    const radioiconVertical = {
      // color: backgroundColor, 
      // className: focused ? 'focused-input' : undefined,
    //   size: "100%",
      padding: 0,
      margin: 0,
      style: {
        position: 'absolute',
        left: '0px',
        height: `${w}px`,
        width: '100%',
      }
    }

    const radioiconLeft = {
        ...radioiconHorizontal,
        style: {
            ...radioiconHorizontal.style,
            left: '0px',
        }
    }

    const radioiconRight = {
        ...radioiconHorizontal,
        style: {
            ...radioiconHorizontal.style,
            right: '0px',
        }
    }

    const radioiconTop = {
      ...radioiconVertical,
      style: {
          ...radioiconVertical.style,
          top: '0px',
      }
    }

    const radioiconBottom = {
      ...radioiconVertical,
      style: {
          ...radioiconVertical.style,
          bottom: '0px',
      }
    }

    let radioiconFirst, radioiconSecond;
    if(w > h) {
      radioiconFirst = radioiconLeft;
      radioiconSecond = radioiconRight;
    } else {
      radioiconFirst = radioiconTop;
      radioiconSecond = radioiconBottom;
    }

    const {addText: radioSelection} = this.props.input;
    
    return (
      
      <div
        style={editable ? editableStyle : nonEditableStyle}
        // onClick={editable ? this.toggleCheckbox : this.doNothing}
        className={focused ? 'focused-input' : undefined}
      >
        {radioSelection == '1' 
        ? (
          <IconContext.Provider value={radioiconFirst}>
            <IoMdRadioButtonOn 
              onClick={this.checkFirstRadioButton}
            />
          </IconContext.Provider>
        )
        : (
          <IconContext.Provider value={radioiconFirst}>
            <IoMdRadioButtonOff 
              onClick={this.checkFirstRadioButton}
            />
          </IconContext.Provider>
        )}
        
        {radioSelection == '2' 
        ? (
          <IconContext.Provider value={radioiconSecond}>
            <IoMdRadioButtonOn 
              onClick={this.checkSecondRadioButton}
            />
          </IconContext.Provider>         
        )
        : ( 
          <IconContext.Provider value={radioiconSecond}>
            <IoMdRadioButtonOff 
              onClick={this.checkSecondRadioButton}
            />
          </IconContext.Provider>         
        )}
        
      </div>
    );
  }
}

export default PlainBoxForRadio;
