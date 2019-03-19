import ApiFetch from "../ApiFetch";
import apiPath from "../enum/apiPath";

export async function getDocumentInfoForSigner(documentNo: string, signerNo: string):Promise<object> {
  // const DOCUMENT_INFO_API_PATH = `${apiPath.CONTRACT.DOCUMENT}/doc${documentNo}/signer/${signerNo}`;
  const DOCUMENT_INFO_API_PATH = `${apiPath.CONTRACT.DOCUMENT}/${documentNo}/signer/${signerNo}`;
  // console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>");
  // console.log(DOCUMENT_INFO_API_PATH);
  // console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>");
  const config = {};
  // const config = { headers: {'Authorization': "Bearer " + cookies.get('token')}};

  const fetch = new ApiFetch(DOCUMENT_INFO_API_PATH, null, config);
  return fetch.get().then((response : any)=>{      
      return response.data;
    },(error) => { console.log(error) }
  )
}