import * as React from 'react';

export class Pager extends React.Component<any,any> {
    // we are guaranteed to get some number of pages > 0 if we are calling this class.
  render () {
    var pageNumbers = []

    for (var i = 0; i < this.props.totalPages; i++) {
      pageNumbers.push(i)
    }

    var middlePages = pageNumbers.map((numb) => {
      if (numb === this.props.currentPage) {
        return <div className='pagerNum'> {numb.toString()}</div>
      } else {
        return <div className='pagerNum'><a href={this.props.basePath + numb.toString()}> {numb.toString()}</a></div>
      }
    })
    return (
      <div className='mainBody'>
        <div className='pager'>
          { (this.props.currentPage > 0) &&
          <a href={this.props.basePath + (this.props.currentPage - 1).toString()}>Prev</a>
        }
          {middlePages}
          { (this.props.currentPage < this.props.totalPages - 1) &&
          <a href={this.props.basePath + (this.props.currentPage + 1).toString()}>Next</a>
        }
        </div>
      </div>
    )
  }
}
