import '../../styles/loader/loadingServer.css'
import PropTypes from 'prop-types'

const LoadingServer = ({ render }) => {
  return (
    <>
      {render && (
        <div className="loading-server-overlay_loader">
          <div className="loading-server-loader">
            <div></div>
            <div></div>
            <div></div>
            <div></div>
          </div>
        </div>
      )}
    </>
  )
}

LoadingServer.propTypes = {
  render: PropTypes.bool.isRequired,
}

export default LoadingServer
