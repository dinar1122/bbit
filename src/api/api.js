import {apiFetch} from './baseURL'

export const Api = {
  
  async fetchAlbumPhotoById(id) {
    let ids = null
    if(typeof id == 'string') {
      ids = id.split(' ').join('&albumId=')
    } 
    return await apiFetch(`/photos?${id ?`albumId=${ids ?? id}`:``}`)
  },
  
}