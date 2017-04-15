export const GETTER_TYPES = {

}

export const ACTION_TYPES = {
  TOPIC: {
    FETCH: 'topic/fetch',
    FETCH_NEW_COUNT: 'topic/fetchNewCount'
  },
  NEWS: {
    FETCH: 'news/fetch',
    FETCH_NEW_COUNT: 'news/fetchNewCount'
  }
}

export const MUTATION_TYPES = {
  TOPIC: {
    SAVE: 'topic/save',
    CLEAR: 'topic/clear',
    OPEN_STATE_CHANGE: 'topic/changeOpenState',
    SET_NEW_COUNT: 'topic/setNewCount'
  },
  NEWS: {
    SAVE: 'news/save',
    CLEAR: 'news/clear',
    OPEN_STATE_CHANGE: 'news/changeOpenState',
    SET_NEW_COUNT: 'news/setNewCount'
  }
}

export const TOPIC_DEFAULT_PAGESIZE = 10
