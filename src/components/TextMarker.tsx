import $ from 'jquery';
import React, { Component } from 'react';
import { IconContext } from "react-icons";
import { IoMdCloseCircle } from 'react-icons/io';
import { TextBox } from 'src/interface/InputBox';
import { ISigner } from 'src/interface/ISigner';

const defaultZIndex = 20;
const oo = 987654321;

interface Props {
  boxData: TextBox;
  users: Array<ISigner>;
  updateInputBox: (boxIndex: number, update: object) => void;
  deleteInputBox: (index: number) => void;
  onDoubleClick: () => void;
  className: string;
}

export default class TextMarker extends Component<Props, any> {

  constructor(props) {
    super(props);

    this.state = {
      zIndex: defaultZIndex,
      showCloseBtn: false,
    };
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

  render() {
    const {
      page,
      type,
      boxIndex,
      signerIndex,
      fontFamily,
      fontSize,
    } = this.props.boxData;

    const {
      users,
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
            style={{width: '100%', height: '100%'}}
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
                fontSize: fontSize,
                resize: 'none',
                boxSizing: 'border-box',
                backgroundColor: '#fff',
                opacity: 0.7,
                border: `1px solid ${backgroundColor}`,
              }}
              placeholder="텍스트 입력란"
              onDoubleClick={this.props.onDoubleClick}
            />
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
