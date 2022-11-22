const {default: mongoose} = require(`mongoose`);
const { default: next } = require('next');


/** @type {import('next').NextConfig} */



const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images:{
    domains:["maps.googleapis.com",'firebasestorage.googleapis.com']
  },
  rewrites:async ()=>{
    return [{
      source:'/google/autoComplete',
      destination:'https://maps.googleapis.com/maps/api/place/autocomplete/json'
    },
    {
      source:'/google/details',
      destination:'https://maps.googleapis.com/maps/api/place/details/json'

    }
  

  ]
  }
}



module.exports = ()=>{
  const MONGODB_URI = process.env.MONGODB_URI;

  mongoose.connect(MONGODB_URI, {dbName:`airbnbClone`})
  .then(()=>{("mongoose Initialized")})

  return nextConfig;
}


