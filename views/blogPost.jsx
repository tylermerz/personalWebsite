var React = require('react')
var DefaultLayout = require('./layouts/default')
var BlogPostClass = require('./blogPostClass')
var Disqus = require('./disqus')
class blogPostPage extends React.Component {
  render () {
    return (
      <DefaultLayout title={this.props.title} description={this.props.postsummary}>
        <BlogPostClass {...this.props} post />
        <Disqus identifier={this.props.id} />
      </DefaultLayout>
    )
  }
}

module.exports = blogPostPage
