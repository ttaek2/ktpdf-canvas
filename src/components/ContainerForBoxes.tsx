import React, {Component} from 'react';
import BoxWithTextArea from "./BoxWithTextArea";
import BoxWithSignature from "./BoxWithSignature";

class ContainerForBoxes extends Component<any, any> {

  constructor(props) {
    super(props);
  }

  render() {
    const {
      boxDataList,
      updateEventObjectToNull,
      updateCustomBoxSize,
      updateEventObject,
      updateType,
      page,
      users,
      deleteTextArea,
      setFontSize,
      setFontFamily,
      deleteSignatureArea,
      scale
    } = this.props;

    const boxesInPage = boxDataList.filter(box => page === box.page);

    return (
      <div style={{width: '100%', height: '100%'}}>
        {
          boxesInPage.map(box => {
            const {
              page,
              top,
              left,
              type,
              width,
              height,
              boxIndex,
              signerIndex,
              fontFamily,
              fontSize
            } = box;

            if(type === 'text') {
              return(
                <BoxWithTextArea
                  key={`${boxIndex}${type}`}
                  page={page}
                  top={top}
                  left={left}
                  boxIndex={boxIndex}
                  width={width}
                  height={height}
                  users={users}
                  signerIndex={signerIndex}
                  updateEventObjectToNull={updateEventObjectToNull}
                  updateCustomBoxSize={updateCustomBoxSize}
                  updateEventObject={updateEventObject}
                  updateType={updateType}
                  setFontFamily={setFontFamily}
                  setFontSize={setFontSize}
                  deleteTextArea={deleteTextArea}
                  fontFamily={fontFamily}
                  fontSize={fontSize}
                  updateMarkerPos={this.props.updateMarkerPos}
                  scale={scale}
                />
              )
            }

            if(type === 'sign') {
              return(
                <BoxWithSignature
                  key={`${boxIndex}${type}`}
                  page={page}
                  top={top}
                  left={left}
                  boxIndex={boxIndex}
                  width={width}
                  height={height}
                  users={users}
                  signerIndex={signerIndex}
                  updateEventObjectToNull={updateEventObjectToNull}
                  updateCustomBoxSize={updateCustomBoxSize}
                  updateEventObject={updateEventObject}
                  updateType={updateType}
                  deleteSignatureArea={deleteSignatureArea}
                  scale={scale}
                />
              )
            }
          })
        }
      </div>
    );
  }
}

export default ContainerForBoxes;