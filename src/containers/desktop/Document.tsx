import * as React from "react";
import {Document, Page, pdfjs} from 'react-pdf';
import "./reset.css";

import SelectBox from "../../components/SelectBox";
import {deepCopy} from "../../util/deepCopy";
import {ISigner} from "../../interface/ISigner";
import {setDocumentInfo} from "../../api/document/setDocumentInfo";
import ZoomController from "../../components/ZoomController";
import $ from 'jquery';
import ContainerForBoxes from "../../components/ContainerForBoxes";
import { InputBox, TextBox, SignBox, CheckBox } from "src/interface/InputBox";

import {getDocumentInfo} from "../../../src/api/document/getDocumentInfo";

import Index from "./Index";

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

const styled = require('./common.css');

const convertView = (view_w, view_h, left, top, width, height) => {
  // console.log(view_w, view_h, left, top, width, height);
  const x = (left / view_w);
  const y = ((view_h - top - height) / view_h);

  const w = (width / view_w);
  const h = (height / view_h);

  return {
    x,
    y,
    w,
    h
  }
};

const defaultData = {
  width: 200,
  height: 100,
  fontSize: 12,
  fontFamily: 'Times-Roman',
  top: 50,
  textLeft: 0,
  signLeft: 250,
  boxIndex: -1
};

const getInitTextBox = (page, signerIndex, boxIndex): TextBox => {
  return {
    type: 'text',
    top: defaultData.top,
    left: defaultData.textLeft,
    fontSize: defaultData.fontSize,
    fontFamily: defaultData.fontFamily,
    width: 300,
    height: 30,
    signerIndex,
    page,
    boxIndex
  }
}
const getInitSignBox = (page, signerIndex, boxIndex): SignBox => {
  return {
    type: 'sign',
    top: defaultData.top,
    left: defaultData.signLeft,
    width: 100,
    height: 100,
    signerIndex,
    page,
    boxIndex
  }
}
const roadInitTextBox = (input, index): TextBox => {
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
    boxIndex : index
  }
}

const roadInitSignBox = (input, index): SignBox => {
  return {
    type: 'sign',
    top: input.y,
    left: input.x,    
    width: input.w,
    height: input.h,
    signerIndex:0,  // 생성자꺼...
    page: input.page,
    boxIndex : index
  }
}

const roadInitCheckBox = (input, index): SignBox => {
  return {
    type: 'checkbox',
    top: input.y,
    left: input.x,    
    width: input.w,
    height: input.h,
    signerIndex:0,  // 생성자꺼...
    page: input.page,
    boxIndex : index
  }
}

// interface IInput {
//   inputType: string;
//   font: string;
//   charSize: string;
//   signerNo: string;
//   x: number;
//   y: number;
//   w: number;
//   h: number;
//   page: number;
// }

const getInitCheckBox = (page, signerIndex, boxIndex): CheckBox => {
  return {
    type: 'checkbox',
    top: defaultData.top,
    left: defaultData.signLeft,
    width: 50,
    height: 50,
    signerIndex,
    page,
    boxIndex
  }
}

interface IDocumentProps {
  documentNo: string;
  documentUrl: string;
  signerList: Array<ISigner>;
  docName: string;
  fileName: string;
  userId: string;  
  // inputs: Array<IInput>;
  inputs: []
  tmpDocId: string;
}

class DocumentContainer extends React.Component<IDocumentProps, React.ComponentState> {

