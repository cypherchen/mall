
export const backTopMixin = {
  date() {
    return {
      BACK_TOP: 1000,
      isShowBackTop: false
    }
  },
  methods: {
    backClick() {
      this.$refs.scroll.scrollTo(0,0);
    }
  }
}
