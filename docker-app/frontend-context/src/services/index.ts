import { Image } from './types'
import Axios from 'axios'

export async function getImages(): Promise<Image[]> {
  try {
    const response = await Axios.get('/api/images')
    return response.data as Image[]
  } catch (e) {
    throw new Error(e)
  }
}

export async function likePhoto(name: string) {
  try {
    await Axios.post('/api/image/like', { name })
  } catch (e) {
    throw new Error(e)
  }
}
