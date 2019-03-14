import ApiFetch from "../ApiFetch";
import apiPath from "../enum/apiPath";

export async function getDocumentInfo(documentNo: string) {
  if(!documentNo) return false;

  const DOCUMENT_INFO_API_PATH = `${apiPath.CONTRACT.DOCUMENT}/${documentNo}`;
  console.log('DOCUMENT_INFO_API_PATH = ' + DOCUMENT_INFO_API_PATH);
  const config = {};

  const fetch = new ApiFetch(DOCUMENT_INFO_API_PATH, null, config);
  return fetch.get().then((response : any)=>{
    console.log('response=======================================');
    console.log(response);
      return response.data;
    },(error) => { console.log(error) }
  )
}