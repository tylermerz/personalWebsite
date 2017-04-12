var React = require('react')

class Disqus extends React.Component {
  render () {
    return (
      <div className='disqus'>
        <div className='innerDisqus' id='disqus_thread' />
        <script src={'https://tylermerz-com.disqus.com/embed.js'} async type={'text/javascript'} data-timestamp={+new Date()} />
        <noscript>Please enable JavaScript to view the <a href='https://disqus.com/?ref_noscript'>comments powered by Disqus.</a></noscript>
      </div>
    )
  }
}

module.exports = Disqus
