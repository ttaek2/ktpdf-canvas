enum DOMAIN {
  // HOSTNAME = 'http://13.209.43.245',

  HOSTNAME = 'http://localhost',
  PORT = '8888'
  // PORT = '8888/canvas'
  
  // HOSTNAME = 'http://192.168.0.33',
  // PORT = '8080'
};

enum CONTRACT {
  DOCUMENT = '/v1/document' // v1/document/{documentNo}
  ,SIGNER = '/signer' // v1/document/{documentNo}/signer/{signerNo}
};

enum SIGNATURE {
  SIGNER = '/v1/signer' // v1/signer/{signerNo}/{signType}
  ,SIGN = '/sign' // v1/signer/{signerNo}/sign
  ,STAMP = 'stamp' // v1/signer/{signerNo}/stamp
};

export default {
  DOMAIN,
  CONTRACT,
  SIGNATURE
};