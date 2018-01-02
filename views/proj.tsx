import * as React from 'react';
import {DefaultLayout} from './layouts/default';
var ReactMarkdown = require('react-markdown')
var fs = require('fs')

export default class Proj extends React.Component<any,any> {
  render () {
    var innerMarkDown = fs.readFileSync('./markdown/proj.md').toString('utf-8')
    return (
      <DefaultLayout title='Public Projects'>
        <div className='mainBody'>
          <div className='postMeat'>
            <div className='postBody'>
              <hr />
              <ReactMarkdown source={innerMarkDown} />
              <script src='https://s3-us-west-1.amazonaws.com/static.tylermerz.com/JS/PlasticTableBundle.js' type='text/javascript' />
            </div>
          </div>
        </div>
      </DefaultLayout>
    )
  }
}
