module.exports = {
    // 关闭线上源码
   
      devServer: {
       disableHostCheck:true,
       port:5000,
       host:'0.0.0.0',
       https:false,
       open:false,
      //  proxy:{
      //   'api':{
      //     target: 'http://10.160.181.146:5000',
      //     changeOrigin: true,
      //     pathRewrite: {
      //         '^/api': ""
      //     }
      //   }
      //  }
    },
}