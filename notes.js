// to use import express from 'express' you have to write type:"module" in package.json


//To avoid cors error we can use this, add this to vite.config
// add server:{
//     proxy:{
//         '/api':"http://localhost:3000"
//     }
// }         // to learn more search vite proxy, other ways of cors is to use whiteList 