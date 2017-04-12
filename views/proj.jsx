var React = require('react')
var DefaultLayout = require('./layouts/default')
var ReactMarkdown = require('react-markdown')
var fs = require('fs')

class Proj extends React.Component {
  render () {
    var innerMarkDown = fs.readFileSync('./markdown/proj.md').toString('utf-8')
    return (
      <DefaultLayout title='Public Projects'>
        <div className='mainBody'>
          <div className='postMeat'>
            <div className='postBody'>
              <hr />
              <ReactMarkdown source={innerMarkDown} />
              <script src='http://tylermerz.com/JS/PlasticTableBundle.js' type='text/javascript' />
            </div>
          </div>
        </div>
      </DefaultLayout>
    )
  }
}
module.exports = Proj
