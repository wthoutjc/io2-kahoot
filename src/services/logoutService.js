import PropTypes from 'prop-types'

const logoutService = async (tokenJWT, url) => {
  if (tokenJWT) {
    try {
      const settingsDelete = {
        method: 'DELETE',
        headers: new Headers({
          'Access-Control-Allow-Origin': '*',
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + tokenJWT,
        }),
      }
      const res = await fetch(url, settingsDelete)
      if (res) {
        return true
      }
    } catch (error) {
      console.error(error)
    }
  } else {
    return 'Token no válido'
  }
}

logoutService.propTypes = {
  tokenJWT: PropTypes.string.isRequired,
  setRender: PropTypes.func.isRequired,
}

export default logoutService
