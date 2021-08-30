const { fetchPost } = require("../prisma/main")
const Query = {
  async posts(patient, arg, {db}, info) {
    return await fetchPost(arg.query)
  }
}
module.exports = Query