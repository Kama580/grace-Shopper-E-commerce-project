import React from 'react'
import {motion} from 'framer-motion'

class LandingPage extends React.Component {
  render() {
    return (
      <motion.div
        className="landing-page"
        initial={{opacity: 0}}
        animate={{opacity: 1}}
        exit={{opacity: 0}}
        transition={{duration: 1}}
      >
        {/* <div>

          <img
            className="landing-image"
            src="https://bhldn-production-weblinc.netdna-ssl.com/media/W1siZiIsIjIwMjAvMTIvMjIvMTIvMjIvMjEvMTE0OTc5NjYtMDhiMC00YjgxLWFlYWUtOGVhMzRkMGQ1MGU4L2hwZ18wMS5qcGciXV0/hpg_01.jpg?sha=3cf3ef765795e1e8"
          />

        </div> */}

        <section className="home" id="home">
          <div className="home__container bd-grid">
            {/* <div class="home__img">
                        <img src="https://s7d1.scene7.com/is/image/BHLDN/59206052_011_b2?$pdpmain$" alt="" data-speed="-2" class="move" />
                        <iframe title="vimeo-player" src="https://player.vimeo.com/video/488963674?autoplay=1" width="640" height="960" frameborder="0" allowfullscreen> </iframe>"
                    </div> */}

            <div className="home__data">
              <h1 className="home__title">Love Moves You</h1>
              <p className="home__description">
                Love is a lot like dancing—joyful, complex & exhilarating when
                you’ve found the perfect partner.
              </p>

              <a href="/products" className="home__button">
                Shop Your Perfect Dresss
              </a>
            </div>
          </div>
        </section>
      </motion.div>
    )
  }
}

export default LandingPage
