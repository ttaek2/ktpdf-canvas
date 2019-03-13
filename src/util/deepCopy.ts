export const deepCopy = (oldValue)=>{
  const stringValue = JSON.stringify(oldValue);
  return JSON.parse(stringValue);
};