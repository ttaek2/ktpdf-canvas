import * as React from "react";
import { CheckInput, Input, MemoInput, RadioInput, SignInput, TextInput } from "src/interface/Input";
import PlainBoxForCheckbox from "./PlainBoxForCheckbox";
import PlainBoxForMemo from "./PlainBoxForMemo";
import PlainBoxForRadio from "./PlainBoxForRadio";
import PlainBoxForSignature from "./PlainBoxForSignature";
import PlainBoxForTextArea from "./PlainBoxForTextArea";

const styles: React.CSSProperties = {
  width: '100%',
  height: '100%',
  position: "relative"
};

interface IBoxContainerProps {
  users: any;
  inputs: Array<Input>;
  updateTextArea: (...args) => void;
  controlSignLayer: (...args) => void;
  pageNumber: number;
  updateInputBox: (boxIndex: number, update: object) => void;
  deleteInputBox: (index: number) => void;
  scale: number;
  onInputboxAreaMouseUp: (e: React.MouseEvent) => void;
}

class PlainBoxContainer extends React.Component<IBoxContainerProps, React.ComponentState> {
  constructor(props) {
    super(props);

    this.state = {
      boxes: {}
    };
  }

  public render(): any {
    const {
      inputs,
      users,
      updateTextArea,
      controlSignLayer,
      pageNumber,
      scale,
    } = this.props;

    if(scale === undefined) {
      console.log('scale is undefined!')
      return null;
    }
    

    const userNm = users[0].signerNm;
    const currentSignerNo = users[0].signerNo;


    return(
      // <div className="inputbox-area"
      //   onMouseUp={this.props.onInputboxAreaMouseUp}
      // >
      <React.Fragment>
        {inputs.map((input, index) => {
          let editable = currentSignerNo == input.signerNo;
          if(input.inputType === 'memo' && input.eleId) { // db에서 가져온 메모
            editable = false;
          }

          if(pageNumber !== input.page) return null;

          if(input.inputType === 'memo') {
            return (
              <PlainBoxForMemo
                key={`memo-${index}`}
                boxIndex={index}
                input={input as MemoInput}
                updateTextArea={updateTextArea}
                editable={editable}
                updateInputBox={this.props.updateInputBox}
                deleteInputBox={this.props.deleteInputBox}
                scale={scale}
              />
            )
          }

          else if(input.inputType === 'text') {
            console.log('input type is text')
            return (
              <PlainBoxForTextArea
                key={`textarea-${index}`}
                boxIndex={index}
                input={input as TextInput}
                updateTextArea={updateTextArea}
                editable={editable}
                updateInputBox={this.props.updateInputBox}
                scale={scale}
              />
            )
          }

          else if(input.inputType === 'sign') {
            return (
              <PlainBoxForSignature
                key={`signature-${index}`}
                boxIndex={index}
                input={input as SignInput}
                controlSignLayer={controlSignLayer}
                editable={editable}
                scale={scale}
              />
            )
          }

          else if(input.inputType === 'checkbox') {
            return (
              <PlainBoxForCheckbox
                key={`checkbox-${index}`}
                boxIndex={index}
                input={input as CheckInput}
                updateTextArea={updateTextArea}
                editable={editable}
                scale={scale}
              />
            )
          }

          else if(input.inputType === 'radio') {
            return (
              <PlainBoxForRadio
                key={`radio-${index}`}
                boxIndex={index}
                input={input as RadioInput}
                updateTextArea={updateTextArea}
                editable={editable}
                scale={scale}
              />
            )
          }
        })}
      {/* </div> */}
      </React.Fragment>
    )
  }
}

export default PlainBoxContainer;
