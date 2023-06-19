import { SERVER_URL } from '../../app/config/app.config'
export  const useServerFile = (url: string) => {
    return `${SERVER_URL}/${url}`
}