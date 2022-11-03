import ghostAPI from '../api/ghost'

export const state = () => ({
  settings: null,
  windowWidth: null,
  mobile: null,
  colors: null,
  animation: true,
})

export const getters = {
  getNav: (state) => {
    return state.settings.navigation
  },
  getWindowWidth: (state) => {
    return state.windowWidth
  },
  isMobile: (state) => {
    return state.mobile
  },
  getRandomColor: (state) => (wild) => {
    return state.colors[Math.floor(wild * state.colors.length)]
  },
  getAnimation: (state) => {
    return state.animation
  }
}

export const mutations = {
  setSettings(state, payload) {
    state.settings = payload
  },
  setWindowWidth(state, payload) {
    state.windowWidth = payload
  },
  setMobile(state, payload) {
    state.mobile = payload
  },
  setColors(state, payload) {
    state.colors = payload
  },
  setAnimation(state, payload){
    // state.animation = payload
    state.animation = false
  }
}

export const actions = {
  async fetchSettings(context) {
    let settingsData = await ghostAPI.getSettings()
    for (let i=0; i < settingsData.navigation.length; i++ ){
      settingsData.navigation[i].url =settingsData.navigation[i].url.replace('https://fractalsdesign.uk', '')
    }
    context.commit('setSettings', settingsData)
  },
  fetchWindowWidth(context, width) {
    context.commit('setWindowWidth', width)
  },
  changeMobileState(context, state) {
    context.commit('setMobile', state)
  },
  fetchColors(context) {
    let colors = [
      '#fec163',
      '#ef4056',
      '#1d1d1b',
      '#ef7c54',
      '#f3645a',
      '#f67b5c',
    ]

    context.commit('setColors', colors)
  },
  fetchAnimation(context, state){
    context.commit('setAnimation', state)
  }
}