  constructor(props) {
    super(props);
    this.state = {
      docName: '',
      fileName: '',
      userId: '',
      inputs: [],

      signerList: [],
      numPages: null,
      pageNumber: 1,
      boxDataList: [],
      view_w: -1,
      view_h: -1,
      zoom: 1,
      pageX: -1,
      pageY: -1,
      boxPageX: 0,
      boxPageY: 0,
      e: null,
      boxWidth: 200,
      boxHeight: 100,
      type: '',
      initPageX: 0,
      initPageY: 0,
      selectSignerIndex: -1,
      selectedBoxPage: 1,
      selectedBoxType: '',
      selectedBoxIndex: -1
      ,tmpDocId:''
    };

    this.checkSelectedValue = this.checkSelectedValue.bind(this);
    this.addSignatureArea = this.addSignatureArea.bind(this);
    this.addCheckbox = this.addCheckbox.bind(this);
    this.updateInputBox = this.updateInputBox.bind(this);
    this.deleteInputBox = this.deleteInputBox.bind(this);
    this.addTextArea = this.addTextArea.bind(this);
    this.setSelectedIndex = this.setSelectedIndex.bind(this);
    this.onDocumentLoadSuccess = this.onDocumentLoadSuccess.bind(this);
    this.getNewPdfItem = this.getNewPdfItem.bind(this);
    this.updateDocumentInfo = this.updateDocumentInfo.bind(this);
    this.updateRightContentZoom = this.updateRightContentZoom.bind(this);


    this.roadInputData = this.roadInputData.bind(this);
  }

  componentDidMount() {
    // console.log("Document.tsx ============================== componentDidMount ");
    this.initBoxData();

    const {documentNo, tmpDocId, userId} = this.props;    
    // console.log("userId :: " + userId)
    // 템플릿 아이디가 있다면 기존 객체를 조회해본다.
    if(tmpDocId != ''){
      getDocumentInfo(documentNo, tmpDocId, userId)
      .then((data: IDocumentProps) => {
        // alert("=====================================");
        // console.log(data.inputs);
        this.roadInputData(data.inputs);
      });
    }
    

    // getInitBoxData(pageNumber, selectSignerIndex, 'text', copyBoxDataList.length);

    $(window).scroll(() => {
      // console.log($(window).scrollTop(), $(window).height(), $(document).height());
      // if($(window).scrollTop() + $(window).height() == $(document).height()) {
      //   console.log('Document.tsx bottom boom!')
      //   let {pageNumber, numPages} = this.state;
      //   pageNumber++;
      //   if(pageNumber <= numPages) {
      //     this.setState({
      //       pageNumber
      //     })
      //   }
      // }
      // else if($(window).scrollTop() == 0) {
      //   console.log('Document.tsx top boom!')
      //   let {pageNumber, numPages} = this.state;
      //   pageNumber--;
      //   if(pageNumber >= 1) {
      //     this.setState({
      //       pageNumber
      //     })
      //   }
      // }
   });
  }

  componentDidUpdate(_, prevState): void {
    // console.log('Document.tsx componentDidUpdate');
    const $view = $('.inputbox-area');
    const view_w = $view.width();
    const view_h = $view.height();

    if(view_h < 0 || prevState.view_h !== view_h){
      this.setState({
        view_w,
        view_h,
      }, this.initBoxData);
    }
  }

  private initBoxData() {    
    // console.log("Document.tsx Document.tsx             initBoxData          ");
    
    const {signerList} = this.props;
    // const {signerList, inputs} = this.props;
    
    this.setState({
      signerList
      // ,inputs
    });
  }

  private getNewPdfItem(e: React.MouseEvent) {
    // console.log('Document.tsx getNewPdfItem called')
    e.preventDefault();
    const {pageNumber} = this.state;
    const idx = Number(e.currentTarget.getAttribute('data-index')) + 1;
    
    // $('li.thumbnailList').find('canvas').css('opacity', 0.7);
    // $(e.currentTarget).find('canvas').css('opacity', 1);
    
    this.setState({pageNumber: idx});
  }


  private onDocumentLoadSuccess(pdf) {
    // console.log('Document.tsx DocumentLoadSuccess')
    // console.log(pdf)
    this.setState({
      numPages: pdf.numPages
    });
  };

  onPageLoadSuccess = (page) => {
    // console.log('Document.tsx PageLoadSuccess')
  }

  onPageRenderSuccess = (page) => {
    console.log('Document.tsx PageRenderSuccess')
    // console.log(page.width, page.height)
    this.setState({
      pageWidth: page.width,
      pageHeight: page.height
    })
    // $('.documentContainer').find('canvas').css('opacity', 1.0);
  }

  private checkSelectedValue(): boolean {
    const {selectSignerIndex} = this.state;
    if (selectSignerIndex && selectSignerIndex > -1) return true;

    alert('작성자 또는 생성자를 선택하지 않았습니다.');
    return false;
  }

