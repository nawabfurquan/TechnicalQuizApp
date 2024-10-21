import CryptoJS from 'crypto-js';

const secretKey = process.env.REACT_APP_SECRET_KEY
  ? process.env.REACT_APP_SECRET_KEY
  : crypto.randomUUID();

export const encryptData = (plainData) => {
  const encryptedData = CryptoJS.AES.encrypt(JSON.stringify(plainData), secretKey).toString();
  return encryptedData;
};

export const decryptData = (encryptedData) => {
  const plainData = CryptoJS.AES.decrypt(encryptedData, secretKey).toString(CryptoJS.enc.Utf8);
  return JSON.parse(plainData);
};
