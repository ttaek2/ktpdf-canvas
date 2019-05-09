import React, { Component } from 'react';
import { CheckBox, InputBox, RadioBox, SignBox, TextBox } from 'src/interface/InputBox';
import { ISigner } from 'src/interface/ISigner';
import CheckboxMarker from './CheckboxMarker';
import RadioMarker from './RadioMarker';
import SignatureMarker from './SignatureMarker';
import TextMarker from './TextMarker';

interface Props {
  inputbox: InputBox;
  users: Array<ISigner>;
  scale: number;
}

export default class NewInputbox extends Component<Props, null> {

  constructor(props: Props) {
    super(props);
  }

  render() {
    const {
      inputbox,
      users,
      scale,
    } = this.props;

    return (
        <div
            style={{
                width: inputbox.width,
                height: inputbox.height,
                left: inputbox.left,
                top: inputbox.top,
                position: 'absolute',
                zIndex: 100000,
                pointerEvents: 'none',
            }}
        >
            {inputbox.type === 'text' && 
                <TextMarker
                  boxData={inputbox as TextBox}
                  users={users}
                  updateInputBox={undefined}
                  deleteInputBox={undefined}
                  onDoubleClick={undefined}
                  className={`new-text-marker`}
                  scale={scale}
                />
            }  
            

            {inputbox.type === 'sign' &&
                <SignatureMarker
                    boxData={inputbox as SignBox}
                    users={users}
                    updateInputBox={undefined}
                    deleteInputBox={undefined}
                    className={`new-signature-marker`}
                />
            }

            {inputbox.type === 'checkbox' &&
                <CheckboxMarker
                    boxData={inputbox as CheckBox}
                    users={users}
                    updateInputBox={undefined}
                    deleteInputBox={undefined}
                    className={`new-checkbox-marker`}
                />
            }

            {inputbox.type === 'radio' &&
                <RadioMarker
                    boxData={inputbox as RadioBox}
                    users={users}
                    updateInputBox={undefined}
                    deleteInputBox={undefined}
                    className={`new-radio-marker`}
                    width={inputbox.width}
                    height={inputbox.height}
                />
            }
          </div>
    );
  }
}
