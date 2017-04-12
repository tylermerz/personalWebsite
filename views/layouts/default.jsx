import * as React from 'react'
class DefaultLayout extends React.Component {
  render () {
    return (
      <html>
        <head>
          <meta charSet='utf-8' />
          <meta name='viewport' content='width=device-width, initial-scale=1.0' />
          <meta name='author' content='Tyler Merz' />
          <meta
            name='keywords'
            content='Tyler Merz, engineering, node, python, web-dev, computer science, algorithm' /> {this.props.description !== undefined && <meta name='description' content={this.props.description} />}
          <title>{this.props.title + ' - Tyler Merz'}</title>
          <link
            rel='stylesheet'
            type='text/css'
            href='https://fonts.googleapis.com/css?family=Open+Sans' />
          <link
            rel='stylesheet'
            type='text/css'
            href='https://fonts.googleapis.com/css?family=Trirong' />
          <link
            rel='stylesheet'
            type='text/css'
            href='https://fonts.googleapis.com/css?family=Press+Start+2P' />
          <link
            rel='stylesheet'
            type='text/css'
            href='https://fonts.googleapis.com/css?family=Permanent+Marker' />
          <link rel='stylesheet' href='http://tylermerz.com/main.css' />
          <link rel='stylesheet' href='http://tylermerz.com/tomorrow.css' />
          <link rel='stylesheet' href='http://tylermerz.com/react-table.css' />
          <script
            src='http://cdnjs.cloudflare.com/ajax/libs/highlight.js/9.8.0/highlight.min.js' />
          <script>
            hljs.initHighlightingOnLoad();
          </script>
          <script src='http://tylermerz.com/JS/Chart.bundle.js' />
        </head>
        <body>
          <div className='titleBar'>
            <b>
              TYLER MERZ</b><br />
            <span className='siteSubtitle'>
              <b>Engineering. Hobbies. Blogging.</b>
            </span>
          </div>
          <div className='navBar'>
            <div className='navButton'>
              <a href='/about/'>ABOUT</a>
            </div>
            <div className='navButton'>
              <a href='/proj/'>PROJECTS</a>
            </div>
            <div className='navButton'>
              <a href='/blog/'>BLOG</a>
            </div>
            <div className='searchBar'>
              <form action='/search/' method='get'><input className='search' type='search' name='query' placeholder='search...' /></form>
            </div>
          </div>
          {this.props.children}
        </body>
      </html>
    )
  }
}
module.exports = DefaultLayout
