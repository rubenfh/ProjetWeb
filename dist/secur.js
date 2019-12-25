"use strict";
// Nodejs encryption with CTR
var cryp = require('crypto');
var algorithm = 'aes-256-cbc';
var key = cryp.randomBytes(32);
var iv = cryp.randomBytes(16);
function encrypt(text) {
    var cipher = cryp.createCipheriv('aes-256-cbc', Buffer.from(key), iv);
    var encrypted = cipher.update(text);
    encrypted = Buffer.concat([encrypted, cipher.final()]);
    return { iv: iv.toString('hex'), encryptedData: encrypted.toString('hex') };
}
function decrypt(text) {
    var iv = Buffer.from(text.iv, 'hex');
    var encryptedText = Buffer.from(text.encryptedData, 'hex');
    var decipher = cryp.createDecipheriv('aes-256-cbc', Buffer.from(key), iv);
    var decrypted = decipher.update(encryptedText);
    decrypted = Buffer.concat([decrypted, decipher.final()]);
    return decrypted.toString();
}
var hw = encrypt("Some serious stuff");
console.log(hw);
console.log(decrypt(hw));
