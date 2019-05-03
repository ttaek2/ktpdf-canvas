import * as React from "react";
import SelectBox from "./SelectBox";
import { fontList, fontSizeList } from '../util/fontCode';

interface IPopup {
  updateInputBox: (boxIndex: number, update: object) => void;
  boxIndex: number;
  fontFamily: string;
  fontSize: number;
}

class PopupForTextarea extends React.Component<IPopup, React.ComponentState> {

  constructor(props) {
    super(props);
  }

  handleFontChange = (e) => {
    const {name, value} = e.target;
    const { updateInputBox, boxIndex } = this.props;
    // 생성자 화면 및 서명자 화면에서 모두 호출되어야하는데 각 화면에서 글자체 변수명이 fontFamily 와 font 로 달라서 둘다 업데이트함
    updateInputBox(boxIndex, {fontFamily: value, font: value} );
  }

  handleFontSizeChange = (e) => {
    const {name, value} = e.target;
    const { updateInputBox, boxIndex } = this.props;
    // 생성자 화면 및 서명자 화면에서 모두 호출되어야하는데 각 화면에서 글자크기 변수명이 fontSize 와 charSize 로 달라서 둘다 업데이트함
    updateInputBox(boxIndex, {fontSize: Number(value), charSize: Number(value)} );
  }

  render() {

    const hrStyle = {
      display: 'block',
      height: '1px',
      border: 0,
      borderTop: '1px solid #ccc',
      padding: 0,
      margin: 0,
    }
    return (
      <React.Fragment>
        <div style={{
          height: '40px',
          padding: '10px',
        }}>
          <span 
            style={{float: 'left'}}
          >크  기</span>
          
          <select 
            style={{width: '80px', float: 'right'}}
            onChange={this.handleFontSizeChange}
            defaultValue={this.props.fontSize + ''}
          >
            {fontSizeList.map((fontSize, index) => 
              <option 
                key={`fontsize-option-${index}`}
                value={fontSize}
              >{fontSize}</option>)}
          </select>
        </div>
        <hr style={hrStyle} />
        <div style={{
          height: '40px',
          padding: '10px',
        }}>
          <span style={{float: 'left'}}>글자체</span>
          
          <select 
            style={{width: '80px', float: 'right'}}
            onChange={this.handleFontChange}
            defaultValue={this.props.fontFamily}
          >
            {fontList.map((font, index) => 
              <option 
                key={`font-option-${index}`}
                value={font.fontFamily}
              >{font.fontName}</option>)}
          </select>
        </div>
      </React.Fragment>
    );
  }
}

export default PopupForTextarea;