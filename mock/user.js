const Mock = require("mockjs");

const Random = Mock.Random;

module.exports = [
  {
    // 获取用户信息
    url: "/api/user/info",
    method: "get",
    response: (ctx) => {
      const token = ctx.request.headers["authorization"]
        .replace("Bearer", "")
        .replace(" ", "");

      return {
        errno: 0,
        data: {
          username: token ? Random.title() : "",
          nickname: token ? Random.cname() : "",
        },
      };
    },
  },
  {
    // 注册
    url: "/api/user/register",
    method: "post",
    response: () => {
      return {
        errno: 0,
      };
    },
  },
  {
    // 登录
    url: "/api/user/login",
    method: "post",
    response: () => {
      return {
        errno: 0,
        data: {
          token: Random.word(20),
        },
      };
    },
  },
];
