var React = require('react')
var DefaultLayout = require('./layouts/default')
var ReactMarkdown = require('react-markdown')
var fs = require('fs')

class AboutMe extends React.Component {
  render () {
    var innerMarkDown = fs.readFileSync('./markdown/about.md').toString('utf-8')
    return (
      <DefaultLayout title='About Me'>
        <div className='mainBody'>
          <div className='postMeat'>
            <div className='postBody'>
              <hr />
              <ReactMarkdown source={innerMarkDown} />
            </div>
          </div>
        </div>
      </DefaultLayout>
    )
  }
}
module.exports = AboutMe
