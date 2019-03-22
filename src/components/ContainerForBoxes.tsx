import React, {Component} from 'react';
import BoxWithTextArea from "./BoxWithTextArea";
import BoxWithSignature from "./BoxWithSignature";
import { InputBox, TextBox, SignBox, CheckBox, RadioBox } from 'src/interface/InputBox';
import { ISigner } from 'src/interface/ISigner';
import BoxWithCheckbox from './BoxWithCheckbox';
import BoxWithRadio from './BoxWithRadio';

interface Props {
  boxDataList: Array<InputBox>;
  updateInputBox: (boxIndex: number, update: object) => void;
  deleteInputBox: (index: number) => void;
  users: Array<ISigner>;
  page: number;
  scale: number;
}

class ContainerForBoxes extends Component<Props, null> {

  constructor(props: Props) {
    super(props);
  }

  render() {
    const {
      boxDataList,
      updateInputBox,
      deleteInputBox,
      page,
      users,
      scale
    } = this.props;

    return (
      <div style={{width: '100%', height: '100%'}}>
        {
          boxDataList.map(box => {
            
            if(box.type === 'text') {
              return(
                <BoxWithTextArea
                  key={`${box.boxIndex}${box.type}`}
                  boxData={box as TextBox}
                  users={users}
                  updateInputBox={updateInputBox}
                  deleteInputBox={deleteInputBox}
                  scale={scale}
                />
              )
            }

            else if(box.type === 'sign') {
              return(
                <BoxWithSignature
                  key={`${box.boxIndex}${box.type}`}
                  boxData={box as SignBox}
                  users={users}
                  updateInputBox={updateInputBox}
                  deleteInputBox={deleteInputBox}
                  scale={scale}
                />
              )
            }

            else if(box.type === 'checkbox') {
              return (
                <BoxWithCheckbox
                  key={`${box.boxIndex}${box.type}`}
                  boxData={box as CheckBox}
                  users={users}
                  updateInputBox={updateInputBox}
                  deleteInputBox={deleteInputBox}
                  scale={scale}
                />
              )
            }

            else if(box.type === 'radio') {
              return (
                <BoxWithRadio
                  key={`${box.boxIndex}${box.type}`}
                  boxData={box as RadioBox}
                  users={users}
                  updateInputBox={updateInputBox}
                  deleteInputBox={deleteInputBox}
                  scale={scale}
                />
              )
            }
          })
        }
      </div>
    );
  }
}

export default ContainerForBoxes;