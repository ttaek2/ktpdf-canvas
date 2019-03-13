import ApiFetch from "../ApiFetch";
import apiPath from "../enum/apiPath";

export async function setDocumentInfo(documentNo: number, data): Promise<object> {
  const DOCUMENT_INFO_API_PATH = `${apiPath.CONTRACT.DOCUMENT}/doc${documentNo}`;

  
  const config = {};
  // const config = { headers: {'Authorization': "Bearer " + cookies.get('token')}};


  const fetch = new ApiFetch(DOCUMENT_INFO_API_PATH, {elements: data}, config);
  return fetch.post().then((response: any) => {
      console.log(response);
      return response.data;
    }, (error) => {
      alert(error);
      console.log(error)
    }
  )
}