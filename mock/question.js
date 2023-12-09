const Mock = require("mockjs");
const getQuestionList = require("./data/getQuestionList");

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
          componentList: [
            {
              fe_id: Random.id(),
              type: "questionInfo",
              title: "问卷信息",
              isHidden: false,
              isLocked: false,
              props: {
                title: "问卷标题",
                desc: "问卷描述",
              },
            },
            {
              fe_id: Random.id(),
              type: "questionTitle",
              title: "标题",
              isHidden: false,
              isLocked: false,
              props: {
                text: "个人信息调研",
                level: 1,
                isCenter: false,
              },
            },
            {
              fe_id: Random.id(),
              type: "questionInput",
              title: "输入框1",
              isHidden: false,
              isLocked: false,
              props: {
                title: "你的姓名",
                placeholder: "请输入姓名...",
              },
            },
            {
              fe_id: Random.id(),
              type: "questionInput",
              title: "输入框2",
              isHidden: false,
              isLocked: false,
              props: {
                title: "你的电话",
                placeholder: "请输入电话...",
              },
            },
            {
              fe_id: Random.id(),
              type: "questionTextarea",
              title: "多行输入",
              isHidden: false,
              isLocked: false,
              props: {
                title: "你的爱好",
                placeholder: "请输入...",
              },
            },
            {
              fe_id: Random.id(),
              type: "questionParagraph",
              title: "段落",
              isHidden: false,
              isLocked: false,
              props: {
                title: "一行段落",
                isCenter: false,
              },
            },
            {
              fe_id: Random.id(),
              type: "questionRadio",
              title: "单选",
              isHidden: false,
              isLocked: false,
              props: {
                title: "单选标题",
                isVertical: false,
                options: [
                  {
                    value: "item1",
                    text: "选项1",
                  },
                  {
                    value: "item2",
                    text: "选项2",
                  },
                  {
                    value: "item3",
                    text: "选项3",
                  },
                ],
                value: "",
              },
            },
            {
              fe_id: Random.id(),
              type: "questionCheckbox",
              title: "多选",
              isHidden: false,
              isLocked: false,
              props: {
                title: "多选标题",
                isVertical: false,
                list: [
                  {
                    value: "item1",
                    text: "选项1",
                    checked: false,
                  },
                  {
                    value: "item2",
                    text: "选项2",
                    checked: false,
                  },
                  {
                    value: "item3",
                    text: "选项3",
                    checked: false,
                  },
                ],
              },
            },
          ],
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
