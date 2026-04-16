import React, { useState, useEffect } from 'react'
import { getPhotos } from '../../shared/api/photosApi'
import './SliderWidget.css'

export const SliderWidget = () => {
  const [photos, setPhotos] = useState([])
  const [currentIndex, setCurrentIndex] = useState(0)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadPhotos = async () => {
      try {
        const data = await getPhotos(10)
        setPhotos(data)
      } catch (error) {
        console.error('Ошибка загрузки:', error)
      } finally {
        setLoading(false)
      }
    }
    loadPhotos()
  }, [])

  const goToPrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1)
    }
  }

  const goToNext = () => {
    if (currentIndex < photos.length - 1) {
      setCurrentIndex(currentIndex + 1)
    }
  }

  if (loading) {
    return <div className="slider__loading">Загрузка изображений...</div>
  }

  if (photos.length === 0) {
    return <div className="slider__error">Не удалось загрузить изображения</div>
  }

  const currentPhoto = photos[currentIndex]

  return (
    <div className="slider">
      <h1>1. SLIDER</h1>
      
      <div className="slider__container">
        <div className="slider__image-wrapper">
          <img 
            src={currentPhoto.url} 
            alt={currentPhoto.title}
            className="slider__image"
          />
          <p className="slider__caption">{currentPhoto.title}</p>
        </div>
        
        <div className="slider__controls">
          <button 
            className="slider__button slider__button--prev"
            onClick={goToPrev}
            disabled={currentIndex === 0}
          >
            ◀ Назад
          </button>
          
          <span className="slider__counter">
            {currentIndex + 1} / {photos.length}
          </span>
          
          <button 
            className="slider__button slider__button--next"
            onClick={goToNext}
            disabled={currentIndex === photos.length - 1}
          >
            Вперед ▶
          </button>
        </div>
      </div>
    </div>
  )
}