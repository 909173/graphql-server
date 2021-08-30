const { PrismaClient, Prisma, Role } = require("@prisma/client")

const prisma = new PrismaClient();

module.exports = {
  postPost: async (arg) => {
    const createPost = await prisma.post.create({
      data: arg
    })
    return createPost
  },
  fetchPostCount: async() => {
    const postsCount = await prisma.post.count()
    return postsCount
  },
  updatePost: async(id, data) => {
    const updatePost = await prisma.post.update({
      data,
      where: {
        id
      }
    })
    return updatePost
  },
  deletePost: async(id) => {
    const deleted = await prisma.post.delete({
      where: {
        id
      }
    })
    return deleted
  },
  fetchPost: async(query) => {
    const posts = await prisma.post.findMany({
      where: {
        OR: [
          {
            title: {
              contains: query ? query : ""
            }
          },
          {
            author: {
              contains: query ? query : ""
            }
          }
        ]
      }
    })
    return posts
  }
}