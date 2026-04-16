import React from 'react'
import { Routes, Route, Link, useLocation } from 'react-router-dom'
import SliderPage from './pages/SliderPage/SliderPage'
import FormPage from './pages/FormPage/FormPage'
import SearchFilterPage from './pages/SearchFilterPage/SearchFilterPage'
import ConverterPage from './pages/ConverterPage/ConverterPage'
import ButtonUpPage from './pages/ButtonUpPage/ButtonUpPage'
import './styles/App.css'

const Navigation = () => {
  const location = useLocation()
  
  const links = [
    { path: '/slider', name: 'Слайдер' },
    { path: '/form', name: 'Форма' },
    { path: '/search', name: 'Поиск' },
    { path: '/converter', name: 'Конвертер' },
    { path: '/button-up', name: 'Кнопка Up' }
  ]

  return (
    <nav className="navigation">
      <div className="navigation__container">
        {links.map(link => (
          <Link
            key={link.path}
            to={link.path}
            className={`navigation__link ${location.pathname === link.path ? 'active' : ''}`}
          >
            {link.name}
          </Link>
        ))}
      </div>
    </nav>
  )
}

const App = () => {
  return (
    <div className="app">
      <Navigation />
      <main className="app__main">
        <Routes>
          <Route path="/" element={<SliderPage />} />
          <Route path="/slider" element={<SliderPage />} />
          <Route path="/form" element={<FormPage />} />
          <Route path="/search" element={<SearchFilterPage />} />
          <Route path="/converter" element={<ConverterPage />} />
          <Route path="/button-up" element={<ButtonUpPage />} />
        </Routes>
      </main>
    </div>
  )
}

export default App