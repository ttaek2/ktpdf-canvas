import 'raf/polyfill';
import 'es6-shim';
import 'es6-promise';
import 'reset-css/reset.css';
import "@babel/polyfill";
import * as React from 'react';
import DocumentContainer from '../../src/containers/desktop/Document';
import {getDocumentInfo} from "../../src/api/document/getDocumentInfo";
import {ISigner} from "../../src/interface/ISigner";
import Head from 'next/head'

interface IDocumentProps {
  documentNo: string;
  documentUrl: string;
  signerList: Array<ISigner>;
}

interface IDocumentInfoAPIResponse {
  doc: string;

  docId: string;
  docName: string;
  fileName: string;
  filePath: string;
  userId: string; 
  signers: Array<ISigner>;
}

const backgroundColorList = [
  'red',
  'green',
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
    let documentNo = query.docNo;
    return {documentNo};
  }

  constructor(props) {
    super(props);

    this.state = {
      documentNo: 0,
      signerList: [],
      documentUrl: ''
    }
  }

  componentDidMount() {
    const documentNo = this.props.documentNo;

    getDocumentInfo(documentNo)
      .then((data: IDocumentInfoAPIResponse) => {
        this.setState({
          // documentUrl: data.doc,
          documentNo: data.docId, // 문서아이디  
          docName: data.docName,
          fileName: data.fileName,      
          documentUrl: data.filePath, // 문서경로
          userId: data.userId, 
          signerList: data.signers
        })
      });
  }

  render() {
    const {documentNo} = this.props;
    const {documentUrl, signerList} = this.state;
    const {docName, fileName, userId} = this.state;

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
          userId={userId}
        />
      </div>
    );
  }

}

export default Document;