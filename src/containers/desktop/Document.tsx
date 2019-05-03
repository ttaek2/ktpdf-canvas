import $ from 'jquery';
import * as React from "react";
import { CheckBox, InputBox, RadioBox, SignBox, TextBox } from "src/interface/InputBox";
import NewInputbox from '../../../src/components/NewInputBox';
import { setDocumentInfo } from "../../api/document/setDocumentInfo";
import ContainerForBoxes from "../../components/ContainerForBoxes";
import { ISigner } from "../../interface/ISigner";
import { fontList, fontSizeList } from '../../util/fontCode';
import PdfViewer from "./PdfViewer";



// 입력박스 카운터 - 새 입력박스의 boxIndex를 할당하는데 사용됨
let boxCnt = 0;

// 입력박스 기본값
const defaultData = {
  width: 200,
  height: 100,
  fontSize: fontSizeList[0],
  fontFamily: fontList[0].fontFamily,
  top: 50,
  textLeft: 0,
  signLeft: 250,
  boxIndex: -1,
  textboxMinWidth: 50,
  signboxMinWidth: 50,
  checkboxMinWidth: 20,
  radioboxMinWidth: 20,
};

const getInitTextBox = (page, signerIndex): TextBox => {
  return {
    type: 'text',
    top: defaultData.top,
    left: defaultData.textLeft,
    fontSize: defaultData.fontSize,
    fontFamily: defaultData.fontFamily,
    width: 150,
    height: 16,
    signerIndex,
    page,
    boxIndex: boxCnt++,
    minWidth: defaultData.textboxMinWidth,
    minHeight: undefined,
    maxWidth: undefined,
    maxHeight: undefined,
  }
}
const getInitSignBox = (page, signerIndex): SignBox => {
  return {
    type: 'sign',
    top: defaultData.top,
    left: defaultData.signLeft,
    width: 50,
    height: 50,
    signerIndex,
    page,
    boxIndex: boxCnt++,
    minWidth: defaultData.signboxMinWidth,
    minHeight: undefined,
    maxWidth: undefined,
    maxHeight: undefined,
  }
}
const getInitCheckBox = (page, signerIndex): CheckBox => {
  return {
    type: 'checkbox',
    top: defaultData.top,
    left: defaultData.signLeft,
    width: 20,
    height: 20,
    signerIndex,
    page,
    boxIndex: boxCnt++,
    minWidth: defaultData.checkboxMinWidth,
    minHeight: undefined,
    maxWidth: undefined,
    maxHeight: undefined,
  }
}

const getInitRadioBox = (page, signerIndex): RadioBox => {
  return {
    type: 'radio',
    top: defaultData.top,
    left: defaultData.signLeft,
    width: 100,
    height: 20,
    signerIndex,
    page,
    boxIndex: boxCnt++,
    minWidth: defaultData.radioboxMinWidth,
    minHeight: undefined,
    maxWidth: undefined,
    maxHeight: undefined,
  }
}
const roadInitTextBox = (input): TextBox => {
  return {
    type: 'text',
    top: input.y,
    left: input.x,
    fontSize: input.charSize,
    fontFamily: input.font,
    width: input.w,
    height: input.h,
    signerIndex:0,  // 생성자꺼...
    page: input.page,
    boxIndex: boxCnt++,
    minWidth: defaultData.textboxMinWidth,
    minHeight: undefined,
    maxWidth: undefined,
    maxHeight: undefined,
  }
}

const roadInitSignBox = (input): SignBox => {
  return {
    type: 'sign',
    top: input.y,
    left: input.x,    
    width: input.w,
    height: input.h,
    signerIndex:0,  // 생성자꺼...
    page: input.page,
    boxIndex: boxCnt++,
    minWidth: defaultData.signboxMinWidth,
    minHeight: undefined,
    maxWidth: undefined,
    maxHeight: undefined,
  }
}

const roadInitCheckBox = (input): CheckBox => {
  return {
    type: 'checkbox',
    top: input.y,
    left: input.x,    
    width: input.w,
    height: input.h,
    signerIndex:0,  // 생성자꺼...
    page: input.page,
    boxIndex: boxCnt++,
    minWidth: defaultData.checkboxMinWidth,
    minHeight: undefined,
    maxWidth: undefined,
    maxHeight: undefined,
  }
}




