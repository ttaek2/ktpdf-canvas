import * as React from "react";
import PlainBox from "./PlainBox";
import PlainBoxForTextArea from "./PlainBoxForTextArea";
import PlainBoxForSignature from "./PlainBoxForSignature";
import PlainBoxForCheckbox from "./PlainBoxForCheckbox";
import PlainBoxForRadio from "./PlainBoxForRadio";

const styles: React.CSSProperties = {
  width: '100%',
  height: '100%',
  position: "relative"
};

interface IBoxContainerProps {
  users: any;
  inputs: any;
  updateTextArea: (...args) => void;
  controlSignLayer: (...args) => void;
  pageNumber: number;
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
      pageNumber
    } = this.props;

    const userNm = users[0].signerNm;
    const currentSignerNo = users[0].signerNo;

    return(
      <div style={styles}>
        {inputs.map((input, index) => {
          const {
            inputType,
            x,
            y,
            w,
            h,
            charSize,
            font,
            signUrl,
            addText,
            page: inputPageNumber,
            signerNo
          } = input;

          const editable = currentSignerNo == signerNo;

          if(pageNumber !== inputPageNumber) return null;



          return (
            <PlainBox
              left={x}
              top={y}
              key={index}
            >
              {inputType === 'text'
              && <PlainBoxForTextArea
                boxIndex={index}
                backgroundColor={''}
                color={''}
                name={userNm}
                w={w}
                h={h}
                font={font}
                charSize={charSize}
                updateTextArea={updateTextArea}
                addText={addText}
                editable={editable}
              />}
              {inputType === 'sign'
              && <PlainBoxForSignature
                backgroundColor={''}
                color={''}
                name={userNm}
                boxIndex={index}
                w={w}
                h={h}
                controlSignLayer={controlSignLayer}
                signUrl={signUrl}
                editable={editable}
              />}
              {inputType === 'checkbox'
              && <PlainBoxForCheckbox
                backgroundColor={''}
                color={''}
                name={userNm}
                boxIndex={index}
                w={w}
                h={h}
                updateTextArea={updateTextArea}
                addText={addText}
                editable={editable}
              />}
              {inputType === 'radio'
              && <PlainBoxForRadio
                backgroundColor={''}
                color={''}
                name={userNm}
                boxIndex={index}
                w={w}
                h={h}
                updateTextArea={updateTextArea}
                addText={addText}
                editable={editable}
              />}
            </PlainBox>
          )
        })}
      </div>
    )
  }
}

export default PlainBoxContainer;
