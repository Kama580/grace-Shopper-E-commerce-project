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
        transition={{duration: 0.5}}
      >
        <img
          className="landing-image"
          src="https://bhldn-production-weblinc.netdna-ssl.com/media/W1siZiIsIjIwMjAvMTIvMjIvMTIvMjIvMjEvMTE0OTc5NjYtMDhiMC00YjgxLWFlYWUtOGVhMzRkMGQ1MGU4L2hwZ18wMS5qcGciXV0/hpg_01.jpg?sha=3cf3ef765795e1e8"
        />
      </motion.div>
    )
  }
}

export default LandingPage