interface IDocumentProps {
  documentNo: string;
  documentUrl: string;
  signerList: Array<ISigner>;
  docName: string;
  fileName: string;
  userId: string;  
  inputs: [];
}

class DocumentContainer extends React.Component<IDocumentProps, React.ComponentState> {

  constructor(props) {
    super(props);
    this.state = {
      numPages: null, // pdf 총페이지수
      pageNumber: 1, // 현재페이지
      boxDataList: [], // 입력박스 리스트
      // scale: 1.5,
      scale: undefined, // pdf 로드후 pdf가로길이 및 화면너비에 따라 scale 계산하도록 수정함(PdfViewer.tsx - onPageLoadSuccess() 에 구현)
      selectSignerIndex: -1, // 선택서명자      
      newInputBox: null, // 새 입력박스(마우스로 끌어다 배치시)
    };

    this.checkSelectedValue = this.checkSelectedValue.bind(this);
    this.updateInputBox = this.updateInputBox.bind(this);
    this.deleteInputBox = this.deleteInputBox.bind(this);
    this.newInputBox = this.newInputBox.bind(this);
    this.setSelectedIndex = this.setSelectedIndex.bind(this);
    this.updateDocumentInfo = this.updateDocumentInfo.bind(this);


    this.roadInputData = this.roadInputData.bind(this);
  }

  componentDidMount() {
    console.log("Document.tsx ============================== componentDidMount ");

    // tmpDocId를 통해 조회한 객체가 있다면 표시
    const {inputs} = this.props;
    
    if(inputs != undefined){
      if(inputs.length>0){
        this.roadInputData(inputs);
      }
    }
  }


  componentWillUnmount() {
  
  }



  componentDidUpdate(_, prevState): void {
  
  }


  private checkSelectedValue(): boolean {
    const {selectSignerIndex} = this.state;
    if (selectSignerIndex && selectSignerIndex > -1) return true;

    alert('작성자 또는 생성자를 선택하지 않았습니다.');
    return false;
  }

  // 마우스 위치에 새 입력박스 추가
  private newInputBox(type, mouseX, mouseY) {
    
    if(this.state.newInputBox) {
      return;
    }

    const {
      boxDataList,
      pageNumber,
      selectSignerIndex,
    } = this.state;
    const isSelected = this.checkSelectedValue();
    if (!isSelected) {
      return false;
    }

    

    const copyBoxDataList = [...boxDataList];

    
    let initBoxData;
    if(type === 'text') {
      initBoxData = getInitTextBox(pageNumber, selectSignerIndex);
    }
    else if(type === 'sign') {
      initBoxData = getInitSignBox(pageNumber, selectSignerIndex);
    }
    else if(type === 'checkbox') {
      initBoxData = getInitCheckBox(pageNumber, selectSignerIndex);
    }
    else if(type === 'radio') {
      initBoxData = getInitRadioBox(pageNumber, selectSignerIndex);
    }

    

    initBoxData.left = mouseX;
    initBoxData.top = mouseY;

    console.log(initBoxData)

    this.setState( {
      newInputBox: initBoxData
    })


    // copyBoxDataList.push(initBoxData);

    // this.setState({
    //   boxDataList: copyBoxDataList,
    // });
  }

  // 새 입력박스를 pdf 위에 바로배치
  private newInputBox2(type) {
      
    const {
      boxDataList,
      pageNumber,
      selectSignerIndex,
      scale,
    } = this.state;

    // 참여자 선택여부 확인
    const isSelected = this.checkSelectedValue();
    if (!isSelected) {
      return false;
    }

    

    const copyBoxDataList = [...boxDataList];

    
    let initBoxData;
    if(type === 'text') {
      initBoxData = getInitTextBox(pageNumber, selectSignerIndex);
    }
    else if(type === 'sign') {
      initBoxData = getInitSignBox(pageNumber, selectSignerIndex);
    }
    else if(type === 'checkbox') {
      initBoxData = getInitCheckBox(pageNumber, selectSignerIndex);
    }
    else if(type === 'radio') {
      initBoxData = getInitRadioBox(pageNumber, selectSignerIndex);
    }

    let width = initBoxData.width;
    let height = initBoxData.height;
    let left = $('.page-wrapper').width() / 2 / scale - width / 2; // 가로 : pdf 페이지 가운데 배치
    let top = $('.editor-view').scrollTop() / scale + 150; // 세로 : 현재 보이는 화면위치에 배치
    
    initBoxData.left = left;
    initBoxData.top = top;
    initBoxData.width = width;
    initBoxData.height = height;

    copyBoxDataList.push(initBoxData);

    this.setState({
      boxDataList: copyBoxDataList,
    });
  }

