const crypto=require("crypto"),
  secret_key = 'hchow521',
  secret = {
    set(word){
      const cipher = crypto.createCipher('aes192', secret_key);
      let encrypted = cipher.update(word, 'utf8', 'hex');
      encrypted += cipher.final('hex');
      return encrypted;
    },
    //解密
    get(word){
      const decipher = crypto.createDecipher('aes192', secret_key);
      let decrypted = decipher.update(word, 'hex', 'utf8');
      decrypted += decipher.final('utf8');
      return decrypted;
    }
  }

module.exports=exports=secret;