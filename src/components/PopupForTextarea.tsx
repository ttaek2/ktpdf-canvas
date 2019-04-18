import * as React from "react";
import SelectBox from "./SelectBox";
import { fontList, fontSizeList } from '../util/fontCode';

interface IPopup {
  updateInputBox: (boxIndex: number, update: object) => void;
  boxIndex: number;
  fontFamily: string;
  fontSize: number;
}

// const fontFamilyList = ['Times-Roman', 'Courier-Bold', 'Dotum', 'Gulim', 'Batang', 'Gungsuh'];
// const fontFamilyNmList = ['Times-Roman', 'Courier-Bold', '돋움', '굴림', '바탕', '궁서'];
// const fontList=[
//   // {fontFamily: 'Times-Roman', fontName: 'Times-Roman'},
//   // {fontFamily: 'Courier-Bold', fontName: 'Courier-Bold'},
//   // {fontFamily: 'Dotum', fontName: '돋움'},
//   // {fontFamily: "'Noto Sans KR', sans-serif", fontName: '본고딕'},
//   // {fontFamily: "'Noto Serif KR', serif", fontName: '본명조'},
//   // {fontFamily: 'Malgun', fontName: '맑은 고딕'},
//   {fontFamily: 'Batang', fontName: '바탕'},
//   {fontFamily: 'Gulim', fontName: '굴림'},
//   // {fontFamily: 'Batang', fontName: '바탕'},
//   // {fontFamily: 'Gungsuh', fontName: '궁서'},
// ]
// const fontSizeList = [12, 14, 16, 18, 20, 24];



class PopupForTextarea extends React.Component<IPopup, React.ComponentState> {

  constructor(props) {
    super(props);

    // this.updateFontSize = this.updateFontSize.bind(this);
    // this.updateFontFamily = this.updateFontFamily.bind(this);
    // this.deleteThisTextArea = this.deleteThisTextArea.bind(this);
  }

  // updateFontSize({ datas, index }) {
  //   const { updateInputBox, boxIndex } = this.props;
  //   const selectedFontSize = datas[index];
  //   updateInputBox(boxIndex, {fontSize: selectedFontSize} );
  // }

  // updateFontFamily({ datas, index }) {
  //   const { updateInputBox, boxIndex } = this.props;
  //   const selectedFontFamily = datas[index];
  //   updateInputBox(boxIndex, {fontFamily: selectedFontFamily} );
  // }

  handleFontChange = (e) => {
    const {name, value} = e.target;
    const { updateInputBox, boxIndex } = this.props;
    updateInputBox(boxIndex, {fontFamily: value, font: value} );
  }

  handleFontSizeChange = (e) => {
    const {name, value} = e.target;
    const { updateInputBox, boxIndex } = this.props;
    updateInputBox(boxIndex, {fontSize: Number(value), charSize: Number(value)} );
  }

  // deleteThisTextArea() {
  //   const { boxIndex, deleteTextArea } = this.props;
  //   deleteTextArea(boxIndex);
  // }

  render() {
    const {
      children,
    } = this.props;

    const hrStyle = {
      display: 'block',
      height: '1px',
      border: 0,
      borderTop: '1px solid #ccc',
      // margin: '1em 0',
      padding: 0,
      margin: 0,
    }
    return (
      <React.Fragment>
        <div style={{
          // position: 'relative',
          // zIndex: 11,
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
          // position: 'relative',
          // zIndex: 10,
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