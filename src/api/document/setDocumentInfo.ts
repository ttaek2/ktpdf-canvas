import ApiFetch from "../ApiFetch";
import apiPath from "../enum/apiPath";

export async function setDocumentInfo(documentNo: string, docName, fileName, documentUrl, userId, data): Promise<object> {
  const DOCUMENT_INFO_API_PATH = `${apiPath.CONTRACT.DOCUMENT}/${documentNo}`;

  
  const config = {};
  // const config = { headers: {'Authorization': "Bearer " + cookies.get('token')}};


  const fetch = new ApiFetch(DOCUMENT_INFO_API_PATH, {docName:docName, fileName:fileName, filePath:documentUrl, userId:userId, elements: data}, config);
  return fetch.post().then((response: any) => {
      console.log(response);
      return response.data;
    }, (error) => {
      alert(error);
      console.log(error)
    }
  )
}