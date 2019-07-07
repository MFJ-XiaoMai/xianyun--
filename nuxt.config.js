import pkg from "./package"
export default {
  mode: "universal",
  /*
   ** Headers of the page
   */
  head: {
    // title: process.env.npm_package_name || '',
    // 修改网页名
    title: "闲云旅游网",
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { hid: "description", name: "description", content: pkg.description }
    ],
    link: [
      { rel: "icon", type: "image/x-icon", href: "/favicon.ico" },
      {
        rel: "stylesheet",
        type: "text/css",
        href: "//at.alicdn.com/t/font_1168872_ehvuah8v57g.css"
      }
      //新增全局字体样式
    ]
  },
  /*
   ** Customize the progress-bar color
   */
  loading: { color: "#fff" },
  /*
   ** Global CSS
   */
  css: [
    "element-ui/lib/theme-chalk/index.css",
    "assets/main.css", //新增页面过渡样式
    "quill/dist/quill.snow.css",
    "quill/dist/quill.bubble.css",
    "quill/dist/quill.core.css"
  ],
  /*
   ** Plugins to load before mounting the App
   */
  plugins: [
    "@/plugins/element-ui",
    { src: "@/plugins/localStorage", ssr: false },
    { src: "@/plugins/vue-quill-editor", ssr: false },
    "@/plugins/axios"
  ],
  /*
   ** Nuxt.js modules
   */
  modules: [
    // Doc: https://axios.nuxtjs.org/usage
    "@nuxtjs/axios"
  ],
  /*
   ** Axios module configuration
   ** See https://axios.nuxtjs.org/options
   */
  axios: {
    // baseURL:"http://127.0.0.1:1337"
    baseURL: "http://157.122.54.189:9095"
  },
  /*
   ** Build configuration
   */
  build: {
    transpile: [/^element-ui/],
    /*
     ** You can extend webpack config here
     */
    extend(config, ctx) {}
  }
};
