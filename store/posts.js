import ghostAPI from '../api/ghost'

export const state = () => ({
  posts: null,
  pages: null,
  tags: null,
  featuredPosts: null,
})

export const getters = {
  getAllPosts: (state) => {
    return state.posts
  },
  getFeaturedPosts: (state) => {
    return state.featuredPosts
  },
  getAllPages: (state) => {
    return state.pages
  },
  getTags: (state) => {
    return state.tags
  },
  getPostBySlug: (state) => (slug) => {
    return state.posts.find((post) => post.slug === slug)
  },
  getPostsByTag: (state) => (tag) => {
    // data.filter(d => d.courses.every(c => courses.includes(c.id)));
    
    return state.posts.filter((post) =>
      post.tags.some((layer2) => layer2.name === tag)
    )
    // console.log(state.posts)
    // let x =  state.posts.filter((post) =>
    //   post.tags.some((layer2) => layer2.name === tag)
    // )
    // console.log(x)
  },
  getPageBySlug: (state) => (slug) => {
    return state.pages.find((page) => page.slug === slug)
  },
}

export const mutations = {
  setPosts(state, payload) {
    state.posts = payload
  },
  setFeaturedPosts(state, payload) {
    state.featuredPosts = payload
  },
  setPages(state, payload) {
    state.pages = payload
    // console.log(state)
  },
  setTags(state, payload) {
    state.tags = payload
  },
}

export const actions = {
  async fetchPosts(context) {
    const postData = await ghostAPI.getPosts()
    context.commit('setPosts', postData)
  },
  async fetchFeaturedPosts(context) {
    const postData = await ghostAPI.getFeaturedPosts()
    context.commit('setFeaturedPosts', postData)
  },
  async fetchPages(context) {
    const pageData = await ghostAPI.getPages()
    context.commit('setPages', pageData)
  },
  async fetchTags(context) {
    const tagData = await ghostAPI.getTags()
    context.commit('setTags', tagData)
  },
}
