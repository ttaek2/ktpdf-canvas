import * as React from "react";
import SelectBox from "./SelectBox";

// const style = require('../../style.css');

interface IZoomController {
  updateRightContentZoom: (...args) => void;
  zoom: number;
  signerNm ?: string;
}

const zoomList = [
  0.5,
  0.6,
  0.7,
  0.8,
  0.9,
  1.0,
  1.1,
  1.2,
  1.3,
  1.4,
  1.5
];

class ZoomController extends React.Component<IZoomController, React.ComponentState> {

  constructor(props) {
    super(props);

    this.updateZoom = this.updateZoom.bind(this);
  }

  updateZoom({ datas, index }) {
    const zoom = datas[index];
    this.props.updateRightContentZoom(zoom);
  }

  zoomIn(e) {
    let {zoom, updateRightContentZoom} = this.props;
    zoom *= 1.1;
    if(zoom > 1.7)
      return;
    updateRightContentZoom(zoom)
  }
  zoomOut(e) {
    let {zoom, updateRightContentZoom} = this.props;
    zoom /= 1.1;
    if(zoom < 0.7)
      return;
    updateRightContentZoom(zoom)
  }

  render() {
    // const { signerNm, children } = this.props;
    const toolbarStyle = {
      position: 'fixed',
      right: '40px',
      top: '50px',
      width: '100px',
      height: '50px',
      backgroundColor:'#222',
      border: '2px solid #888',
      borderRadius: '7px',
      padding: '2px',
      zIndex: 10,
    }

    const zoomBtnStyle = {
      border: '1px solid #888',
      borderRadius: '5px',
      backgroundColor: '#FE8',
      width: '32px',
      height: '24px',
      fontSize: '20px',
      fontWeight: 'bold',
      color: 'black',
      margin: '2px',
    }

    const zoomPercentStyle = {
      textAlign: 'center',
      fontSize: '16px',
      color: 'black',
      margin: '2px',
    }

    return (
      <ul className="zoom">
        <li><a href="#" onClick={(e) => this.zoomIn(e)}><span className="icon-zoomin"></span></a></li>
        <li><a href="#" onClick={(e) => this.zoomOut(e)}><span className="icon-zoomout"></span></a></li>
      </ul>

      // <div className="Toolbar" style={{padding: '10px'}}>
      //   <button className="ZoomIn" style={zoomBtnStyle} onClick={(e) => this.zoomOut(e)}>-</button>
      //   <button className="ZoomOut" style={zoomBtnStyle} onClick={(e) => this.zoomIn(e)}>+</button>
      //   <span className="ZoomPercent" style={zoomPercentStyle} >{(this.props.zoom * 100).toFixed(1)}%</span>
      // </div>



      // <div style={{ padding: 10 }}>
      //   {signerNm && <span style={{marginRight: '300px'}}>{signerNm}</span>}
      //   {!signerNm && children}
      //   <SelectBox
      //     datas={zoomList}
      //     option={zoomList}
      //     defaultText={'1.0'}
      //     callback={this.updateZoom}
      //   />
      //   {/*<input type="range" min="0.5" max="1.5" step="0.1" value={this.props.zoom} onChange={this.updateZoom} />*/}
      // </div>
    );
  }
}

export default ZoomController;
