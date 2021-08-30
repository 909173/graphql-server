const Subscription = {
  post: {
    subscribe(parent, arg, {pubsub}, info) {
      return pubsub.asyncIterator("post")
    }
  }
}
module.exports = Subscription