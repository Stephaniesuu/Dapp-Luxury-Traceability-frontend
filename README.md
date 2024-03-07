# Dapp-frontend



## 技术栈

* React 
* Purity UI 
* animate.css 



## 功能


实现钻石溯源系统，为每件奢侈品的生命周期提供透明的审计跟踪。


* [x] 身份认证：注册、登陆界面

* [x] 不同角色的不同页面：
   1. 挖矿公司：挖矿——开产钻石
   2. 切割公司：对原石进行切割、抛光——第一步加工
   3. 雕刻公司：对原石进行激光雕刻，雕刻内容是唯一ID——第二步加工
   4. 首饰制造厂：
      * 商城界面：购买原石
      * dashboard：
        1. 管理、查看当前拥有的原石，对其进行设计，将钻石镶嵌至珠宝中。
        2. 发行（签署数字签名）数字证书
        3. 转让数字证书。
   5. 顾客：
      * 商城界面：购买首饰
      * dashboard：管理、查看当前拥有的首饰，展示钻石对应的数字证书，轻松验证其真实性。
     
* 一些小细节
   * [x] 添加翻页：控制表单的item显示个数，每一页最多5个。
   * [ ] 添加web3钱包。
   * [ ] 前后端连接
      * [ ] 首饰制造厂
      * [ ] 顾客



## 特点

1. 基于角色的访问控制：登陆时，若用户名、密码在后端数据库中能被检索到，则使用Context获取用户角色，重定向到角色对应页面。确保每个用户只看到与其角色相关的内容。

2. 用于用户管理的 React Context：采用 React Context 在整个应用程序中有效地管理与用户相关的信息。具体来说，登录后，我们会在上下文中存储必要的用户角色数据，以便在登录后无缝访问用户的角色信息。这些信息可以方便各种操作，比如获取用户的 web3 address。

3. 利用 useToast 显示消息通知：将后端服务器的response显示出来。无论是成功操作还是错误操作，用户都会收到简洁明了的通知，从而使应用程序更加人性化。
   
4. 响应式布局



## 安全考虑

1. 数据库存储密码以加密方式存储。
2. 避免直接输入特定url跳转。



## quick start

```
# Installation of dependent libraries
yarn install
#or 
npm install

# You can use --force if there are some version conflicts about dependencies 
yarn install --force

# start 
npm run start

# enter url:http://localhost:3000 
# or http://127.0.0.1:3000/ 

```


## file tree

```
.
├── README.md
├── build
├── gulpfile.js
├── jsconfig.json
├── package-lock.json
├── package.json
├── public
│   ├── favicon.ico
│   ├── index.html
│   └── manifest.json
├── src
│   ├── UserContext.js
│   ├── assets
│   ├── components
│   ├── index.js
│   ├── layouts
│   │   ├── Admin.js
│   │   └── Auth.js
│   ├── routes.js
│   ├── theme
│   └── views
│       ├── Auth
│       │   ├── SignIn.js
│       │   └── SignUp.js
│       ├── Dashboard
│       │   └── Profile
│       └── Diamond
│           ├── Customer
│           ├── CuttingCompany
│           ├── GradingLab
│           ├── Jewelrymaker
│           ├── MiningCompany
│           └── components
└── yarn.lock

```





