// import
import Dashboard from "views/Dashboard/Dashboard";
// import Tables from "views/Dashboard/Tables";
// import Profile from "views/Dashboard/Profile";
import SignIn from "views/Auth/SignIn.js";
import SignUp from "views/Auth/SignUp.js";

// import MiningCompany from "views/Diamond/MiningCompany";
import Mining from "views/Diamond/MiningCompany/Mining";
import OwnMined from "views/Diamond/MiningCompany/OwnMinedDiamond";
import CuttingCompany from "views/Diamond/CuttingCompany";
import GradingLab from "views/Diamond/GradingLab";
import Jewelrymaker from "views/Diamond/Jewelrymaker/index";
import Jewelrymaker_shop from "views/Diamond/Jewelrymaker/JewelryShop";
import CustomerOwnership from "views/Diamond/Customer";
import CustomerShop from "views/Diamond/Customer/CustomerShop";




import {
  HomeIcon,
  StatsIcon,
  CreditIcon,
  PersonIcon,
  DocumentIcon,
  RocketIcon,
  SupportIcon,
} from "components/Icons/Icons";

var routes = 
  {
  "general": [
    {
      path: "/dashboard",
      name: "Dashboard",
      icon: <HomeIcon color="inherit" />,
      component: Dashboard,
      layout: "/admin",
    },
    // 其他通用路由
  ],
  "0": [
    {
      path: "/mining/dashboard",
      name: "TO MINE",
      icon: <HomeIcon color="inherit" />,
      component: Mining,
      layout: "/admin",
      roles: ["0"], 
    },
    {
      path: "/mining/OwnMined",
      name: "YOUR MINDED 💎 ",
      icon: <HomeIcon color="inherit" />,
      component: OwnMined,
      layout: "/admin",
      roles: ["0"], 
    }
    // 矿业公司的其他路由
  ],
  "cutting": [
    {
      path: "/cutting/dashboard",
      name: "TO CUT",
      icon: <HomeIcon color="inherit" />,
      component: CuttingCompany,
      layout: "/admin",
      roles: ["cutting"], 
    },
    // 切割公司的其他路由
  ],
  "grading": [
    {
      path: "/grading/dashboard",
      name: "TO CARVE",
      icon: <HomeIcon color="inherit" />,
      component: GradingLab,
      layout: "/admin",
      roles: ["grading"], 
    },
    // 分级实验室的其他路由
  ],
  "jewelrymaker": [
    {
      path: "/jewelrymaker/dashboard",
      name: "DESIGN LAB",
      icon: <PersonIcon color="inherit" />,
      component: Jewelrymaker,
      layout: "/admin",
      roles: ["jewelrymaker"], 
    },
    {
      path: "/jewelrymaker/shop",
      name: "DIAMOND SHOP",
      icon: <RocketIcon color="inherit" />,
      component: Jewelrymaker_shop,
      layout: "/admin",
      roles: ["jewelrymaker"], 

      // component 和 layout 根据您的实际情况进行设置
    },
    // 珠宝制造商的其他路由
  ],
  "customer": [
    {
      path: "/customer/dashboard",
      name: "YOUR JEWElRIES 💍", 
      icon: <HomeIcon color="inherit" />,
      component: CustomerOwnership,
      layout: "/admin",
      roles: ["customer"], // 允许 customer 角色访问
    },
    // 客户的其他路由
    {
      path: "/customer/shop",
      name: "JEWElRY SHOP",
      icon: <HomeIcon color="inherit" />,
      component: CustomerShop,
      layout: "/admin",
      roles: ["customer"], // 允许 customer 角色访问
    },
  ],

  "account": [
    {
      path: "/signin",
      name: "Sign In",
      icon: <DocumentIcon color="inherit" />,
      component: SignIn,
      layout: "/auth",
    },
    {
      path: "/signup",
      name: "Sign Up",
      icon: <RocketIcon color="inherit" />,
      component: SignUp,
      layout: "/auth",
    },
    // 其他账户相关路由
  ],
};

export default routes;