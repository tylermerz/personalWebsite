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
          <link href='https://fonts.googleapis.com/css?family=Open+Sans+Condensed:300|Economica' rel='stylesheet' />
          <link rel='stylesheet' href='http://static.tylermerz.com/main.css' />
          <link rel='stylesheet' href='http://static.tylermerz.com/tomorrow.css' />
          <link rel='stylesheet' href='http://static.tylermerz.com/react-table.css' />
          <link href="https://cdnjs.cloudflare.com/ajax/libs/lightbox2/2.9.0/css/lightbox.min.css" rel="stylesheet" />
          <script
            src='http://cdnjs.cloudflare.com/ajax/libs/highlight.js/9.8.0/highlight.min.js' />
          <script>
            hljs.initHighlightingOnLoad();
          </script>
          <script src='http://static.tylermerz.com/JS/Chart.bundle.js' />
          <script src='http://static.tylermerz.com/JS/analytics.js' />
        </head>
        <body>
          <div className='titleBar'>
            <b>
              TYLER MERZ</b>
            <span className='siteSubtitle' />
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
              <form action='/search/' method='get'><input className='search' type='search' name='query' maxLength={256} placeholder='search...' /></form>
            </div>
          </div>
          {this.props.children}
          <script src='https://cdnjs.cloudflare.com/ajax/libs/lightbox2/2.9.0/js/lightbox-plus-jquery.min.js' />
          <div className='footer'><p>&copy; 2017 Tyler Merz</p></div>
        </body>
      </html>
    )
  }
}
module.exports = DefaultLayout
