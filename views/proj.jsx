var React = require('react')
var DefaultLayout = require('./layouts/default')

class Proj extends React.Component {
  render () {
    return (
      <DefaultLayout title='Public Projects'>
        <div className='mainBody'>
          <div className='postMeat'>
            <div className='postBody'>
              <hr />
              <h1>Public Projects</h1>

              <p>I have worked on a number of public projects based mostly around Python and Typescript/Node.js. Typically, like most good passion projects, the ideas for these projects are born out of getting involved in a hobby and then realizing that there is a problem inherent to it that could benefit from the application of some computational power. Below I have outlines and details about a few of the more involved projects with which I have been involved.</p>
              <p>All of the code for these projects as well as other projects can be found on <a href='https://github.com/tylermerz'>my github repository</a>.</p>
              <hr />
              <h2>packingProblems</h2>
              <p>This project uses Typescript primarily (but there is a bit of React for various GUIs) to explore different algorithms which are used to pack items of various sizes into an larger bins. The basic algorith ideas were taken from <a href='https://www.crcpress.com/Handbook-of-Approximation-Algorithms-and-Metaheuristics/Gonzalez/p/book/9781584885504'>Handbook of Approximation Algorithms and Metaheuristics</a>, but the specific implementation is my own.</p>
              <p>I programmed both 1D and 2D bin packing algorithms because of my interest in laying out patterns on lumber for building projects and efficient packing of plants into raised garden beds, respectively.</p>
              <p><a href='/blog/tags/packingProblems/page/0'>Blog posts about packingProblems</a>.</p>
              <p><a href='https://github.com/tylermerz/packingProblems'>Github activity</a>:</p>
              <div className='plasticTable' id='GUI' />
              <script src='http://tylermerz.com/JS/PlasticTableBundle.js' type='text/javascript' />
            </div>
          </div>
        </div>
      </DefaultLayout>
    )
  }
}
module.exports = Proj
