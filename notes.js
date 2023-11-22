// to use import express from 'express' you have to write type:"module" in package.json


//To avoid cors error we can use this, add this to vite.config
// add server:{
//     proxy:{
//         '/api':"http://localhost:3000"
//     }
// }         // to learn more search vite proxy, other ways of cors is to use whiteList 

// since we are using moduleJS, so dotenv wont work simply, u have to use this : -r dotenv/config --experimental-json-modules  in package.json

// "start": "nodemon  -r dotenv/config --experimental-json-modules src/index.js"
// import  dotenv from 'dotenv'
// dotenv.config({path:'./env'});