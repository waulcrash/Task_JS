import React, { useState, useEffect } from 'react'
import './ButtonUpWidget.css'

export const ButtonUpWidget = () => {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 300) {
        setIsVisible(true)
      } else {
        setIsVisible(false)
      }
    }

    // Проверяем при монтировании
    toggleVisibility()
    
    window.addEventListener('scroll', toggleVisibility)
    return () => window.removeEventListener('scroll', toggleVisibility)
  }, [])

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    })
  }

  return (
    <div className="button-up-page">
      <h1>5. BUTTON UP</h1>
      
      <div className="button-up-page__content">
        <p>Морские черепахи — одни из самых древних обитателей нашей планеты. Они появились на Земле более 100 миллионов лет назад и дожили до наших дней, почти не изменившись.</p>
        <p>Зеленая черепаха может весить до 200 килограммов и достигать длины панциря более метра.</p>
        <p>Кожистые черепахи — настоящие гиганты, они могут весить до 900 килограммов.</p>
        <p>Черепахи — долгожители. В дикой природе они могут жить 80-100 лет.</p>
        <p>Интересно, что пол черепах зависит от температуры песка, в котором находятся яйца.</p>
        <p>Черепахи откладывают яйца на том же пляже, где родились сами.</p>
        <p>Несмотря на кажущуюся медлительность, черепахи могут развивать скорость в воде до 35 километров в час.</p>
        <p>У черепах отличная память и развитое зрение. Они различают цвета.</p>
        <p>К сожалению, шесть из семи видов морских черепах находятся под угрозой исчезновения.</p>
        <p>Во многих странах созданы программы по охране черепах.</p>
        <p>Черепахи могут задерживать дыхание под водой на несколько часов.</p>
        <p>Температура инкубации яиц определяет пол будущих черепашат.</p>
        <p>Морские черепахи совершают миграции на тысячи километров.</p>
        <p>Панцирь черепахи состоит из костных пластин, покрытых роговыми щитками.</p>
        <p>Некоторые виды черепах могут развивать скорость в воде до 35 км/ч.</p>
      </div>
      
      {/* Кнопка отображается всегда, но с классом для видимости */}
      <button 
        className={`button-up-js ${isVisible ? 'button-up-js--visible' : ''}`}
        onClick={scrollToTop}
        aria-label="Наверх"
      >
        <span className="button-up-js__arrow"></span>
      </button>
    </div>
  )
}