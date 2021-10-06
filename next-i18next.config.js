const dayjs = require("dayjs");
const { initReactI18next } = require("react-i18next");

module.exports = {
  i18n: {
    defaultLocale: "en-US",
    locales: ["en-US", "zh-TW"],
  },
  interpolation: {
    format: (value, format) => {
      if (value instanceof Date) {
        return dayjs(value).format(format);
      }
      return value;
    },
  },
  serializeConfig: false,
  use: [initReactI18next],
};
