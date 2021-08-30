const  {postPost, fetchPostCount, updatePost, deletePost} = require("../prisma/main")
const Mutation = {
  async createPost(parent, arg, {db, pubsub}, info) {
    // const postNumTotal = (await fetchPostCount()) + 1
    const post = {
      // id: postNumTotal,
      ... arg.data
    }
    const createPost = postPost(post)
    pubsub.publish("post", {
      post: {
        mutation: "CREATED",
        data: createPost
      }
    })
    return createPost
  },
  async updatePost(parent, args, {db, pubsub}, info) {
    const {id, data} = args
    const post = updatePost(Number(id), data) 
    if (!post) {
      throw new Error("Post not found")
    }
    pubsub.publish("post", {
      post: {
        mutation: "UPDATED",
        data: post
      }
    })
    return post
  },
  async deletePost(parent, arg, { db, pubsub}, info) {
    const { id } = arg
    const deleted = await deletePost(Number(id))
    if (!deleted) throw new Error("Post not Found")
    pubsub.publish("post", {
      post: {
        mutation: "DELETED",
        data: deleted
      }
    })
    return deleted
  }
}
module.exports = Mutation
