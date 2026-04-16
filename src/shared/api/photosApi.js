import { axiosInstance } from './axiosInstance'

const BASE_URL = 'https://jsonplaceholder.typicode.com'

const getWorkingImageUrl = (id) => {
  return `https://picsum.photos/id/${id}/600/400`
}

export const getPhotos = async (limit = 10) => {
  try {
    const response = await axiosInstance.get(`${BASE_URL}/photos?_limit=${limit}`)
    
    // Заменяем недоступные URL на рабочие из picsum.photos
    const photosWithWorkingUrls = response.data.map((photo, index) => ({
      ...photo,
      url: getWorkingImageUrl(photo.id || index + 1),
      thumbnailUrl: getWorkingImageUrl(photo.id || index + 1)
    }))
    
    return photosWithWorkingUrls
  } catch (error) {
    console.error('Ошибка загрузки фото:', error)
    
    const fallbackPhotos = []
    for (let i = 1; i <= limit; i++) {
      fallbackPhotos.push({
        id: i,
        title: `Изображение ${i}`,
        url: getWorkingImageUrl(i),
        thumbnailUrl: getWorkingImageUrl(i)
      })
    }
    return fallbackPhotos
  }
}