  addInputbox = (inputbox: InputBox) => {
    const copy = [...this.state.boxDataList];
    copy.push(inputbox);
    this.setState({
      boxDataList: copy,
      newInputBox: null,
    })
  }

  
  private deleteInputBox(index: number): void {
    const { boxDataList } = this.state;
    const newBoxDataList = boxDataList.filter((box) => {
      const boxIndex = box.boxIndex;
      return boxIndex !== index;
    });

    this.setState({boxDataList: newBoxDataList});
  }

  private updateInputBox(boxIndex: number, update: object) {
    console.log('Document.tsx updateInputBox');
    const {boxDataList} = this.state;
    const newBoxDataList = boxDataList.map(box => {
      if(box.boxIndex === boxIndex) {
        return {
          ...box,
          ...update
        }
      }

      return box;
    });

    this.setState({boxDataList: newBoxDataList});
  }

  private setSelectedIndex({index: selectSignerIndex}) {
    this.setState({selectSignerIndex});
  }

  private convertDataForAPI(boxDataList) {
    const {
      signerList,
    } = this.props;


    const textAreaList = boxDataList.filter(({ type }) => type === 'text');
    const textAreaListFormatted = textAreaList.map(data => {
      const {
        fontFamily,
        fontSize,
        top,
        left,
        page,
        signerIndex,
        width,
        height
      } = data;

      const x = left;
      const y = top;
      const w = width;
      const h = height;


      return {
        inputType: 'text',
        font: fontFamily,
        charSize: fontSize,
        page,
        // signerNo: signerList[signerIndex].signerNo,
        signerNo: signerList[signerIndex].signerId,
        x,
        y,
        w,
        h
      }
    });

    const signatureAreaList = boxDataList.filter(({ type }) => type === 'sign');
    const signatureAreaListFormatted = signatureAreaList.map(data => {
      const {
        top,
        left,
        page,
        signerIndex,
        width,
        height
      } = data;

      const x = left;
      const y = top;
      const w = width;
      const h = height;

      return {
        inputType: 'sign',
        page,
        // signerNo: signerList[signerIndex].signerNo,
        signerNo: signerList[signerIndex].signerId,
        x,
        y,
        w,
        h
      }
    });

    const checkboxList = boxDataList.filter(({ type }) => type === 'checkbox');
    const checkboxListFormatted = checkboxList.map(data => {
      const {
        top,
        left,
        page,
        signerIndex,
        width,
        height
      } = data;

      const x = left;
      const y = top;
      const w = width;
      const h = height;

      return {
        inputType: 'checkbox',
        page,
        // signerNo: signerList[signerIndex].signerNo,
        signerNo: signerList[signerIndex].signerId,
        x,
        y,
        w,
        h
      }
    });

    const radioList = boxDataList.filter(({ type }) => type === 'radio');
    const radioListFormatted = radioList.map(data => {
      const {
        top,
        left,
        page,
        signerIndex,
        width,
        height
      } = data;

      const x = left;
      const y = top;
      const w = width;
      const h = height;

      return {
        inputType: 'radio',
        page,
        // signerNo: signerList[signerIndex].signerNo,
        signerNo: signerList[signerIndex].signerId,
        x,
        y,
        w,
        h
      }
    });

    console.log('radioListFormatted ========================= ')
    console.log(radioListFormatted)

    return [].concat(textAreaListFormatted, signatureAreaListFormatted, checkboxListFormatted, radioListFormatted);
  }

