import * as React from 'react';
import {DefaultLayout} from './layouts/default';
import {BlogPostClass} from './blogPostClass';
import {Pager} from './pager';

export default class blogPage extends React.Component<any,any> {
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

