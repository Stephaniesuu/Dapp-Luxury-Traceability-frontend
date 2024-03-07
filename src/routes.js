
import SignIn from "views/Auth/SignIn.js";
import SignUp from "views/Auth/SignUp.js";
import NoAccess from "views/Auth/Noaccess.js";
import Mining from "views/Diamond/MiningCompany/Mining";
import OwnMined from "views/Diamond/MiningCompany/OwnMinedDiamond";
import CuttingCompany from "views/Diamond/CuttingCompany/Cutting";
import GradingLab from "views/Diamond/GradingLab/Grading";
import Jewelrymaker from "views/Diamond/Jewelrymaker/OwnCollectedDiamond";
import JewelrymakerShop from "views/Diamond/Jewelrymaker/DiamondShop";
import CustomerOwnership from "views/Diamond/Customer/OwnJewelry";
import CustomerShop from "views/Diamond/Customer/CustomerShop";


import {
  HomeIcon,
  CreditIcon,
  PersonIcon,
  DocumentIcon,
  RocketIcon,
} from "components/Icons/Icons";

var routes = 
  {
  //different roles routes
  "mining": [
    {
      path: "/mining/dashboard",
      name: "TO MINE",
      icon: <CreditIcon color="inherit" />,
      component: Mining,
      layout: "/admin",
      roles: ["mining"], 
    },
    {
      path: "/mining/OwnMined",
      name: "YOUR MINDED 💎 ",
      icon: <HomeIcon color="inherit" />,
      component: OwnMined,
      layout: "/admin",
      roles: ["mining"], 
    }

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
      component: JewelrymakerShop,
      layout: "/admin",
      roles: ["jewelrymaker"], 

  
    },
 
  ],
  "customer": [
    {
      path: "/customer/dashboard",
      name: "YOUR JEWElRIES 💍", 
      icon: <HomeIcon color="inherit" />,
      component: CustomerOwnership,
      layout: "/admin",
      roles: ["customer"], 
    },

    {
      path: "/customer/shop",
      name: "JEWElRY SHOP",
      icon: <HomeIcon color="inherit" />,
      component: CustomerShop,
      layout: "/admin",
      roles: ["customer"],
    },
  ],

  "noaccess": [{
    path: "/noAccess",
    name: "No access",
    icon: <DocumentIcon color="inherit" />,
    component: NoAccess,
    layout: "/auth",
  }],

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

  ],


};

export default routes;