  private addTextArea() {
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
    const initBoxData = getInitTextBox(pageNumber, selectSignerIndex, copyBoxDataList.length);
    copyBoxDataList.push(initBoxData);

    this.setState({
      boxDataList: copyBoxDataList,
    });
  }

  private addSignatureArea() {

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
    const initBoxData = getInitSignBox(pageNumber, selectSignerIndex, copyBoxDataList.length);
    copyBoxDataList.push(initBoxData);

    this.setState({
      boxDataList: copyBoxDataList,
    });
  }

  private addCheckbox() {

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
    const initBoxData = getInitCheckBox(pageNumber, selectSignerIndex, copyBoxDataList.length);
    copyBoxDataList.push(initBoxData);

    this.setState({
      boxDataList: copyBoxDataList,
    });
    // console.log(this.state.boxDataList)
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

  private scaleMarker(scale) {
    const {boxDataList} = this.state;
    const copyBoxDataList = deepCopy(boxDataList);
    const newBoxDataList = copyBoxDataList.map((data, boxIndex) => {
        return {
          ...data,
          width: data.width * scale,
          height: data.height * scale,
          top: data.top * scale,
          left: data.left * scale
        }
      }
    );

    return newBoxDataList;
  }

  private convertDataForAPI(boxDataList) {
    const {
      signerList,
      view_w,
      view_h
    } = this.state;


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

      const {zoom: scale, pageWidth, pageHeight} = this.state;

      // const { x, y, w, h } = convertView(pageWidth, pageHeight, left, top, width, height);
      const x = left / scale;
      const y = top / scale;
      const w = width / scale;
      const h = height / scale;


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

      const {zoom: scale, pageWidth, pageHeight} = this.state;

      // const { x, y, w, h } = convertView(pageWidth, pageHeight, left, top, width, height);
      const x = left / scale;
      const y = top / scale;
      const w = width / scale;
      const h = height / scale;

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

      const {zoom: scale, pageWidth, pageHeight} = this.state;

      // const { x, y, w, h } = convertView(pageWidth, pageHeight, left, top, width, height);
      const x = left / scale;
      const y = top / scale;
      const w = width / scale;
      const h = height / scale;

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

    return [].concat(textAreaListFormatted, signatureAreaListFormatted, checkboxListFormatted);
  }

  // 저장처리
  private updateDocumentInfo() {
    const {documentNo, docName, fileName, documentUrl, userId, signerList} = this.props;
    const {boxDataList} = this.state;
    const dataList = this.convertDataForAPI(boxDataList); 
    
    // 유저리스트의 싸인박스가 있는지 체크
    console.log(signerList);
    console.log(dataList);
    
    // 싸인 객체만 추출
    const signObj = dataList.filter(function(item){
      return item.inputType == "sign";
    });

    if(signObj.length < 1){
      alert('서명은 필수입니다.');
      return;
    } 

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
      console.log(result);  
      // if(data.code == '200'){
      //   alert('저장 완료');
      // }else{
      //   alert('저장 처리중 에러 : ' + data.code);
      // }
      // return data;
    });

