import * as React from 'react';
import {DefaultLayout} from './layouts/default';

export default class searchPage extends React.Component<any,any> {
  render () {
    var postSummaries = this.props.searchResults.postResults.map((post, i) => {
      return (<li key={i}><a href={'/blog/post/' + post['id']}><span dangerouslySetInnerHTML={{ __html: post['title'] }} /></a><br /> <blockquote dangerouslySetInnerHTML={{ __html: post['clip'] }} /></li>)
    })
    var tagLinks = this.props.searchResults.tagResults.map((tag, i) => {
      return (<li key={i}><a href={'/blog/tags/' + tag['tag'] + '/page/0'}> {tag['tag']}</a></li>)
    })
    return (
      <DefaultLayout title={"Search Results for '" + this.props.query + "'"}>
        <div className='mainBody'>
          <div className='postMeat'>
            <div className='postBody'>
              <hr />

              <h1>Search results for query "{this.props.query}":</h1>
                            Tags: {
                                this.props.searchResults.tagResults.length !== 0
                                    ? <ul> {tagLinks}</ul> : <i> No tag found.</i>
                            }
              <br />
                            Posts:
                                {this.props.searchResults.postResults.length !== 0
                                ? <ul> {postSummaries}</ul> : <i> No posts found.</i>
                            }
              <br />
            </div>
          </div>
        </div>
      </DefaultLayout>
    )
  }
}

