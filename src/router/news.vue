<template>
  <div>
    <layout>
      <div :class="['newTopicNotice', 'noticeMobile', {hide:newNewsCount == 0}]" @click="refreshNews">有 {{newNewsCount}} 个新资讯，点击查看</div>

      <item-list
      :loading="loading"
      :isLoadAll="isLoadAll"
      :onLoadMoreClick="onLoadMoreClick"
      >
        <news-item
        v-for="(topic, index) of articles"
        :key="topic.id"
        :topic="topic"
        :isLastRead="false"
        :isFirst="index === 0"
        :isTop="topic.isTop && topic.isTop > 0"
        :openList="openList"
        :onTopicClick="onTopicClick"
        />
      </item-list>
    </layout>
  </div>
</template>


<script>
import { mapState } from 'vuex'
import layout from '@/components/Layout/Layout.vue'
import newsItem from '@/components/News/NewsItem.vue'
import itemList from '@/components/ItemList/ItemList.vue'
import { MUTATION_TYPES, ACTION_TYPES } from '@/constants'

export default {
  name: 'news',
  created () {
    this.$store.dispatch(ACTION_TYPES.NEWS.FETCH, { refresh: true, init: true })
    this.intervalid2 = setInterval(() => {
      this.$store.dispatch(ACTION_TYPES.NEWS.FETCH_NEW_COUNT)
    }, 30000)
  },
  computed: {
    ...mapState({
      articles: state => state.news.data,
      openList: state => state.news.openList || [],
      loading: state => state.news.loading,
      isLoadAll: state => state.news.isLoadAll,
      newNewsCount: state => state.news.newNewsCount
    })
  },
  watch: {
    newNewsCount: function (val, oldVal) {
      val > 0 ? document.title = '(' + val + ')' + document.title : 0
    }
  },
  methods: {
    onTopicClick (collapseKey) {
      this.$store.commit(MUTATION_TYPES.NEWS.OPEN_STATE_CHANGE, { collapseKey })
    },
    onLoadMoreClick () {
      this.$store.dispatch(ACTION_TYPES.NEWS.FETCH, {})
    },
    refreshNews () {
      this.$store.dispatch(ACTION_TYPES.NEWS.FETCH, { refresh: true, init: false })
    }
  },
  components: { layout, newsItem, itemList },
  beforeDestroy () {
    clearInterval(this.intervalid2)
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}

.newTopicNotice {
  border: 1px solid #dadbde;
  color: #2c5686;
  background-color: #fcfae2;
  text-align: center;
  font-size: 14px;
  margin-top: 15px;
  padding-top: 8px;
  padding-bottom: 8px;
}

.noticeMobile {
  width: auto;
}
</style>
