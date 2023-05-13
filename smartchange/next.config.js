/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  middleware:[
    {
      name:'auth',
      path:'/',
      handler: '~/middleware.ts'
      }
  ]
};
