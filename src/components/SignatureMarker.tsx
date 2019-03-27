import $ from 'jquery';
import React, { Component } from 'react';
import { IconContext } from "react-icons";
import { FaStamp } from "react-icons/fa";
import { IoMdCloseCircle } from 'react-icons/io';
import { SignBox } from 'src/interface/InputBox';
import { ISigner } from 'src/interface/ISigner';

interface Props {
  boxData: SignBox;
  users: Array<ISigner>;
  updateInputBox: (boxIndex: number, update: object) => void;
  deleteInputBox: (index: number) => void;
  className: string;
}

export default class SignatureMarker extends Component<Props, any> {

  constructor(props: Props) {
    super(props);

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

    const stampicon = {
      color: backgroundColor, 
      className: "global-class-name", 
      size: "80%",
      padding: 0,
      margin: 0,
      
      // width: '100%',
      // height: '100%',
      style: {
        // position: 'absolute',
      },
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
          style={{
            width: '100%',
            height: '100%',
            border: `1px solid ${backgroundColor}`,
            overflow: 'hidden',
            backgroundColor: 'white',
            opacity: 0.7,
            textAlign: 'center',
            verticalAlign: 'middle'
          }}
          className='inputbox-body'
          data-number={boxIndex}
          data-type={type}
          data-page={page}
          onMouseOver={this.onMouseOver}
        >
          <IconContext.Provider value={stampicon}>
            <FaStamp />
          </IconContext.Provider>
        </div>

        
      </div>
    );
  }
}
