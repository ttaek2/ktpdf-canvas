import $ from 'jquery';
import React, { Component } from 'react';
import { IconContext } from "react-icons";
import { IoMdCloseCircle } from 'react-icons/io';
import { TextBox } from 'src/interface/InputBox';
import { ISigner } from 'src/interface/ISigner';

const defaultZIndex = 20;
const oo = 987654321;

interface Props {
  boxIndex: number;
  boxData: TextBox;
  users: Array<ISigner>;
  updateInputBox: (boxIndex: number, update: object) => void;
  deleteInputBox: (index: number) => void;
  onDoubleClick: () => void;
  className: string;
  scale: number;
  requiredYn: string;
  checked: boolean;
}

export default class TextMarker extends Component<Props, any> {

  constructor(props) {
    super(props);
    const { boxData } = this.props;
    console.log("boxData.requiredYn: "+boxData.requiredYn);
    this.state = {
      zIndex: defaultZIndex,
      showCloseBtn: false,
      checked: boxData.requiredYn === "Y" ? true : false,
      //checkedValue: 'Y',
    };

    console.log("TextMarker constructor!!!");
  }



  onMouseEnter = (e) => {
    console.log('mouse enter!')
    this.setState({
      showCloseBtn: true,
    })
  }


  onCloseBtnClick = (e) => {
    const {deleteInputBox, boxData} = this.props;
    deleteInputBox(boxData.boxIndex);
  }

  onMouseOver = (e) => {
    $(e.currentTarget).prev('.inputbox-header').show();
  }

  onMouseLeave = (e) => {
    $(e.currentTarget).find('.inputbox-header').hide();
  }

  onBeforeInput = (e) => {
    if(e.target.scrollHeight > e.target.offsetHeight) {
      console.log('no more space for input!')
      e.preventDefault();
    }
  }

  onInput = (e) => {
    if(e.target.scrollHeight > e.target.offsetHeight) {
      console.log('no more space for input!')
      e.preventDefault();
    }
  }

  handleCheckBoxChange = (e) => {
    const { target: { checked } } = e;
    this.setState({ checked });
    console.log("체크여부: "+checked);

    
    //const { checkedValue  } = this.state;
    const { boxData } = this.props;

    if(checked) {
      console.log("check: ");
      //updateInputBox(boxIndex, {requiredYn: 'Y'} );
      boxData.requiredYn = "Y";
      //this.setState({ checkedValue: 'Y' });
    } else {
      console.log("notcheck: ");
      //updateInputBox(boxIndex, {requiredYn: 'N'} );
      boxData.requiredYn = "N";
      //this.setState({ checkedValue: 'N' });
    }

    boxData.checked = checked;
    
    //console.log("checkedValue: "+checkedValue);
//    const value = e.target;
    //const { updateInputBox, boxIndex, boxData } = this.props;
    //updateInputBox(boxIndex, {requiredYn: checkedValue} );
    //boxData.requiredYn = checkedValue;
  }

  render() {
    const {
      page,
      type,
      boxIndex,
      signerIndex,
      fontFamily,
      fontSize,
      requiredYn,
      checked,
    } = this.props.boxData;

    const {
      users,
      scale,
    } = this.props;


    const { backgroundColor } = users[signerIndex];

    const closeicon = {
      color: "white", 
      className: "global-class-name", 
      size: "1.1em",
      style: {
        position: 'relative',
        right: '0px',
        // float: 'right'
        cursor: 'default',
      }
    }

    return (
        <div style={{width: '100%', height: '100%'}} className={this.props.className} onMouseLeave={this.onMouseLeave}>
          <div
            className='inputbox-header' 
            style={{
              width: '100%',
              height: '18px',
              position: 'absolute',
              top: '-17px',
              border: `1px solid ${backgroundColor}`,
              backgroundColor: `${backgroundColor}`,
              color: 'white',
              borderRadius: '10px 10px 0 0',
              textAlign: 'right',
              display: 'none',
            }}
          >
            <span
              onClick={this.onCloseBtnClick}  
            >
              <IconContext.Provider value={closeicon}>
                <IoMdCloseCircle  />
              </IconContext.Provider>
            </span>
          </div>
          <div
            className={`textbox-${boxIndex}`}
            style={{width: '100%', height: '100%', textAlign: 'left'}}
            onMouseOver={this.onMouseOver}
            // onMouseLeave={this.onMouseLeave}
          >
            <textarea
            //   disabled={true}
              data-number={boxIndex}
              data-type={type}
              data-page={page}
            
              style={{
                width: '100%',
                height: '100%',
                fontFamily: fontFamily,
                fontSize: `${fontSize * scale}px`,
                resize: 'none',
                boxSizing: 'border-box',
                backgroundColor: '#fff',
                opacity: 0.7,
                border: `1px solid ${backgroundColor}`,
                // maxHeight: scale ? `calc(100% / ${scale})` : undefined,
                // minHeight: scale ? `calc(100% / ${scale})` : undefined,
                // maxWidth: scale ? `calc(100% / ${scale})` : undefined,
                // minWidth: scale ? `calc(100% / ${scale})` : undefined,
                // transform: scale ? `scale(${scale})` : undefined,
                // transformOrigin: scale ? 'top left' : undefined,
                overflow: 'hidden',
                // fontWeight: 'bold',
                padding: 0,
                margin: 0,
                // lineHeight: 1.2,
              }}
              placeholder="텍스트 입력란"
              onDoubleClick={this.props.onDoubleClick}
              // onBeforeInput={this.onBeforeInput}
              // onInput={this.onInput}
            />
            <div  
              style={{
                position: 'absolute',
                left: '-50px',
                top: '0px',
                fontFamily: fontFamily,
                // fontSize: `${fontSize * scale}px`,
                // resize: 'none',
                // boxSizing: 'border-box',
                // backgroundColor: '#fff',
                // opacity: 0.7,
                // border: `1px solid ${backgroundColor}`,
                // overflow: 'hidden',
                // padding: 0,
                // margin: 0,
            }}>
              <input type="checkbox" onChange={this.handleCheckBoxChange}
                checked={this.state.checked} title="필수여부"
                //value={this.state.checkedValue}
                
              />필수
            </div>
            {/* {showCloseBtn && 
            // {true && 
              <div 
                style={{
                  position: 'absolute',
                  right: '-20px',
                  top: '0px'
                }}
                onClick={this.onCloseBtnClick}
              >
                <IconContext.Provider value={closeicon}>
                  <IoMdCloseCircle  />
                </IconContext.Provider>
              </div>
            } */}
          </div>
        </div>
    );
  }
}
