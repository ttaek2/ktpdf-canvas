import * as React from "react";
class Index extends React.Component<{}, React.ComponentState> {
  public render(): JSX.Element {
    return (
      <div>
        <p><a href={'/document?docNo=190001'}>생성자 페이지</a></p>
        <p><a href={'http://localhost:3000/document?params={"docId":"docId1","regId":"signer1","tmpDocId":"","docPath":"http://localhost:8888/escDoc/pdf/sample.pdf","docName":"테스트.pdf","signers":[{"signerId":"signer1","signerNm":"생성자","signerNo":1},{"signerId":"user2","signerNm":"유저2","signerNo":2},{"signerId":"user3","signerNm":"유저3","signerNo":3},{"signerId":"user4","signerNm":"유저4","signerNo":4},{"signerId":"user5","signerNm":"유저5","signerNo":5},{"signerId":"user6","signerNm":"유저6","signerNo":6}]}'}>포탈 호출 생성자 페이지</a></p>
        <p><a href={'http://localhost:3000/document?params={"docId":"190006","regId":"signer1","tmpDocId":"190001","docPath":"http://localhost:8888/escDoc/pdf/sample.pdf","docName":"테스트.pdf","signers":[{"signerId":"signer1","signerNm":"생성자","signerNo":1},{"signerId":"user2","signerNm":"유저2","signerNo":2},{"signerId":"user3","signerNm":"유저3","signerNo":3},{"signerId":"user4","signerNm":"유저4","signerNo":4},{"signerId":"user5","signerNm":"유저5","signerNo":5},{"signerId":"user6","signerNm":"유저6","signerNo":6}]}'}>포탈 호출 생성자 템플릿 페이지</a></p>
        <p><a href={'/contract?docNo=190001&signerNo=signer1'}>서명자 페이지</a></p>
        <p><a href={'/complete?docNo=190001&signerNo=signer1'}>생성자 확인 페이지</a></p>
        {/* <p><a href={'http://localhost:8888/v1/document/doc1/signComplete1/signer1'}>pdf생성</a></p> */}
      </div>
    );
  }
}

export default Index;
