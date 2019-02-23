## 效果展示链接（pc端请切换到移动端模式体验最佳效果）[点击跳转至页面](http://120.77.242.99/zumeng) 

## 技术栈
* ### 使用Vue-Cli脚手架搭建项目，以下为常用命令
  * 创建项目：vue init webpack [项目名]
  * 安装所有模块：npm/cnpm install
  * 开发环境运行项目：npm/cnpm  run dev
  * 打包成生厂用文件： npm/cnpm  run build
  
* ### 使用vue-router配置路由

* ### 使用vuex配置全局状态（数据）

* ### JS使用ES6规范

* ### 使用axios实现异步请求

* ### 基于Vue的组件库
  * mint-ui组件库
  * vue-awesome-swiper: 轮播图组件
  * vuescroll: 实现下拉刷新，上拉加载功能
  * vue-awesome-picker：实现下拉列表选择功能
  * monent: 用于格式化日期、时间
  
* ### 使用Flex + Less来写UI样式，使用Rem实现自适应效果，其核心代码如下：
```javascript
        // 默认以750px的设计搞作为参照尺寸，其html的fontSize大小为100px,实现如下:                
        fnResize();          
        window.onresize = function () {          
            fnResize()          
        };          
        function fnResize() {          
            var deviceWidth = document.documentElement.clientWidth || window.innerWidth;          
            if (deviceWidth >= 750) {          
                deviceWidth = 750          
            }          
            if (deviceWidth <= 320) {          
                deviceWidth = 320          
            }          
            document.documentElement.style.fontSize = (deviceWidth / 7.5) + 'px';          
        }
```

* ### 使用NodeJS的express框架实现本地数据mock

* ### 使用Hbuilder打包成APP，分IOS和Andriod系统，配置步骤如下
  * 打包到Andriod手机步骤  
    * npm run build生成dist包
    * 使用Hbuilder打开该dist包（可重命名）
    * 发行为原生安装包ipa
    * 使用安卓手机打开该ipa文件
  * 打包到IOS手机步骤
    * npm run build生成dist包
    * 申请一个Apple ID
    * 使用 Appuploader申请IOS测试证书（ p12）,教程：https://blog.csdn.net/xxw888/article/details/76083152
    * 使用 Appuploader申请IO描述文件（ mobileprovision），教程：https://blog.csdn.net/xxw888/article/details/76083152
    * 使用Hbuilder将打包生成的dist发行为原生安装包ipa
    * 安装ipa,使用爱思助手，下载地址：https://www.i4.cn/
    
## 踩过的坑
* ### js直接引入assets中的图片路径加载不出图片
  该问题出现是因为，webpack打包时会将assets中的图片文件一起打包引起，使用require来引用图片；会解决该问题。

* ### 开发环境中不能调用服务端接口
  该问题由浏览器同源策略从而对请求进行阻挡导致，在开发环境中的ProxyTable做相应配置即可解决该问题，比如：
  ```javascript
      proxyTable: {
          '/api': {
              target: 'http://39.108.253.177:9300',   // 代理地址
              changeOrigin: true, // 可否跨域
              pathRewrite: {  // 重写地址
                  '^/api': ''
              }
          }
      },
  ```

* ### 当前页面返回到上一个页面时，上一个页面的配置被清空
  这个问题是由于之前配置的页面没有被缓存导致，该问题可以通过keep-alive标签和生命周期activated配合使用解决。
  1. 使用keep-alive标签使其包裹组件缓存,App.vue组件中的配置
  ```javascript
      <div id="app">
          <keep-alive>
              <router-view v-if="$route.meta.keepAlive"></router-view>
          </keep-alive>
          <router-view v-if="!$route.meta.keepAlive"></router-view>
      </div>
  ```
  2. 使用生命周期中的activated更新不需要被缓存的数据，houseDemand.vue中的设置
  ```javascript
      activated() {
          if (this.$route.params.name) {
              this.place = this.$route.params.name;
          }
      },
  ```



