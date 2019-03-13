import * as React from "react";
import SelectBox from "./SelectBox";

interface IPopup {
  setFontSize: (...args) => void;
  setFontFamily: (...args) => void;
  deleteTextArea: (...args) => void;
  boxIndex: number;
}

const fontFamilyList = ['Times-Roman', 'Courier-Bold', 'Dotum', 'Gulim', 'Batang', 'Gungsuh'];
const fontFamilyNmList = ['Times-Roman', 'Courier-Bold', '돋움', '굴림', '바탕', '궁서'];
const fontList=[
  {fontFamily: 'Times-Roman', fontName: 'Times-Roman'},
  {fontFamily: 'Courier-Bold', fontName: 'Courier-Bold'},
  {fontFamily: 'Dotum', fontName: '돋움'},
  {fontFamily: 'Gulim', fontName: '굴림'},
  {fontFamily: 'Batang', fontName: '바탕'},
  {fontFamily: 'Gungsuh', fontName: '궁서'},
]
const fontSizeList = [12, 14, 16, 18, 20, 24];



class PopupForTextarea extends React.Component<IPopup, React.ComponentState> {

  constructor(props) {
    super(props);

    this.updateFontSize = this.updateFontSize.bind(this);
    this.updateFontFamily = this.updateFontFamily.bind(this);
    this.deleteThisTextArea = this.deleteThisTextArea.bind(this);
  }

  updateFontSize({ datas, index }) {
    const { setFontSize, boxIndex } = this.props;
    const selectedFontSize = datas[index];
    setFontSize(boxIndex, selectedFontSize);
  }

  updateFontFamily({ datas, index }) {
    const { setFontFamily, boxIndex } = this.props;
    const selectedFontFamily = datas[index];
    setFontFamily(boxIndex, selectedFontFamily);
  }

  handleFontChange = (e) => {
    const {name, value} = e.target;
    const { setFontFamily, boxIndex } = this.props;
    setFontFamily(boxIndex, value);
  }

  handleFontSizeChange = (e) => {
    const {name, value} = e.target;
    const { setFontSize, boxIndex } = this.props;
    setFontSize(boxIndex, Number(value));
  }

  deleteThisTextArea() {
    const { boxIndex, deleteTextArea } = this.props;
    deleteTextArea(boxIndex);
  }

  render() {
    const {
      children,
    } = this.props;

    const hrStyle = {
      display: 'block',
      height: '1px',
      border: 0,
      borderTop: '1px solid #ccc',
      margin: '1em 0',
      padding: 0
    }
    return (
      <div style={{
        padding: '10px',
        margin: '0px',
        backgroundColor: '#eee'
      }}>
        <div style={{
          position: 'relative',
          zIndex: 11
        }}>
          크  기
          <select 
            style={{width: '100px', height: '22px', float: 'right'}}
            onChange={this.handleFontSizeChange}
            defaultValue={this.props.fontSize}
          >
            {fontSizeList.map(fontSize => 
              <option 
                value={fontSize}
              >{fontSize}</option>)}
          </select>

          {/* <SelectBox
            width={'90px'}
            option={fontFamilyNmList}
            datas={fontFamilyList}
            callback={this.updateFontFamily}
            defaultText={'글자체를 선택해주세요.'}
          /> */}
        </div>
        <hr style={hrStyle} />
        <div style={{
          position: 'relative',
          zIndex: 10
        }}>
          글자체
          <select 
            style={{width: '100px', height: '22px', float: 'right'}}
            onChange={this.handleFontChange}
            defaultValue={this.props.fontFamily}
          >
            {fontList.map(font => 
              <option 
                value={font.fontFamily}
              >{font.fontName}</option>)}
          </select>

          {/* <SelectBox
            width={'90px'}
            option={fontSizeList}
            datas={fontSizeList}
            callback={this.updateFontSize}
            defaultText={'글자 크기를 선택해주세요.'}
          /> */}
        </div>
        {/* <div style={{textAlign: 'center'}}>
          <button style={{width: '80%'}} onClick={this.deleteThisTextArea}>삭제</button>
        </div> */}
        {children}
      </div>
    );
  }
}

export default PopupForTextarea;