import $ from 'jquery';
import * as React from "react";
import { Input, MemoInput } from "src/interface/Input";
import MemoMarker from "../../../src/components/MemoMarker";
import { setCompleteInfo } from "../../api/complete/setCompleteInfo";
import apiPath from "../../api/enum/apiPath";
import { setDocumentInfoForSigner } from "../../api/signer/setDocumentInfoForSinger";
import DimmedLayer from "../../components/DimmedLayer";
import PlainBoxContainer from "../../components/PlainBoxContainer";
import SignatureLayer from "../../components/SignatureLayer";
import { ISigner } from "../../interface/ISigner";
import { deepCopy } from "../../util/deepCopy";
import PdfViewer from "./PdfViewer";


interface IContractProps {
  documentUrl: string;
  documentNo: number;
  signer: ISigner;
  inputs: Array<Input>;
  completePage: boolean;
}

class ContractContainer extends React.Component<IContractProps, React.ComponentState> {

  constructor(props) {
    super(props);
    console.log('constructor!');
    this.state = {
      signer: [],
      inputs: [],
      numPages: null,
      pageNumber: 1,
      showSignLayer: false,
      scale: undefined,
      newInputBox: null,
      focusInput: null,
    };

    this.updateSignUrl = this.updateSignUrl.bind(this);
    this.updateTextArea = this.updateTextArea.bind(this);
    this.controlSignLayer = this.controlSignLayer.bind(this);
    this.saveContractInfo = this.saveContractInfo.bind(this);
    this.saveCompleteInfo = this.saveCompleteInfo.bind(this);
  }

  componentDidMount() {
  
  }

  static getDerivedStateFromProps(nextProps, prevState) {

    if(prevState.inputs.length > 0) {
      return null;
    }

    const { signer, inputs } = nextProps;

    return {
      signer,
      inputs,
    };
  }

  componentDidUpdate(_, prevState) {
    
  }

  private updateTextArea(index, value) {
    const { inputs } = this.state;
    const newInputs = deepCopy(inputs);
    newInputs[index].addText = value;

    this.setState({ inputs: newInputs });
  }

  emptyInputCnt = (): number => {
    const {inputs} = this.state;
    let cnt = 0;
    inputs.forEach(input => {
      if(this.isMust(input) && this.isEmpty(input)) {
        cnt++;
      }
    });
    return cnt;
  }

  totalInputCnt = (): number => {
    const {inputs} = this.state;
    let cnt = 0;
    inputs.forEach(input => {
      if(this.isMust(input)) {
        cnt++;
      }
    });
    return cnt;
  }

  isMust = (input): boolean => {
    const {inputType} = input;
    return inputType === 'text' || inputType === 'radio' || inputType === 'sign';
  }

  isEmpty = (input): boolean => {
    const {inputType, addText, signUrl} = input;
    if(inputType === 'text') {
      return !addText;
    }
    if(inputType === 'radio') {
      return !addText;
    }
    if(inputType === 'sign') {
      return !signUrl;
    }
    if(inputType === 'memo') {
      return !addText;
    }
    if(inputType === 'checkbox') {
      return false;
    }
  }

  emptyInputIdx = -1;
  showNextEmptyInput = () => {
    if(this.emptyInputCnt() === 0) {
      return;
    }
    const {inputs} = this.state;
    let i = this.emptyInputIdx;
    while(true) {
      i = (i+1) % inputs.length;
      if(inputs[i].inputType === 'memo') {
        continue;
      }
      if(this.isEmpty(inputs[i])) {
        this.emptyInputIdx = i;
        break;
      }
    }
    const emptyInput = inputs[this.emptyInputIdx];
    this.setState({focusInput: emptyInput});
    this.moveTo(emptyInput);
  }


  moveTo = (input: Input) => {
    const {scale} = this.state;
    const {page, y} = input;
    const scroll = y * scale - 50;
    this.pdfViewer.moveTo(page, scroll);
  }

  pdfViewer = null; // PdfViewer 버츄얼돔


  private controlSignLayer(index) {
    const {showSignLayer} = this.state;

    this.setState({
      showSignLayer: !showSignLayer,
      selectedIndex: showSignLayer ? -1 : index
    })
  }

