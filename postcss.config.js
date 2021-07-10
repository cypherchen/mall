module.exports = {
  plugins: {
    autoprefixer: {},
    "postcss-px-to-viewport": {
      viewportWidth: 375, // 视窗宽度
      viewportHeight: 812, // 视窗高度
      unitPrecision: 5, // px转为vw后保留5位小数
      viewportUnit: "vw", // 视窗单位，vw或vh，这里使用vw
      selectorBlackList: ['ignore'], // 含有ignore类的元素不会做转换
      minPixelValue: 1, // 小于等于1px的不做转换
      mediaQuery: false // 使用媒体查询时不允许转换
    }
  }
}
