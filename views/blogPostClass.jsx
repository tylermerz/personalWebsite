var React = require('react')

class BlogPostClass extends React.Component {
  render () {
    var tags = this.props.tags.map((t, i) => {
      return <span style={{ fontSize: +(this.props.tagCounts[i] - this.props.minTagCounts + 1) / (this.props.maxTagCounts - this.props.minTagCounts) * 75 + 25 + '%' }} key={i}><a className='tag' href={'/blog/tags/' + t + '/page/0'}> {t}</a> </span>
    })
    return (
      <div className='mainBody'>
        <hr />
        <div className='tags'> {tags}</div>
        <div className='postMeat'>
          <div className='postHead'><h2><a href={'/blog/post/' + this.props.id} > {this.props.title}</a> <span className='subtitle'>on {this.props.time.toString().slice(0, -18)} by <a href='/about/'> {this.props.username}</a></span></h2></div>
          { (this.props.postsummary === undefined || this.props.postsummary === null || this.props.postsummary.length === 0)
            ? (<div className='postBody' dangerouslySetInnerHTML={{ __html: this.props.postbody }} />)
            : (<div className='postBody' dangerouslySetInnerHTML={{ __html: this.props.postsummary }} />)
        }
        </div>
        { this.props.post &&
        <div className='shareButtons'>
          <div><a href='https://twitter.com/share' className='twitter-share-button' data-show-count='false'>Tweet</a><script async src='//platform.twitter.com/widgets.js' charSet='utf-8' /></div>
          <div><script src='//platform.linkedin.com/in.js' type='text/javascript'> lang: en_US</script>
            <script type='IN/Share' /></div>
          <div>
            <script src='https://apis.google.com/js/platform.js' async defer />
            <div className='g-plus' data-action='share' data-annotation='none' />
          </div>
        </div>
        }
      </div>
    )
  }
}

module.exports = BlogPostClass
