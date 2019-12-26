// Nodejs encryption with CTR
const cryp = require('crypto');
const algorithm = 'aes-256-cbc';
const key = cryp.randomBytes(32);
const iv = cryp.randomBytes(16);

function encrypt(text:any) {
    let cipher = cryp.createCipheriv('aes-256-cbc', Buffer.from(key), iv);
    let encrypted = cipher.update(text);
    encrypted = Buffer.concat([encrypted, cipher.final()]);
    return { iv: iv.toString('hex'), key: key.toString('hex'),encryptedData: encrypted.toString('hex') };
}

function decrypt(iv:any,encryptedText:any,key:any) {
    let decipher = cryp.createDecipheriv('aes-256-cbc', Buffer.from(key), iv);
    console.log("iv ok :"+decipher);    
    let decrypted = decipher.update(encryptedText);
    console.log("decrypted ok :"+decrypted);
    decrypted = Buffer.concat([decrypted, decipher.final()]);
    return decrypted.toString();
}

module.exports.encrypt = encrypt;
module.exports.decrypt = decrypt;

var hw = encrypt("Some serious stuff")
console.log(hw)
// console.log(decrypt(hw))