  private updateSignUrl(signImgSrc) {
    const { selectedIndex, inputs } = this.state;
    const newInputs = deepCopy(inputs);

    newInputs[selectedIndex].signUrl = signImgSrc;

    this.setState({ inputs: newInputs });
  }

  validationCheck = () => {
    // 입력필드에 값을 모두 입력했는지 여부
    return this.emptyInputCnt() === 0;
  }

  private saveContractInfo(strHash) {
    console.log('saveContractInfo')
    // console.log(this.state.inputs)

    if(!this.validationCheck()) {
      alert('입력이 모두 완료되지 않았습니다.');
      return;
    }

    // 포탈에서 넘어온 해시값
    // const userhash = strHash;    
    const userHash = 'testhash1234';
    
    const { documentNo } = this.props;
    const { inputs, signer } = this.state;
    const signerNo = signer.signerNo;

    const newInputs = inputs.map((input, index) => {
      if(input.inputType === 'checkbox') {
        return {
          ...input,
          addText: input.addText ? 'Y' : 'N',
        }
      }
      return input;
    });

    setDocumentInfoForSigner(documentNo, signerNo, {inputs: newInputs, userHash}).then((data:any) => {      
      if(data.code == '200'){
        alert('저장 완료');
      }else{
        alert('저장 처리중 에러 : ' + data.code);
      }
    });
  }

  private saveCompleteInfo() {
    console.log('saveCompleteInfo')
    const { documentNo } = this.props;
    const { inputs, originInputs, signer } = this.state;
    const signerNo = signer.signerNo;
    const domain = `${apiPath.DOMAIN.HOSTNAME}:${apiPath.DOMAIN.PORT}`;
    setCompleteInfo(documentNo, signerNo).then((data:any) => {
      if(data.code == '200'){
        alert('저장 완료');
      }else{
        alert('저장 처리중 에러 : ' + data.code);
      }
      
    });
  }

  getInitMemo = (page, signerNo): MemoInput => {
    return {
      inputType: 'memo',
      font: 'Nanum Gothic',
      charSize: 9,
      signerNo,
      x: 200,
      y: 200,
      w: 150,
      h: 75,
      addText: '',
      page,
      boxIndex: this.state.inputs.length,
      minW: 100,
      minH: 50,
      gbnCd: 'lu', // 기본값: left up
    }
  }

  // 메모를 마우스로 끌어다 배치
  newMemo = (e) => {
    const { signer, pageNumber } = this.state;
    const memo = this.getInitMemo(pageNumber, signer.signerNo);
    memo.x = e.pageX;
    memo.y = e.pageY;

    this.setState( {
      newMemo: memo
    })
  }

  // 메모추가 클릭시 메모를 pdf 위에 바로배치
  newMemo2 = (e) => {
    const { signer, pageNumber, scale } = this.state;
    const memo = this.getInitMemo(pageNumber, signer.signerNo);
    // memo.x = e.pageX;
    // memo.y = e.pageY;

    let w = memo.w;
    let h = memo.h;
    // let left = $('.page-wrapper').width() / scale - width - 20; // right
    let x = $('.page-wrapper').width() / 2 / scale - w / 2; // center
    let y = $('.editor-view').scrollTop() / scale + 120;
    memo.x = x;
    memo.y = y;

    this.addMemo(memo);
    // this.setState( {
    //   newMemo: memo
    // })
  }

  deleteInputBox = (boxIndex: number): void => {
    
    const { inputs } = this.state;
    const newInputs = inputs.filter((box, index) => {
      return boxIndex !== index;
    });
    
    console.log(`deleted input box ${boxIndex}. newinputs = `, newInputs)

    this.setState({inputs: newInputs});
  }

  updateInputBox = (boxIndex: number, update: object) => {
    const {inputs} = this.state;
    const newInputs = inputs.map((box, index) => {
      if(boxIndex === index) {
        return {
          ...box,
          ...update
        }
      }

      return box;
    });

    this.setState({inputs: newInputs});
  }

