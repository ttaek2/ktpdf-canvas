import ApiFetch from "../ApiFetch";
import apiPath from "../enum/apiPath";

// export async function setCompleteInfo(documentNo: number, signerNo: string, data):Promise<object> {
export async function setCompleteInfo(documentNo: number, signerNo: string):Promise<object> {
  // const DOCUMENT_INFO_API_PATH = `${apiPath.CONTRACT.DOCUMENT}/doc${documentNo}/signer/${signerNo}`;
  const DOCUMENT_INFO_API_PATH = `${apiPath.CONTRACT.DOCUMENT}/${documentNo}/signComplete/${signerNo}`;
  const config = {};
  // const config = { headers: {'Authorization': "Bearer " + cookies.get('token')}};

  // const fetch = new ApiFetch(DOCUMENT_INFO_API_PATH, data, config);
  const fetch = new ApiFetch(DOCUMENT_INFO_API_PATH, config);
  return fetch.post().then((response : any)=>{
      return response.data;
    },(error) => { console.log(error) }
  )
}