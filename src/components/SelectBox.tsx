import * as React from "react";
import cx from "classnames";

const styled = require('./SelectBox.css');


interface ISelectBoxProps {
  option: Array<string | number>;
  width?: string;
  height?: string;
  datas?: object;
  defaultText?: string;
  background?: string;
  selectedText?: string;
  reset?: boolean;
  callback: (...args) => void;
}

interface ISelectBoxState {
  selectedText: string;
  defaultText: string
  isShowingOptionList: boolean;
  isUse: boolean;
  index: string;
}

class SelectBox extends React.Component<ISelectBoxProps, ISelectBoxState> {
  constructor(props) {
    super(props);

    const {defaultText, selectedText} = this.props;

    this.state = {
      defaultText: defaultText ? defaultText : "선택해주세요",
      selectedText: selectedText,
      isShowingOptionList: false,
      isUse: false,
      index: ''
    };

    this.hiddenSelectBoxOption = this.hiddenSelectBoxOption.bind(this);
    this.showSelectBoxOption = this.showSelectBoxOption.bind(this);
    this.selectedOption = this.selectedOption.bind(this);
  }

  

  public shouldComponentUpdate(nextProps) {
    const {selectedText, datas} = this.props;
    if (nextProps.selectedText === selectedText) false;
    if (nextProps.datas === datas) false;
    return true;
  }

  private resetSelectedText() {
    this.setState({
      selectedText: ""
    });

    const data = {
      datas: [],
      index: 0,
      selectText: ""
    };

    this.props.callback(data);
  }

  public componentDidUpdate(prevProps) {
    const {selectedText, reset, defaultText} = this.props;
    if (selectedText != prevProps.selectedText || defaultText != prevProps.defaultText) {
      this.setState({
        selectedText: selectedText,
        defaultText: defaultText ? defaultText : "선택해주세요"

      });

      if (!selectedText) {
        this.setState({
          isUse: false
        })
      }
    }

    if (reset != prevProps.reset) {
      this.resetSelectedText();
    }
  }

  private showSelectBoxOption(): void {
    this.setState({
      isShowingOptionList: !this.state.isShowingOptionList,
      isUse: true
    });
  }

  private hiddenSelectBoxOption(e: React.SyntheticEvent): void {
    e.preventDefault();
    const timer = setTimeout(_ => {
      this.setState({isShowingOptionList: false});
      clearTimeout(timer);
    }, 250);
  }

  private selectedOption(e: React.SyntheticEvent): void {
    const optionItemElement = e.currentTarget;
    const selectText = optionItemElement.innerHTML;
    const index = optionItemElement.getAttribute('data-index');
    const {callback, datas} = this.props;


    this.setState({
      selectedText: selectText,
      isShowingOptionList: false,
      index
    });

    const data = {
      datas,
      index,
      selectText
    };

    callback(data);
  }

  render(): JSX.Element {
    const {
      isUse,
      isShowingOptionList,
      selectedText,
      defaultText,
      index
    } = this.state;

    const {
      width,
      height,
      option,
      datas,
      background
    } = this.props;

    const propsHeight = isNaN(Number(height)) ? height : `${height}px`;
    const propsWidth = isNaN(Number(width)) ? width : `${width}px`;
    const selectBoxClassName = cx(styled.select, {[styled.use]: isUse}, {[styled.show]: isShowingOptionList});
    const inputSelectBoxClassName = cx(styled.inputBox, {[styled.use]: isUse});

    let inlineStyle = {
      width: propsWidth,
      height: propsHeight,
      background: background ? background : 'transparent',
      color: '#000'
    };

    const selectedValue = index && datas[index];
    if (selectedValue) {
      inlineStyle = {
        ...inlineStyle,
        background: selectedValue.backgroundColor,
        color: selectedValue.color
      };
    }

    return (
      <span
        className={styled.selectWrapper}
        style={inlineStyle}
      >
                <span
                  className={selectBoxClassName}
                  style={inlineStyle}
                  onClick={this.showSelectBoxOption}
                >
                    <input
                      style={{color: inlineStyle.color}}
                      className={inputSelectBoxClassName}
                      defaultValue={selectedText}
                      readOnly={true}
                      placeholder={defaultText} onBlur={this.hiddenSelectBoxOption}/>
                </span>
        {this.state.isShowingOptionList &&
        <span className={styled.optionWrapper}>
                        {
                          option.map((object, i) => {

                              let backgroundColor;
                              let color;
                              let fontFamily;
                              let fontSize;

                              if(datas[i] && datas[i].backgroundColor) {
                                backgroundColor = datas[i].backgroundColor;
                              }

                              if(datas[i] && datas[i].color) {
                                color = datas[i].color;
                              }

                              if(defaultText.indexOf('글자체') > -1) {
                                fontFamily = datas[i];
                              }

                              if(defaultText.indexOf('글자 크기') > -1) {
                                fontSize = datas[i];
                              }

                              return (
                                <span
                                  style={{backgroundColor, color, fontFamily, fontSize}}
                                  className={styled.option}
                                  key={i}
                                  data-index={i}
                                  datatype={'seletBoxItem'}
                                  onClick={this.selectedOption}
                                >{object}</span>
                              )
                            }
                          )
                        }
                    </span>
        }
            </span>
    );
  }
}


export default SelectBox;