<template>
  <div class="cart-list-item">
    <check-button :is-checked="product.checked"
                  @click.native="checkClick"/>
    <div class="product">
      <div @click="showProduct">
        <img class="img" :src="product.image" alt="">
      </div>
      <div class="product-info">
        <div>
          <p class="title">{{product.title}}</p>
          <p class="describe">{{product.desc}}</p>
        </div>
        <div class="price-count">
          <span class="price">{{'￥' + product.price}}</span>
          <div class="count">
            <button class="decrease" @click="decreaseCount">-</button>
            <input type="number" class="input" v-model.number="product.count">
            <button class="increase" @click="increaseCount">+</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import CheckButton from "components/content/checkButton/CheckButton";

export default {
  name: "CartListItem",
  components: {
    CheckButton
  },
  props: {
    product: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  methods: {
    // 点击图片进入商品详情
    showProduct() {
      this.$router.push('/detail/' + this.product.iid);
    },
    // 商品选中或取消
    checkClick() {
      this.$store.commit('checkProduct',this.product)
    },
    // 商品数量加一
    increaseCount() {
      if (this.product.count < 99){
        this.$store.commit('increaseCount',this.product);
      }
    },
    // 商品数量减一
    decreaseCount() {
      if (this.product.count <= 1){
        this.$store.commit('deleteProduct',this.product.iid); // 如果数量小于等一，再减一直接删除
      }else {
        this.$store.commit('decreaseCount',this.product); // 否则数量减一
      }
    }
  }
}
</script>

<style scoped>

  .cart-list-item {
    width: 100%;
    display: flex;
    align-items: center;
    padding: 15px;
    border-bottom: 1px solid #ccc;
  }

  .product {
    display: flex;
  }

  .img {
    width: 70px;
    height: 105px;
    margin: 0 15px;
    border-radius: 5px;
  }

  .product-info {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }

  .title, .describe {
    width: 63vw;
    height: 25px;
    line-height: 25px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .title {
    font-size: 17px;
  }

  .describe {
    font-size: 14px;
    margin-top: 10px;
  }

  .price-count {
    display: flex;
    justify-content: space-between;
    padding-right: 15px;
  }

  .price {
    font-size: 18px;
    font-weight: bold;
    color: var(--color-high-text);
  }

  .count {
    display: flex;
    align-items: center;
  }

  .input {
    width: 20px;
    text-align: center;
    font-size: 12px;
    margin: 0 10px;
  }

   .decrease {
    width: 15px;
    height: 15px;
    line-height: 8px;
  }

   .increase {
     width: 15px;
     height: 15px;
     line-height: 11px;
   }
</style>