  validationCheck = () => {
    // 모든 서명자의 서명박스가 배치됐는지 확인
    const {boxDataList} = this.state;
    const {signerList} = this.props;
    let set = new Set();
    boxDataList.forEach((boxData) => {
      if(boxData.type === 'sign') {
        set.add(boxData.signerIndex);
      }
    });
    // return 서명박스가 배치된 서명자수 == 서명자수
    return set.size === signerList.length;
  }

  // 저장처리
  private updateDocumentInfo() {
    const {documentNo, docName, fileName, documentUrl, userId} = this.props;
    const {boxDataList} = this.state;

    if(!this.validationCheck()) {
      alert('모든 계약참여자의 서명위치를 지정해야 합니다.');
      return;
    }

    // console.log('boaDataList', boxDataList)
    const dataList = this.convertDataForAPI(boxDataList); 
    
    // 유저리스트의 싸인박스가 있는지 체크
    // console.log(signerList);
    console.log('dataList', dataList);
    
    // 싸인 객체만 추출
    const signObj = dataList.filter(function(item){
      return item.inputType == "sign";
    });

    // if(signObj.length < 1){
    //   alert('서명은 필수입니다.');
    //   return;
    // } 

    // 모든 사용자의 서명을 체크하는 로직 필요.

    // signerList.forEach((signer, index) => {
    //   // console.log(signObj.indexOf('signer1'));

    //   const chkSign = signObj.filter(function(item){
    //     return item.signerNo == signer.signerId;
    //   });

    //   if(chkSign.length < 1){
    //     alert(signer.signerNm + ' 의 서명이 없습니다.');
    //     return;
    //   }
    // });

    
    let result:[];
    // setDocumentInfo(documentNo, docName, fileName, documentUrl, userId, dataList).then(_ => {
    //   alert('저장 완료');
    // });
    setDocumentInfo(documentNo, docName, fileName, documentUrl, userId, dataList).then((result:any)  => {    
      // console.log(result);  
      if(result.code == '200'){
        alert('저장 완료');
      }else{
        alert('저장 처리중 에러 : ' + result.code);
      }
      return result;
    });

    return result;
  }



  onSelectionChange = (e) => {
    const index = e.target.value;
    this.setSelectedIndex({index});
  }

  // 새 입력박스가 pdf 위에 배치전 마우스 커서를 따라가도록 하는 이벤트 핸들러
  handleMouseMove = (e: React.MouseEvent) => {
    const {newInputBox} = this.state;
    if(!newInputBox) {
      return;
    }
    
    this.setState({
      newInputBox: {
        ...newInputBox,
        left: e.pageX,
        top: e.pageY
      }
    })
  }

  private roadInputData(inputs:any) {
    // console.log(" ================= ");
    // console.log(inputs);
    const {boxDataList} = this.state;

    
    const copyBoxDataList = [...boxDataList];
    
    inputs.forEach((input, index) => {      
      if(input.inputType == 'text'){
        const initBoxData = roadInitTextBox(input);
        copyBoxDataList.push(initBoxData);
      }else if(input.inputType == 'sign'){
        const initBoxData = roadInitSignBox(input);
        copyBoxDataList.push(initBoxData);
      }else if(input.inputType == 'checkbox'){
        const initBoxData = roadInitCheckBox(input);
        copyBoxDataList.push(initBoxData);
      }
    });

    this.setState({
      boxDataList: copyBoxDataList,
    });
  }

  zoomIn = (e) => {
    this.setState({
      scale: this.state.scale * 1.1,
    })
  }
  zoomOut = (e) => {
    this.setState({
      scale: this.state.scale / 1.1,
    })
  }

  setScale = (scale) => {
    this.setState({scale})
  }

  // 마우스 커서 위치에 새 입력박스가 있는 상태에서 pdf 위를 클릭했을때 클릭위치에 입력박스 배치
  onInutboxAreaMouseUp = (e: React.MouseEvent) => {
    const {newInputBox, scale, pageNumber} = this.state;
    if(!newInputBox) {
      return;
    }
    console.log('drop the beat!!')
    let left = e.pageX - $(e.currentTarget).offset().left;
    let top = e.pageY - $(e.currentTarget).offset().top;
    let width = newInputBox.width;
    let height = newInputBox.height;
    
    left /= scale; 
    top /= scale; 
    width /= scale; 
    height /= scale;
    
    newInputBox.left = left;
    newInputBox.top = top;
    newInputBox.width = width;
    newInputBox.height = height;
    newInputBox.page = pageNumber;
    
    this.addInputbox(newInputBox);
  }