    return result;
  }

  private updateRightContentZoom(zoom) {
    const {zoom: prevScale} = this.state;
    const nextScale = zoom;
    const ratio = nextScale / prevScale;
    // console.log(prevScale, nextScale, ratio)
    const newBoxDataList = this.scaleMarker(ratio);
    this.setState({
      zoom,
      boxDataList: newBoxDataList
    });
  }


  onThumbnailRenderSuccess = (page) => {
    if(page.pageNumber == 1) {
      $('.thumbnail').find('canvas').css('width', '100%').css('height', '100%');
    }
  }

  onSelectionChange = (e) => {
    const index = e.target.value;
    this.setSelectedIndex({index});
  }

  
  
  private roadInputData(inputs:any) {
    // console.log(" ================= ");
    // console.log(inputs);
    const {boxDataList} = this.state;

    
    const copyBoxDataList = [...boxDataList];
    
    inputs.forEach((input, index) => {      
      if(input.inputType == 'text'){
        const initBoxData = roadInitTextBox(input, index);
        copyBoxDataList.push(initBoxData);
      }else if(input.inputType == 'sign'){
        const initBoxData = roadInitSignBox(input, index);
        copyBoxDataList.push(initBoxData);
      }else if(input.inputType == 'checkbox'){
        const initBoxData = roadInitCheckBox(input, index);
        copyBoxDataList.push(initBoxData);
      }
    });

    this.setState({
      boxDataList: copyBoxDataList,
    });
  }


  public render(): JSX.Element {
    // console.log('Document.tsx rendering document');

    const {
      pageNumber,
      numPages,
      boxDataList,
      signerList,
      zoom,
      selectSignerIndex
    } = this.state;


    const curPageInputBox = boxDataList.filter(box => box.page === pageNumber);

    return (
      <div className="container service">
        <div className='editor'>
          <div className='header'>
            <ZoomController updateRightContentZoom={this.updateRightContentZoom} zoom={zoom}/>
          </div>
          <div className="edit-body">
            <div className="thumbnail">

              <ul>
                      <Document
                        file={this.props.documentUrl}
                      >
                        {Array.from(
                          new Array(numPages),
                          (el, index) => (
                            <li 
                              key={index}
                              className={pageNumber === index+1  ? 'on' : undefined}
                            >
                              <a href="#" data-index={index} onClick={this.getNewPdfItem}>
                                <Page
                                  key={`page_${index + 1}`}
                                  pageNumber={index + 1}
                                  renderMode='canvas'
                                  renderTextLayer={false}
                                  renderAnnotationLayer={false}
                                  // onLoadSuccess={page => console.log(`thumbnail page-${page.pageNumber} loaded`)}
                                  onRenderSuccess={this.onThumbnailRenderSuccess}
                                  scale={0.22}
                                />
                              </a>
                            </li>
                          ),
                        )}
                      </Document>
              </ul>

            </div>
            <div className="editor-view">
              
              <Document
                className='documentContainer'
                file={this.props.documentUrl}
                onLoadSuccess={this.onDocumentLoadSuccess}
              >
                <Page 
                  className='pageContainer'
                  pageNumber={pageNumber}
                  renderTextLayer={false}
                  renderAnnotationLayer={false}
                  scale={zoom}
                  onLoadSuccess={this.onPageLoadSuccess}
                  onRenderSuccess={this.onPageRenderSuccess}
                >
                  <div
                    className="inputbox-area"
                    style={{
                      width: this.state.pageWidth,
                      height: this.state.pageHeight,
                      position: 'absolute',
                      paddingTop: '10px',
                      paddingBottom: '10px',
                      zIndex: 10,
                      left: '50%',
                      transform: 'translateX(-50%)',
                    }}
                    // onMouseMove={this.documentMouseMove}
                    // onMouseUp={this.updateEventObjectToNull}
                  >
                        <ContainerForBoxes
                          updateInputBox={this.updateInputBox}
                          boxDataList={curPageInputBox}
                          users={signerList}
                          page={pageNumber}
                          deleteInputBox={this.deleteInputBox}
                          scale={zoom}
                        />
                  </div>
                </Page>
              </Document>

            </div>
            <div className="edit-pallet">
              <div className="input-select secondary">
                <select
                  onChange={this.onSelectionChange}
                  style={selectSignerIndex >= 0 && signerList[selectSignerIndex] ? {color: signerList[selectSignerIndex].backgroundColor} : undefined}
                >
                  <option value="">참여자 지정</option>
                  {signerList.map((signer, index) => 
                    <option 
                      value={index}
                      style={{color: signer.backgroundColor}}
                    >{signer.signerNm}</option>  
                  )}
                </select>
              </div>
              <ul>
                <li><a href="#" onClick={this.addTextArea}><span className="icon-insert-txt"></span>텍스트 입력</a></li>
                <li><a href="#" onClick={this.addSignatureArea}><span className="icon-stamp"></span>서명 (Stamp)</a></li>
                <li><a href="#" onClick={this.addCheckbox}><span className="icon-checklist"></span>체크항목</a></li>
                <li><a href="#"><span className="icon-selected-list"></span>선택항목</a></li>
                <li><a href="#"><span className="icon-memo"></span>메모 입력</a></li>
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
