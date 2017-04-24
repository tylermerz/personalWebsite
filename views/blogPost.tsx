import * as React from 'react';
import {DefaultLayout} from './layouts/default';
import {BlogPostClass} from './blogPostClass';
import {Disqus} from './disqus';
export default class blogPostPage extends React.Component<any,any> {
  render () {
    return (
      <DefaultLayout title={this.props.title} description={this.props.postsummary}>
        <BlogPostClass {...this.props} post />
        <Disqus identifier={this.props.id} />
      </DefaultLayout>
    )
  }
}

