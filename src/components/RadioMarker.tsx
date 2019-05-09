import $ from 'jquery';
import React, { Component } from 'react';
import { IconContext } from "react-icons";
import { IoMdCloseCircle, IoMdRadioButtonOn } from 'react-icons/io';
import { RadioBox } from 'src/interface/InputBox';
import { ISigner } from 'src/interface/ISigner';



interface Props {
  boxData: RadioBox;
  users: Array<ISigner>;
  updateInputBox: (boxIndex: number, update: object) => void;
  deleteInputBox: (index: number) => void;
  className: string;
  width: number;
  height: number;
}

export default class RadioMarker extends Component<Props, any> {

  constructor(props) {
    super(props);

    this.state = {
      mode: 'horizontal',
    };
  }


  static getDerivedStateFromProps(nextProps, prevState) {
    // 가로, 세로 길이에 따라 가로모드 또는 세로모드로 설정함
    const {width, height} = nextProps.boxData;
    // console.log(width, height)
    if(width > height) {
      // return 값이 state 에 설정됨
      return {mode: 'horizontal'}
    } else {
      // return 값이 state 에 설정됨
      return {mode: 'vertical'}
    }
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

  render() {
    let {
      page,
      type,
      boxIndex,
      signerIndex,
    } = this.props.boxData;


    const {
      users,
      width,
      height,
    } = this.props;

    const { backgroundColor } = users[signerIndex];

    const radioiconHorizontal = {
      color: backgroundColor, 
      className: "global-class-name", 
    //   size: "100%",
      padding: 0,
      margin: 0,
      style: {
        position: 'absolute',
        top: '0px',
        height: '100%',
        width: height,
        
      }
    }

    const radioiconVertical = {
      color: backgroundColor, 
      className: "global-class-name", 
    //   size: "100%",
      padding: 0,
      margin: 0,
      style: {
        position: 'absolute',
        height: width,
        width: '100%',
        
      }
    }

    const radioiconLeft = {
        ...radioiconHorizontal,
        style: {
            ...radioiconHorizontal.style,
            left: '0px',
        }
    }

    const radioiconRight = {
        ...radioiconHorizontal,
        style: {
            ...radioiconHorizontal.style,
            right: '0px',
        }
    }

    const radioiconTop = {
      ...radioiconVertical,
      style: {
          ...radioiconVertical.style,
          top: '0px',
      }
    }

    const radioiconBottom = {
      ...radioiconVertical,
      style: {
          ...radioiconVertical.style,
          bottom: '0px',
      }
    }

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

    // console.log(this.state.mode)

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
            style={{
              width: '100%',
              height: '100%',
              border: `1px solid ${backgroundColor}`,
            //   overflow: 'hidden',
              backgroundColor: 'white',
              opacity: 0.7,
              position: 'absolute',
              textAlign: 'left',
            }}
            className='inputbox-body'
            data-number={boxIndex}
            data-type={type}
            data-page={page}
            onMouseOver={this.onMouseOver}
          >
            <IconContext.Provider value={this.state.mode === 'horizontal' ? radioiconLeft : radioiconTop}>
              <IoMdRadioButtonOn />
            </IconContext.Provider>

            <IconContext.Provider value={this.state.mode === 'horizontal' ? radioiconRight : radioiconBottom}>
              <IoMdRadioButtonOn />
            </IconContext.Provider>
          </div>

          
        </div>
    );
  }
}
