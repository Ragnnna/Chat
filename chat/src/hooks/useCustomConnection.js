import { useEffect, useRef } from "react";

const useCustomConnection = (uri, token) => {
  const connection = useRef(null)
  useEffect(() => {
    const ws = new WebSocket(uri)
    connection.current = ws
    ws.onopen = () => {
      ws.send(JSON.stringify({ 
        type: 'VERIFY_USER',
        data: token
      }))
      ws.onmessage = (m) => {
        const message = JSON.parse(m.data)
        if(message === 'Invalid Token'){
          return ws.close()
        }
      }
    }
    return () => ws.close()
  }, [])

  return { connection: connection.current }
}

export { useCustomConnection }
