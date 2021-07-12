<template>
  <div class="category">
    <nav-bar class="category-nav-bar">
      <template #center>
        <div>商品分类</div>
      </template>
    </nav-bar>
    <category-side-bar :categories="categories"
                       @selectItem="selectItem"/>
    <scroll class="category-content">
      <sub-category :subcategories="showSubcategory"/>
    </scroll>
  </div>
</template>

<script>

import NavBar from "components/common/navbar/NavBar";
import Scroll from "components/common/scroll/Scroll";

import CategorySideBar from "./childComps/CategorySideBar";
import SubCategory from "./childComps/SubCategory";

import {getCategory,getSubCategory} from "network/category";

export default {
  name: "Category",
  components: {
    NavBar,
    Scroll,
    CategorySideBar,
    SubCategory
  },
  data() {
    return {
      categories: [], // 分类列表的数据
      categoryData: [], // 每个分类的数据
      currentIndex: -1 // 当前点击的分类索引值
    }
  },
  created() {
    // 页面创建完后立即请求分类页的数据
    this.getCategory()
  },
  computed: {
    // 取出子分类数据
    showSubcategory() {
      /*
      由于category.js里的请求函数返回的是Promise对象，
      所以页面刚生成的时候getCategory.then里的回调函数没有computed里的同步代码快，
      这时候分类页数据还没进行处理，这里不能读取到subcategories，所以要返回，
      等到getCategory.then回调函数里的最后一行，请求第一个分类的子分类数据完成，
      此时currentIndex已经变成了0，这里才能读取到subcategories
      */
      if (this.currentIndex === -1) return {};
      // 返回分类数据中的子分类数据
      return this.categoryData[this.currentIndex].subcategories
    }
  },
  methods: {
    // 获取分类页全部数据
    getCategory() {
      getCategory().then(res => { // category.js里的函数请求来的都是Promise对象
        // 1.保存分类页全部数据
        this.categories = res.data.category.list;
        // 2.初始化各个分类的数据
        for (let i = 0; i < this.categories.length; i++) {
          // 遍历生成所有分类的数据
          this.categoryData[i] = {
            subcategories: {}, // 初始化每个分类的子分类数据
          }
        }
        // 3.获取第一个分类的子分类数据
        this.getSubCategory(0);
      })
    },
    // 根据分类的索引值获取子分类数据
    getSubCategory(index) {
      // 1.修改分类菜单栏的当前索引值
      this.currentIndex = index;
      // 2.获取分类的子分类数据id
      const maitKey = this.categories[index].maitKey;
      // 3.根据子分类数据id获取子分类的数据
      getSubCategory(maitKey).then(res => {
        // 保存当前被点击分类的子分类数据
        this.categoryData[index].subcategories = res.data;
        this.categoryData = [...this.categoryData];
      })
    },
    // 点击分类获取该分类的详细数据
    selectItem(index) {
      this.getSubCategory(index);
    }
  }
}
</script>

<style scoped>
  .category {
    position: relative;
  }

  .category-nav-bar {
    background-color: var(--color-tint);
    color: #fff;
  }

  .category-content {
    height: calc(100vh - 44px - 49px);
    overflow: hidden;
    position: absolute;
    top: 44px;
    left: 100px;
  }


</style>
