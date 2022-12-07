import GhostContentAPI from '@tryghost/content-api'

// const api = new GhostContentAPI({
//   url: 'http://46.101.78.36',
//   key: '014a1a66c22421c8f2199a0ec7',
//   version: 'v3',
// })
const api = new GhostContentAPI({
  // url: 'http://167.235.17.97',
  // key: '1c1d90f059643ce3a6653d655d',
  // url: 'https://edit.fractalsdesign.uk',
  url: 'https://edit.fractalsdesign.uk',
  key: '454e2499dc49354a2591ee84ea',
  version: 'v3',
})


export default {
  
  async getPosts() {
    return await api.posts
      .browse({
        include: 'tags,authors',
        limit: 'all',
      })
      .catch((err) => {
        console.error(err)
      })
  },
  async getFeaturedPosts() {
    return await api.posts
      .browse({
        include: 'tags,authors',
        limit: 'all', filter: 'featured:true',
      })
      .catch((err) => {
        console.error(err)
      })
  },

  async getSinglePost(postSlug) {
    return await api.posts
      .read({
        slug: postSlug,
      })
      .catch((err) => {
        console.error(err)
      })
  },

  async getPages() {
    return await api.pages
      .browse({
        limit: 'all',
      })
      .catch((err) => {
        console.error(err)
      })
  },

  async getTags() {
    return await api.tags
      .browse({
        order: 'slug ASC',
      })
      .catch((err) => {
        console.error(err)
      })
  },

  async getSettings() {
    return await api.settings
      .browse({
        limit: 'all',
      })
      .catch((err) => {
        console.error(err)
      })
  },
}
