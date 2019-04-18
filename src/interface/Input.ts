export interface Input {
    inputType: string;
    
    signerNo: string;
    x: number;
    y: number;
    w: number;
    h: number;
    addText: string;
    page: number;
    boxIndex: number;
}

export interface TextInput extends Input {
    font: string;
    charSize: number;
}

export interface SignInput extends Input {
    signUrl: string;
}

export interface CheckInput extends Input {

}

export interface RadioInput extends Input {

}

export interface MemoInput extends Input {
    font: string;
    charSize: number;
    minW: number;
    minH: number;
    gbnCd: string;
}