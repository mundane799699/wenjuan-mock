const Mock = require("mockjs");
const getQuestionList = require("./data/getQuestionList");
const getComponentList = require("./data/getComponentList");
const Random = Mock.Random;

module.exports = [
  {
    // 获取单个问卷信息
    url: "/api/question/:id",
    method: "get",
    response() {
      return {
        errno: 0,
        data: {
          id: Random.id(),
          title: Random.ctitle(),
          desc: Random.cparagraph(),
          js: Random.cparagraph(),
          css: Random.cparagraph(),
          isPublished: true,
          // isPublished: false,
          componentList: getComponentList(),
        },
        // errno: 1002,
        // msg: "题目不存在",
      };
    },
  },
  {
    url: "/api/question",
    method: "post",
    response() {
      return {
        errno: 0,
        data: {
          id: Random.id(),
        },
      };
    },
  },
  {
    // 获取（查询）问卷列表
    url: "/api/question",
    method: "get",
    response(ctx) {
      const { query = {} } = ctx;
      const isDeleted = isUndefinedOrNull(query.isDeleted)
        ? query.isDeleted
        : query.isDeleted === "true";
      const isStar = isUndefinedOrNull(query.isStar)
        ? query.isStar
        : query.isStar === "true";
      const pageSize = parseInt(query.pageSize) || 10;

      function isUndefinedOrNull(value) {
        return value === undefined || value === null;
      }
      return {
        errno: 0,
        data: {
          list: getQuestionList({ len: pageSize, isDeleted, isStar }),
          total: 100,
        },
      };
    },
  },
  {
    // 更新问卷
    url: "/api/question/:id",
    method: "patch",
    response() {
      return {
        errno: 0,
      };
    },
  },
  {
    // 复制问卷
    url: "/api/question/duplicate/:id",
    method: "post",
    response() {
      return {
        errno: 0,
        data: {
          id: Random.id(),
        },
      };
    },
  },
  {
    // 批量彻底删除
    url: "/api/question",
    method: "delete",
    response() {
      return {
        errno: 0,
      };
    },
  },
];
