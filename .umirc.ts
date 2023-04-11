import {defineConfig} from 'umi';

const AntdDayjsWebpackPlugin = require('antd-dayjs-webpack-plugin');
export default defineConfig({
  publicPath:'./',
  history:{type:"hash"},
  nodeModulesTransform: {
    type: 'none',
  },
  // routes: [
  //   {path: '/', component: '@/pages/index'},
  //   {path: '/bigScreen', component: '@/pages/BigScreen/index'}
  // ],

  mfsu: {},
  fastRefresh: {},
  antd:{
    dark: true
  },
  theme:{
    'bg-color':'#101129',
    'active-color':'#68d8fe',
  },
  chainWebpack:()=>({
    plugins:[
      new AntdDayjsWebpackPlugin()
    ]
  })
});
