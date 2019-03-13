import * as React from "react";
import SignatureCanvas from 'react-signature-canvas'
import {setSignatureImage} from "../api/signature/setSignatureImage";


interface IInput {
  inputType: string;
  font: string;
  charSize: string;
  signerNo: string;
  x: number;
  y: number;
  w: number;
  h: number;
}

interface ISignatureLayerProps {
  controlSignLayer: (...args) => void;
  updateSignUrl: (...args) => void;
  selectedIndex: number;
  inputs: Array<IInput>
  signerNo: string;
}

class SignatureLayer extends React.Component<ISignatureLayerProps, React.ComponentState> {
  constructor(props) {
    super(props);

    this.close = this.close.bind(this);
    this.clear = this.clear.bind(this);
    this.sign = this.sign.bind(this);
  }

  private signCanvasRef = React.createRef() as any;

  close() {
    this.clear();
    this.props.controlSignLayer();
  }

  clear() {
    this.signCanvasRef.current.clear();
  }

  async sign() {
    const { controlSignLayer } = this.props;
    const canvas = this.signCanvasRef.current;
    const isEmpty = canvas.isEmpty();
    if(isEmpty) {
      alert('서명을 완료해주시기 바랍니다.');
      return false;
    }

    const base64 = canvas.toDataURL();

    await this.saveImage(base64);
    controlSignLayer();

    this.clear();
  }

  async saveImage(base64: string) {
    const { signerNo, updateSignUrl } = this.props;
    // await setSignatureImage(signerNo ,'sign' ,base64).then((res: any) => {
    //   updateSignUrl(res.signImgSrc);
    // });

    updateSignUrl(base64);
  }

  render() {
    return(
      <>
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: '#000',opacity: 0.5,
          }}
        />
        <div style={{
          position: 'relative',
          top: '50%',
          left: '50%',
          width: '800px',
          height: '600px',
          marginTop: '-400px',
          marginLeft: '-350px',
          backgroundColor: '#fff'
        }}>
          <div style={{textAlign: 'right'}}>
            <button style={{
              width: '50px',
              height: '50px'
            }} onClick={this.close}>X</button>
          </div>
          <SignatureCanvas
            ref={this.signCanvasRef}
            canvasProps={{
              width: 800,
              height: 450,
              className: 'sigCanvas',
            }}
          />
          <div style={{textAlign: 'center'}}>
            <button style={{width: '200px', height: '50px'}} onClick={this.clear}>지우기</button>
            <button style={{width: '200px', height: '50px', marginLeft: '10px'}} onClick={this.sign}>서명</button>
          </div>
        </div>
      </>
    );
  }
}

export default SignatureLayer;
