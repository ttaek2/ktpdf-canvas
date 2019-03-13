import ApiFetch from "../ApiFetch";
import apiPath from "../enum/apiPath";

export async function getSignatureImage(signerNo: number, signType: string) : Promise<object> {
  const SIGNATURE_INFO_API_PATH = `${apiPath.SIGNATURE.SIGNER}/${signerNo}/${signType}`;
  const config = {};
  // const config = { headers: {'Authorization': "Bearer " + cookies.get('token')}};

  const fetch = new ApiFetch(SIGNATURE_INFO_API_PATH, null, config);
  return fetch.get().then((response : any)=>{
      return response.data;
    },(error) => { console.log(error) }
  )
}