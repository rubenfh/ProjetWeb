"use strict";
var mongoose = require('mongoose');
var cryp = require('./secur');
var userSchema = new mongoose.Schema({
    email: {
        type: String,
        trim: true,
        required: true,
        unique: true,
        lowercase: true
    },
    password: {
        type: String,
        required: true
    },
    firstName: {
        type: String,
        trim: true,
        required: true,
    },
    lastName: {
        type: String,
        trim: true,
        required: true,
    }
});
//  userSchema.pre('save',function(this: any, next:any){
//     this.password= encrypt(this.password)
//     next();
//  });
//  userSchema.methods.comparePassword= function(candidatePassword:any){
//      return new Promise((resolve:any,reject:any)=>{
//          this.password=decrypt(this.password)
//          if(this.password!=candidatePassword){
//              reject(false);
//          }
//          else{
//              resolve(true);
//          }
//      }
//      )
//  }
var User = mongoose.model('User', userSchema);
module.exports = User;