  onPageChange = (pageNumber: number) => {
    this.setState({pageNumber});
  }


  public render(): JSX.Element {
    // console.log('Document.tsx rendering document');

    const {
      pageNumber,
      boxDataList,
      scale,
      selectSignerIndex
    } = this.state;

    const { signerList } = this.props;


    const curPageInputBox = boxDataList.filter(box => box.page === pageNumber);
    console.log('curPageInputBox = ', curPageInputBox)

    return (
      <div className="container service">
        <div className='editor'
          onMouseMove={this.handleMouseMove}
        >
          {/* { 
          // 마우스로 끌어서 입력박스 배치시 사용
          this.state.newInputBox &&
          <NewInputbox
            inputbox={this.state.newInputBox}
            users={signerList}
            scale={scale}
          />
          } */}
          <div className='header'>
            <ul className="zoom">
              <li><a onClick={(e) => this.zoomIn(e)}><span className="icon-zoomin"></span></a></li>
              <li><a onClick={(e) => this.zoomOut(e)}><span className="icon-zoomout"></span></a></li>
            </ul>
          </div>
          <div className="edit-body">
            <PdfViewer documentUrl={this.props.documentUrl} scale={scale} onPageChange={this.onPageChange} pageNumber={pageNumber}
                       setScale={this.setScale}
            >
                        <ContainerForBoxes
                          updateInputBox={this.updateInputBox}
                          deleteInputBox={this.deleteInputBox}
                          boxDataList={curPageInputBox}
                          users={signerList}
                          page={pageNumber}
                          scale={scale}
                          onInutboxAreaMouseUp={this.onInutboxAreaMouseUp}
                        />
            </PdfViewer>

            <div className="edit-pallet">
              <div className="input-select secondary">
                <select
                  onChange={this.onSelectionChange}
                  style={selectSignerIndex >= 0 && signerList[selectSignerIndex] ? {color: signerList[selectSignerIndex].backgroundColor} : undefined}
                >
                  <option value="">참여자 지정</option>
                  {signerList.map((signer, index) => 
                    <option 
                      key={`signer-option-${index}`}
                      value={index}
                      style={{color: signer.backgroundColor}}
                    >{signer.signerNm}</option>  
                  )}
                </select>
              </div>
              <ul>
                {/* 새 입력박스를 pdf 위로 끌어다 배치 */}
                {/* <li><a onClick={e => this.newInputBox('text', e.pageX, e.pageY)}><span className="icon-insert-txt"></span>텍스트 입력</a></li>
                <li><a onClick={e => this.newInputBox('sign', e.pageX, e.pageY)}><span className="icon-stamp"></span>서명 (Stamp)</a></li>
                <li><a onClick={e => this.newInputBox('checkbox', e.pageX, e.pageY)}><span className="icon-checklist"></span>체크항목</a></li>
                <li><a onClick={e => this.newInputBox('radio', e.pageX, e.pageY)}><span className="icon-selected-list"></span>선택항목</a></li> */}
                
                {/* 새 입력박스 pdf 위에 즉시배치 */}
                <li><a onClick={e => this.newInputBox2('text')}><span className="icon-insert-txt"></span>텍스트 입력</a></li>
                <li><a onClick={e => this.newInputBox2('sign')}><span className="icon-stamp"></span>서명 (Stamp)</a></li>
                <li><a onClick={e => this.newInputBox2('checkbox')}><span className="icon-checklist"></span>체크항목</a></li>
                <li><a onClick={e => this.newInputBox2('radio')}><span className="icon-selected-list"></span>선택항목</a></li>
                
                {/* <li><a><span className="icon-memo"></span>메모 입력</a></li> */}
                <li><a onClick={this.updateDocumentInfo}>저장</a></li>
              </ul>

            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default DocumentContainer;
