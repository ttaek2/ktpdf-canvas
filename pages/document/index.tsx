import 'raf/polyfill';
import 'es6-shim';
import 'es6-promise';
import 'reset-css/reset.css';
import "@babel/polyfill";
import * as React from 'react';
import DocumentContainer from '../../src/containers/desktop/Document';
import {getDocumentInfo} from "../../src/api/document/getDocumentInfo";
import {getDocumentInfoForSigner} from "../../src/api/signer/getDocumentInfoForSinger";
import {ISigner} from "../../src/interface/ISigner";
import Head from 'next/head'

interface IDocumentProps {
  documentNo: string;
  documentUrl: string;
  signerList: Array<ISigner>;
  
  tmpDocId: string;
  regId: string;
  inputs:[];
}

interface IDocumentInfoAPIResponse {
  doc: string;

  docId: string;
  docName: string;
  fileName: string;
  filePath: string;
  userId: string; 
  signers: Array<ISigner>;  
  inputs:[];
}

const backgroundColorList = [
  '#2CBBB6', // 'red',
  '#6799FF', //'green',
  'blue',
  'yellow',
  'orange',
  'pink',
  'purple',
  'gray',
  'black',
  'skyblue',
  'blanchedalmond',
  'brown',
  'chocolate',
  'darkgray',
  'darkkhaki',
  'khaki',
  'darkturquoise',
  'deeppink',
  'cadetblue',
  'cyan'
];

const defaultBackgroundColor = '#fff';

class Document extends React.Component<IDocumentProps, React.ComponentState> {

  static async getInitialProps({query}) {

    // 포탈에서 호출 시 시작
    // console.log("query 1 :: " + JSON.stringify(query));

    // //let docInfo = JSON.stringify(query);
    let docInfo = JSON.parse(JSON.stringify(query));
    let params = JSON.parse(docInfo.params);

    // console.log("params.docId : " + params.docId);
    // console.log("params.regId : " + params.regId);
    // console.log("params.tmpDocId : " + params.tmpDocId);
    // console.log("params.docPath : " + params.docPath);
    // console.log("params.docName : " + params.docName);

    let signers = params.signers;
    // console.log("signers : " + signers.length);    
    
    let documentNo = params.docId;    
    let documentUrl = params.docPath;
    let signerList = signers;
    let tmpDocId = params.tmpDocId;
    let regId = params.regId;

    return {documentNo, documentUrl, signerList, tmpDocId, regId};
    // 포탈에서 호출 시 끝

    // let documentNo = query.docNo;
    // let {tmpDocId, regId } = query;
    // return {documentNo, tmpDocId, regId};
  }

  constructor(props) {
    super(props);

    this.state = {
      documentNo: 0,
      signerList: [],
      documentUrl: '',
      inputs: []
    }
  }

  componentWillMount(){
    // console.log("componentWillMount");
  }

  componentDidMount() {
    // console.log("componentDidMount>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>");
    const documentNo = this.props.documentNo;    
    // const {tmpDocId, regId} = this.props;    

    // 템플릿 아이디가 있다면 기존 객체를 조회해본다.
    // if(tmpDocId == undefined || tmpDocId == ''){
    //   // console.log("tmpDocId 1 is undefined ");
    // }else{
    //   // console.log(" api 서버에서 조회를 시작한다.");
    //   getDocumentInfoForSigner(tmpDocId, regId)
    //   .then((data: any) => {           
    //     this.setState({
    //       // signer: data.signer,
    //       // documentUrl: data.filePath,          
    //       inputs: data.inputs
    //     });
    //   });
    // }

    // 템플릿 아이디가 있다면 기존 객체를 조회해본다.
    // getDocumentInfo(documentNo)
    // getDocumentInfo(documentNo, tmpDocId, regId)
    //   .then((data: IDocumentInfoAPIResponse) => {
    //     // this.setState({
    //     //   // documentUrl: data.doc,
    //     //   // documentNo: data.docId // 문서아이디  
    //     //   // ,docName: data.docName
    //     //   // ,fileName: data.fileName   
    //     //   // ,documentUrl: data.filePath // 문서경로
    //     //   // ,userId: data.userId
    //     //   // ,signerList: data.signers
    //     //   inputs: data.inputs
    //     // })
    //   });      
  }

  render() {
    // const {documentNo} = this.props;
    const {documentNo} = this.props;
    // const {documentUrl, signerList} = this.state;
    const {documentUrl, signerList} = this.props;
    const {docName, fileName} = this.state;

    const {tmpDocId, regId} = this.props;
    // console.log("regId : " + regId);
    const {inputs} = this.state;
    console.log("====== index.tsx ->  render ");    

    const users = signerList ? signerList.map((user, index) => ({
      ...user,
      backgroundColor: backgroundColorList[index] ? backgroundColorList[index] : defaultBackgroundColor,
      color: backgroundColorList.indexOf(String(index)) > -1 ? '#fff' : '#000'
    })) : [];

    if(users.length < 1) return null;

    return (
      <div>
        <Head>
          <title>kt - document</title>
          <link href="/assets/css/style.css" rel="stylesheet" />
        </Head>
        <DocumentContainer
          documentUrl={documentUrl}
          signerList={users}
          documentNo={documentNo}
          docName={docName}
          fileName={fileName}
          userId={regId}
          inputs={inputs}
          tmpDocId={tmpDocId}
        />
      </div>
    );
  }

}

export default Document;