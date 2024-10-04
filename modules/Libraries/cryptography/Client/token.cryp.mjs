import crypto from "crypto";
import fs from "fs";
/*CLIENTE */
export const payloadToken = (dataToCrypt) => {
  // 1. Cargar las claves
  const clientPrivateKey = crypto.createPrivateKey({
    key: fs.readFileSync(
      "./modules/Libraries/cryptography/Client/client_private_key.pem",
      "utf-8"
    ),
    format: "pem",
    passphrase: process.env.PRIVATE_KEY_PASS,
  }); // Clave privada del cliente
  const lambdaPublicKey = fs.readFileSync(
    "./modules/Libraries/cryptography/Client/lambda_public_key.pem",
    "utf-8"
  ); // Clave pública del Lambda

  // 2. Información que se va a cifrar
  const credential = crypto
  .createHmac("sha256", process.env.PRIVATE_KEY_PASS)
  .update(process.env.USER_PEM + process.env.PRIVATE_KEY_PASS)
  .digest("hex");
  const userData = JSON.stringify({
    credentials: credential,
    expirationTime: Date.now() + 10 * 1000,
  });

  // 3. Cifrar los datos con la clave pública del Lambda
  function encryptData(data) {
    const encrypted = crypto.publicEncrypt(
      {
        key: lambdaPublicKey,
        padding: crypto.constants.RSA_PKCS1_OAEP_PADDING,
        oaepHash: "sha256",
      }
      , Buffer.from(data));
    return encrypted.toString("base64");
  }

  const encryptedToken = encryptData(userData);

  // 4. Firmar el token cifrado con la clave privada del cliente
  function signToken(token) {
    const sign = crypto.createSign("SHA256");
    sign.update(token);
    sign.end();

    const signature = sign.sign(clientPrivateKey, "base64");
    return signature;
  }

  const signature = signToken(encryptedToken);

  // Crear el payload para enviar a la Lambda
  const payload = {
    token: encryptedToken, // Token cifrado
    signature: signature, // Firma del token
  };

  //Esto podría ser mediante una llamada HTTP POST
  /* console.log("Payload enviado a la Lambda:", payload); */
  return payload;
};
