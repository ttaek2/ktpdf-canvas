export interface InputBox {
    type: string;
    page: number;
    width: number;
    height: number;
    minWidth: number;
    minHeight: number;
    maxWidth: number;
    maxHeight: number;
    top: number;
    left: number;
    boxIndex: number;
    signerIndex: number;
}

export interface TextBox extends InputBox {
    fontSize: number;
    fontFamily: string;
}

export interface SignBox extends InputBox {

}

export interface CheckBox extends InputBox {

}

export interface RadioBox extends InputBox {

}