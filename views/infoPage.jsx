var React = require('react')
var DefaultLayout = require('./layouts/default')

class InfoPage extends React.Component {
  render () {
    return (
      <DefaultLayout title={this.props.message} >
        <div className='mainBody'>
          <div className='postMeat'>
            <div className='postBody'>
              <hr />
              <h1>Page Not Found.</h1>
              <p>
                {this.props.message}
              </p>
            </div>
          </div>
        </div>
      </DefaultLayout>
    )
  }
}
module.exports = InfoPage