  onPageChange = (pageNumber: number) => {
    this.setState({pageNumber});
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

  // 새 메모가 pdf 위에 배치전 마우스 커서를 따라가도록 하는 이벤트 핸들러
  handleMouseMove = (e: React.MouseEvent) => {
    const {newMemo} = this.state;
    if(!newMemo) {
      return;
    }
    
    this.setState({
      newMemo: {
        ...newMemo,
        x: e.pageX,
        y: e.pageY
      }
    })
  }

  // 마우스 커서 위치에 새 메모가 있는 상태에서 pdf 위를 클릭했을때 클릭위치에 메모 배치
  onInputboxAreaMouseUp = (e: React.MouseEvent) => {
    const {newMemo, scale, pageNumber} = this.state;
    if(!newMemo) {
      return;
    }
    console.log('drop the beat!!')
    let x = e.pageX - $(e.currentTarget).offset().left;
    let y = e.pageY - $(e.currentTarget).offset().top;
    let w = newMemo.w;
    let h = newMemo.h;
    
    x /= scale; 
    y /= scale; 
    w /= scale; 
    h /= scale;
    
    newMemo.x = x;
    newMemo.y = y;
    newMemo.w = w;
    newMemo.h = h;
    newMemo.page = pageNumber;
    
    this.addMemo(newMemo);
  }

  addMemo = (memo: MemoInput) => {
    const copy = [...this.state.inputs];
    copy.push(memo);
    this.setState({
      inputs: copy,
      newMemo: null,
    })
  }

  public render(): JSX.Element {
    const {
      pageNumber,
      numPages,
      showSignLayer,
      signer,
      inputs,
      selectedIndex,
      scale,
      newMemo,
      focusInput,
    } = this.state;


    console.log('inputs!!!!!!!!!!!!!!!!!!!!!!', inputs)
    console.log(`${this.emptyInputCnt()} / ${this.totalInputCnt()}`);

    return (
      <div className="container service">
        <div className='editor'
          onMouseMove={this.handleMouseMove}
        >
          {
            newMemo &&
            <div
                style={{
                    width: newMemo.w,
                    height: newMemo.h,
                    left: newMemo.x,
                    top: newMemo.y,
                    position: 'absolute',
                    zIndex: 100000,
                    pointerEvents: 'none',
                }}
            >
              <MemoMarker
                boxIndex={undefined}
                input={newMemo as MemoInput}
                updateTextArea={undefined}
                editable={false}
                updateInputBox={undefined}
                deleteInputBox={undefined}
              />
            </div>
          }

          <div className='header'>
            <ul className="zoom">
              <li><a onClick={(e) => this.zoomIn(e)}><span className="icon-zoomin"></span></a></li>
              <li><a onClick={(e) => this.zoomOut(e)}><span className="icon-zoomout"></span></a></li>
            </ul>
          </div>
          <div className="edit-body">

            <PdfViewer documentUrl={this.props.documentUrl} scale={scale} onPageChange={this.onPageChange} pageNumber={pageNumber}
                       setScale={this.setScale}
                       ref={ref => this.pdfViewer = ref}
            >
                        <PlainBoxContainer
                          users={[signer]}
                          inputs={inputs}
                          updateTextArea={this.updateTextArea}
                          controlSignLayer={this.controlSignLayer}
                          pageNumber={pageNumber}
                          updateInputBox={this.updateInputBox}
                          deleteInputBox={this.deleteInputBox}
                          scale={scale}
                          onInputboxAreaMouseUp={this.onInputboxAreaMouseUp}
                          focusInput={focusInput}
                        />
              </PdfViewer>

            
            <div className="edit-pallet">
              <div>
                입력완료 : {this.totalInputCnt() - this.emptyInputCnt()} / {this.totalInputCnt()}
                <button style={{marginLeft: '10px'}}
                  onClick={this.showNextEmptyInput}
                >미입력>></button>
              </div>
              
              <ul>
                {/* <li><a onClick={this.newMemo}><span className="icon-memo"></span>메모 입력</a></li> */}
                {!this.props.completePage &&
                  <li><a onClick={this.newMemo2}><span className="icon-memo"></span>메모 입력</a></li>
                }
                <li><a onClick={this.props.completePage ? this.saveCompleteInfo : this.saveContractInfo}>저장</a></li>
              </ul>
            </div>
          
          
          

          <DimmedLayer showSignLayer={showSignLayer} >
            <SignatureLayer
              inputs={inputs}
              signerNo={signer.signerNo}
              controlSignLayer={this.controlSignLayer}
              selectedIndex={selectedIndex}
              updateSignUrl={this.updateSignUrl}
            />
          </DimmedLayer>

          </div>
        </div>
      </div>
    );
  }
}
export default ContractContainer;
