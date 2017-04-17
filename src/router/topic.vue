<template>
  <div>
    <layout>
      <div :class="['newTopicNotice', 'noticeMobile', {hide:newTopicCount == 0}]" @click="refreshNews">有 {{newTopicCount}} 个新话题，点击查看</div>

      <item-list
      :loading="loading"
      :isLoadAll="isLoadAll"
      :onLoadMoreClick="onLoadMoreClick"
      >
        <topic-item
        v-for="(topic, index) of topics"
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
import topicItem from '@/components/TopicItem/TopicItem.vue'
import itemList from '@/components/ItemList/ItemList.vue'
import { MUTATION_TYPES, ACTION_TYPES } from '@/constants'
import CONFIG from '@/api/config'

export default {
  name: 'topic',
  created () {
    this.$store.dispatch(ACTION_TYPES.TOPIC.FETCH, { refresh: true, init: true })
    this.intervalid2 = setInterval(() => {
      this.$store.dispatch(ACTION_TYPES.TOPIC.FETCH_NEW_COUNT)
    }, 30000)
  },
  computed: {
    ...mapState({
      topics: state => state.topic.data,
      openList: state => state.topic.openList || [],
      loading: state => state.topic.loading,
      isLoadAll: state => state.topic.isLoadAll,
      newTopicCount: state => state.topic.newTopicCount
    })
  },
  watch: {
    newTopicCount: function (val, oldVal) {
      val > 0 ? document.title = '(' + val + ')' + CONFIG.TITLE : 0
    }
  },
  methods: {
    onTopicClick (collapseKey) {
      this.$store.commit(MUTATION_TYPES.TOPIC.OPEN_STATE_CHANGE, { collapseKey })
    },
    onLoadMoreClick () {
      this.$store.dispatch(ACTION_TYPES.TOPIC.FETCH, {})
    },
    refreshNews () {
      this.$store.dispatch(ACTION_TYPES.TOPIC.FETCH, { refresh: true, init: false })
    }
  },
  components: { layout, topicItem, itemList },
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
