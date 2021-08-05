import { useHistory } from "react-router-dom"

const useCustomRedirect = (uri) => {
  const history = useHistory()

  const goToUri = () => history.push(uri)

  return { goToUri }
}

export { useCustomRedirect }
