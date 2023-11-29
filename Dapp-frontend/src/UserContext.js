import React, { createContext, useState, useContext } from 'react';

// 创建用户上下文
const UserContext = createContext(null);

// 用户提供者组件，用于提供用户信息和角色
export const UserProvider = ({ children }) => {
  // 从 localStorage 中获取用户信息
    // 添加用户角色状态
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('currentUser')));
  const [role, setRole] = useState("");

  // 登录方法，用于设置用户信息和角色
  const login = (userData) => {
    setUser(userData); // 设置用户信息
    setRole(userData.role); // 设置用户角色
  };

  // 提供用户信息、设置用户信息的方法和用户角色
  return (
    <UserContext.Provider value={{ user, setUser, login, role }}>
      {children}
    </UserContext.Provider>
  );
};

// 自定义 hook 用于访问用户上下文
export const useUser = () => {
  return useContext(UserContext);
};

export default UserContext;
