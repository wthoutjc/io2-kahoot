const postService = async ({ url, params }) => {
  const settings = {
    method: 'POST',
    body: JSON.stringify({ ...params }),
    headers: new Headers({
      Authorization: 'Bearer ' + localStorage.getItem('jwtStudent'),
    }),
  }

  try {
    const res = await fetch(`${url}`, settings)
    const dataUser = await res.json()
    if (await res) {
      if ((await res.status) !== 200) return [dataUser.results, false]
      else return [dataUser.results, true]
    } else return ['Falló el procesamiento de la solicitud', false]
  } catch (error) {
    console.error(error)
    return [error, false]
  }
}

export default postService
