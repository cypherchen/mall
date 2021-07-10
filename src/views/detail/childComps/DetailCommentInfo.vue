<template>
  <div class="comment-info">
    <div class="info-title">
      <div class="header-title">用户评价</div>
      <div class="header-more">
        <span>更多>></span>
      </div>
    </div>
    <div v-if="Object.keys(commentInfo).length !== 0">
      <div class="info-user">
        <img :src="commentInfo.user.avatar" alt="">
        <span>{{commentInfo.user.uname}}</span>
      </div>
      <div class="info-detail">
        <p>{{commentInfo.content}}</p>
        <div class="info-other">
          <span class="date">{{showDate}}</span>
          <span>{{commentInfo.style}}</span>
        </div>
        <div class="info-img">
          <img v-for="(item,index) in commentInfo.images"
               :src="item" :key="index" alt="">
        </div>
      </div>
    </div>
    <div v-else class="no-comment">暂时没有评论</div>
  </div>
</template>

<script>
import {formatDate} from 'common/utils'

export default {
  name: "DetailCommentInfo",
  props: {
    commentInfo: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  computed: {
    showDate() {
      // 1.将时间戳转为Date对象
      const date = new Date(this.commentInfo.created * 1000); // 数据库返回的是10位秒时间戳，要转为毫秒
      // 2.将date进行格式化
      return formatDate(date,'yyyy-MM-dd');
    }
  }
}
</script>

<style scoped>
  .comment-info {
    padding: 10px 15px;
    border-bottom: 5px solid #eee;
  }

  .info-title {
    height: 50px;
    line-height: 50px;
    display: flex;
    justify-content: space-between;
    border-bottom: 1px solid #ddd;
  }

  .info-user {
    display: flex;
    align-items: center;
    padding: 10px 0;
  }

  .info-user img {
    width: 50px;
    height: 50px;
    border-radius: 50%;
    margin-right: 10px;
  }

  .info-detail p {
    line-height: 1.5;
    font-size: 14px;
    padding-bottom: 10px;
  }

  .info-detail div {
    font-size: 14px;
    font-weight: lighter;
  }

  .info-other .date {
    padding-right: 10px;
  }

  .info-img img{
    width: 100px;
    height: 100px;
    margin: 6px 6px 0 0;
  }

  .no-comment {
    height: 40px;
    line-height: 40px;
  }

</style>
