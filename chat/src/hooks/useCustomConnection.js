import { useEffect, useRef } from "react";

const useCustomConnection = (uri, token) => {
  const connection = useRef(null)
  useEffect(() => {
   
  }, [token, uri])
  if(connection){
    return { connection: connection.current }
  }
}

export { useCustomConnection }
