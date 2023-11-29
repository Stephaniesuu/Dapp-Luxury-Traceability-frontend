// export const buttonStyles = {
//   components: {
//     Button: {
//       variants: {
//         "no-hover": {
//           _hover: {
//             boxShadow: "none",
//           },
//         },
//         "transparent-with-icon": {
//           bg: "transparent",
//           fontWeight: "bold",
//           borderRadius: "inherit",
//           cursor: "pointer",
//           _hover: "none",
//           _active: {
//             bg: "transparent",
//             transform: "none",
//             borderColor: "transparent",
//           },
//           _focus: {
//             boxShadow: "none",
//           },
//           _hover: {
//             boxShadow: "none",
//           },
//         },
//       },
//       baseStyle: {
//         borderRadius: "15px",
//         _focus: {
//           boxShadow: "none",
//         },
//       },
//     },
//   },
// };

export const buttonStyles = {
  components: {
    Button: {
      variants: {
        "no-hover": {
          _hover: {
            boxShadow: "none",
          },
        },
        "transparent-with-icon": {
          bg: "transparent",
          fontWeight: "bold",
          borderRadius: "inherit",
          cursor: "pointer",
          _hover: {
            // bg: "linear-gradient(45deg, rgba(255,0,0,0.6), rgba(0,0,255,0.6))", // 添加渐变背景
            color: "#FFF", // 改变文本颜色
            transform: "scale(1.05)", // 轻微放大
          },
          _active: {
            bg: "transparent",
            transform: "none",
            borderColor: "transparent",
          },
          _focus: {
            boxShadow: "0 0 0 3px rgba(66,153,225,0.6)", // 焦点时的外阴影
          },
        },
      },
      baseStyle: {
        borderRadius: "15px",
        _focus: {
          boxShadow: "none",
        },
        // boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)", // 默认阴影
        transition: "all 0.2s ease-in-out", // 平滑过渡
      },
    },
  },
};
