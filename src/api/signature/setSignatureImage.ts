import ApiFetch from "../ApiFetch";
import apiPath from "../enum/apiPath";

export async function setSignatureImage(signerNo: string, signType: string, base64: string) : Promise<object> {
  console.log('requesting setSignatureImage');
  const SIGNATURE_INFO_API_PATH = `${apiPath.SIGNATURE.SIGNER}/${signerNo}/signs/${signType}`;
  const config = {};
  // const config = { headers: {'Authorization': "Bearer " + cookies.get('token')}};

  const data = {
    signImg: base64
  };

  const fetch = new ApiFetch(SIGNATURE_INFO_API_PATH, data, config);
  return fetch.post().then((response : any)=>{
      console.log('response(setSignatureImage)=======================');
      console.log(response);
      return response.data;
    },(error) => { console.log(error) }
  )
}