import crypto from "crypto";
import fs from "fs";

/**LAMBDA*/
/*   // Simula la recepción del payload desde el cliente
  const payload = {
    token: "token_cifrado_recibido",
    signature: "firma_recibida",// Clave pública del cliente para verificación
  }; */
export const payloadDecrypt = (payload) => {
  try {
    // 1. Cargar la clave privada de la Lambda protegida con contraseña
    const lambdaPrivateKey = crypto.createPrivateKey({
      key: fs.readFileSync(
        "./modules/Libraries/cryptography/Host/lambda_private_key.pem",
        "utf-8"
      ),
      format: "pem",
      passphrase: process.env.PRIVATE_KEY_PASS, // Clave que protege el archivo .pem de la Lambda
    });

    // 2. Desencriptar el token con la clave privada de la Lambda
    function decryptData(encryptedData) {
      const decrypted = crypto.privateDecrypt(
        {
          key: lambdaPrivateKey,
          padding : crypto.constants.RSA_PKCS1_OAEP_PADDING,
          oaepHash: "sha256",
        },
        Buffer.from(encryptedData, "base64")
      );
      return decrypted.toString();
    }

    const decryptedData = decryptData(payload.token);

    // 3. Verificar la firma con la clave pública del cliente
    function verifySignature(token, signature, clientPublicKey) {
      const verify = crypto.createVerify("SHA256");
      verify.update(token);
      verify.end();

      return verify.verify(clientPublicKey, signature, "base64");
    }

      const credential = crypto
        .createHmac("sha256", process.env.PRIVATE_KEY_PASS)
        .update(process.env.USER_PEM + process.env.PRIVATE_KEY_PASS)
        .digest("hex");

    const isValidSignature = verifySignature(
      payload.token,
      payload.signature,
      fs.readFileSync("./modules/Libraries/cryptography/Host/client_public_key.pem", "utf-8"), // Carga la clave pública del cliente
    );

    if (!isValidSignature) {
      throw new Error("Firma no válida, el token no es de confianza.");
    }

    const { credentials, expirationTime } = JSON.parse(decryptedData);

    if (credentials !== credential) {
      throw new Error("Credenciales no válidas, el token no es de confianza.");
    }

    if (Date.now() - expirationTime > 10000) {
      throw new Error("Token expirado, el token no es de confianza.");
    }
    
    return {
      valid: true,
      message: "authorized",
    };
  } catch (error) {
    return {
      valid: false,
      message: error.message,
    };
  }
};

/* payloadDecrypt(payloadToken()); */