import { axiosInstance } from './axiosInstance'

const BASE_URL = 'https://jsonplaceholder.typicode.com'

export const getPhotos = async (limit = 10) => {
  try {
    const response = await axiosInstance.get(`${BASE_URL}/photos?_limit=${limit}`)
    return response.data
  } catch (error) {
    console.error('Ошибка загрузки фото:', error)
    throw error
  }
}