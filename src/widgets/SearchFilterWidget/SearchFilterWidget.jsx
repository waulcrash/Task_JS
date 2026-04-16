import React, { useState } from 'react'
import './SearchFilterWidget.css'

const initialItems = [
  'Яблоко', 'Банан', 'Апельсин', 'Груша', 'Киви',
  'Манго', 'Ананас', 'Виноград', 'Арбуз', 'Дыня',
  'Клубника', 'Малина', 'Вишня', 'Персик', 'Слива'
]

export const SearchFilterWidget = () => {
  const [searchTerm, setSearchTerm] = useState('')

  const filteredItems = initialItems.filter(item =>
    item.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="search-filter">
      <h1>3. SEARCH AND FILTER</h1>
      
      <div className="search-filter__container">
        <input
          type="text"
          className="search-filter__input"
          placeholder="Поиск.."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        
        <div className="search-filter__results">
          <p className="search-filter__count">
            Найдено: {filteredItems.length} из {initialItems.length}
          </p>
          
          <ul className="search-filter__list">
            {filteredItems.map((item, index) => (
              <li key={index} className="search-filter__item">
                {item}
              </li>
            ))}
          </ul>
          
          {filteredItems.length === 0 && (
            <p className="search-filter__empty">
              Ничего не найдено.
            </p>
          )}
        </div>
      </div>
    </div>
  )
}