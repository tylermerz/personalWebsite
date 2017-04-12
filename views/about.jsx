var React = require('react')
var DefaultLayout = require('./layouts/default')

class AboutMe extends React.Component {
  render () {
    return (
      <DefaultLayout title='About Me'>
        <div className='mainBody'>
          <div className='postMeat'>
            <div className='postBody'>
              <hr />
              <h1>About Me</h1>
              <p>
                <img src='http://tylermerz.com/tm.jpg' className='portrait' />
                                                                       I am currently working on a Ph.D. in the Applied Physics at Stanford University focusing on the intrinsic properties of a
                                                                       superconducting semiconductor, SrTiO<sub>3</sub>, and devices based on it. Specifically, my work involves exploring the role
                  of mechanical deformations and imperfections in determining the electrical conductivity in this material. From this better
                  understanding, our fundamental understanding of oxide materials can be improved and therefore fed back into the design of the next
                  generations of electronic materials which make up our world.
                  </p>
              <p>
                  During the course of my Ph.D. work, I became much more serious about computer programming. It went from a casual interest that I
                  had possessed since high school into something more formal. I took the Stanford introduction to computer programming courses and

                  began working on more involved projects, this website and the blog posts therein being the first major outlet for them. My interests
                  in computer programming are still developing as I am exposed to more of its facets, but it currently sits within the realm of web development
                  and integrating solutions to physical problems within a web browser. Check the <a href='/proj/'>projects</a> page for a listing of my
                              large projects.
                              </p>
              <p>My LinkedIn profile can be found <a href='https://www.linkedin.com/in/tyler-merz-571552124/'>here</a> and I can be reached at tyler . merz at gmail dot com.
                                      </p>
              <hr />
              <h2>Education</h2>
              <ul>
                <li>Ph.D. in Applied Physics - Stanford University - 2012-December 2017 (expected)</li>
                <li>M.Phil. in Physics - University of Cambridge - 2011-2012</li>
                <li>B.S. in Engineering Physics - Ohio State Uiversity - 2007-2011</li>
              </ul>
              <hr />
              <h2>Selected National Awards</h2>
              <ul>
                <li>National Science Foundation Graduate Research Fellowship</li>
                <li>Winston Churchill Scholarship</li>
                <li>Barry M. Goldwater Scholarship</li>
              </ul>
              <p>My full CV can be downloaded <a href='http://tylermerz.com/TAMerzCV.pdf'>here</a>.</p>
            </div>
          </div>
        </div>
      </DefaultLayout>
    )
  }
}
module.exports = AboutMe
