var React = require('react')
var DefaultLayout = require('./layouts/default')
var BlogPostClass = require('./blogPostClass')
var Pager = require('./pager')

class blogPage extends React.Component {
  render () {
    var content = this.props.posts.map((post, i) => {
      return (
        <BlogPostClass {...post} key={i} post={false} />
      )
    })
    return (
      <DefaultLayout title={'Page ' + this.props.currentPage}>
        {content}
        { this.props.totalPages > 1 &&
        <Pager basePath={this.props.basePath + 'page/'} currentPage={this.props.currentPage} totalPages={this.props.totalPages} />
        }
      </DefaultLayout>
    )
  }
}

module.exports = blogPage
