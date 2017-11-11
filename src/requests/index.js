import request from 'request-promise-native'

export const getArchives = () => {
  const reqOptions = {
    method: 'GET',
    uri: `https://pastebin.com/archive`
  }

  return request(reqOptions)
}
