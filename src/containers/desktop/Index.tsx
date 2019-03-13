import * as React from "react";
class Index extends React.Component<{}, React.ComponentState> {
  public render(): JSX.Element {
    return (
      <div>
        <p><a href={'/document?docNo=1'}>생성자 페이지</a></p>
        <p><a href={'/contract?docNo=1&signerNo=signer1'}>서명자 페이지</a></p>
        {/* <p><a href={'http://localhost:8888/v1/document/doc1/signComplete1/signer1'}>pdf생성</a></p> */}
      </div>
    );
  }
}

export default Index;
