import { useState } from 'react'
import Scene from './components/Scene'
import './App.css'

export default function App() {
  const [activeModel, setActiveModel] = useState('furniture_bed1')
  const [activeCategory, setActiveCategory] = useState('furniture')
  const [activeSubCategory, setActiveSubCategory] = useState('bed')

  const categories = [
    { 
      id: 'furniture', 
      name: '가구',
      subCategories: [
        { id: 'bed', name: '침대' },
        { id: 'firePlace', name: '벽난로' },
        { id: 'others', name: '기타' }
      ]
    },
    { 
      id: 'food', 
      name: '음식',
      subCategories: [
        { id: 'korean', name: '한식' },
        { id: 'western', name: '양식' },
        { id: 'dessert', name: '디저트' },
        { id: 'drink', name: '음료' }
      ]
    },
    { 
      id: 'ride', 
      name: '탈것',
      subCategories: [
        { id: 'bus', name: '버스' },
      ]
    }
    // { 
    //   id: 'character', 
    //   name: '캐릭터',
    //   subCategories: [
    //     { id: 'VRoid', name: 'vroid' },
    //     { id: 'Remodeling', name: 'Remodeling' },
    //     { id: 'OC', name: 'OC' },
    //   ]
    // }
  ]

  const models = {
    furniture: {
      bed: [
        { id: 'furniture_bed1', name: '침대1', path: '/models/furniture/bed1.glb' },
        { id: 'furniture_bed2', name: '침대2', path: '/models/furniture/bed2.glb' },
      ],
      firePlace: [
        { id: 'furniture_firePlace1', name: '벽난로1', path: '/models/furniture/firePlace1.glb' },
        { id: 'furniture_firePlace2', name: '벽난로2', path: '/models/furniture/firePlace2.glb' }
      ],
      others: [
        { id: 'furniture_others1', name: '트리', path: '/models/furniture/tree.glb' },
        { id: 'furniture_others2', name: '선물1', path: '/models/furniture/present.glb' },
        { id: 'furniture_others3', name: '선물2', path: '/models/furniture/present2.glb' },
        { id: 'furniture_others4', name: '선물3', path: '/models/furniture/present3.glb' },
        { id: 'furniture_others5', name: '선물4', path: '/models/furniture/present4.glb' }
      ],

      // ... 다른 서브카테고리의 모델들
    },
    food: {
      korean: [
        { id: 'food_korean1', name: '김밥', path: '/models/food/gimbab.glb' },
        { id: 'food_korean2', name: '오므라이스', path: '/models/food/egg.glb' },
      ],
      western: [
        { id: 'food_western1', name: '스테이크', path: '/models/food/steak.glb' },
        { id: 'food_western2', name: '토스트', path: '/models/food/toast.glb' },
      ],
      dessert: [
        { id: 'food_dessert1', name: '디저트', path: '/models/food/coffe.glb' },
      ],
      drink: [
        { id: 'food_drink1', name: '음료', path: '/models/food/strawberry.glb' },
      ],
      // ... 다른 서브카테고리의 모델들
    },

    ride: {
      bus: [
        { id: 'ride_bus1', name: '버스1', path: '/models/ride/bus.glb' },
      ],
    }
    // character: {
    //   human: [
    //     { id: 'character_human1', name: '남성', path: '/models/character/male.glb' },
    //     { id: 'character_human2', name: '여성', path: '/models/character/female.glb' }
    //   ],
    //   animal: [
    //     { id: 'character_animal1', name: '강아지', path: '/models/character/dog.glb' },
    //     { id: 'character_animal2', name: '고양이', path: '/models/character/cat.glb' }
    //   ],
    //   // ... 다른 서브카테고리의 모델들
    // }
  }

  const handleCategoryChange = (categoryId) => {
    setActiveCategory(categoryId)
    const firstSubCategory = categories.find(cat => cat.id === categoryId).subCategories[0].id
    setActiveSubCategory(firstSubCategory)
    setActiveModel(models[categoryId][firstSubCategory][0].id)
  }

  const handleSubCategoryChange = (subCategoryId) => {
    setActiveSubCategory(subCategoryId)
    setActiveModel(models[activeCategory][subCategoryId][0].id)
  }

  return (
    <div className="h-screen w-screen flex flex-col">
      <div className="w-full p-4 space-y-4">
        {/* 메인 카테고리 선택 */}
        <div className="flex gap-4 justify-center">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => handleCategoryChange(category.id)}
              className={`px-6 py-2 rounded-lg ${
                activeCategory === category.id
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-200 hover:bg-gray-300'
              }`}
            >
              {category.name}
            </button>
          ))}
        </div>

        {/* 서브 카테고리 선택 */}
        <div className="flex gap-4 justify-center">
          {categories
            .find(cat => cat.id === activeCategory)
            .subCategories.map((subCategory) => (
              <button
                key={subCategory.id}
                onClick={() => handleSubCategoryChange(subCategory.id)}
                className={`px-4 py-1.5 rounded-lg ${
                  activeSubCategory === subCategory.id
                    ? 'bg-blue-400 text-white'
                    : 'bg-gray-100 hover:bg-gray-200'
                }`}
              >
                {subCategory.name}
              </button>
          ))}
        </div>

        {/* 모델 선택 버튼 */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 items-center gap-4 overflow-y-auto">
          {models[activeCategory][activeSubCategory].map((model) => (
            <button
              key={model.id}
              onClick={() => setActiveModel(model.id)}
              className={`flex-1 px-4 py-2 rounded-lg min-w-[85px] max-w-[300px] ${
                activeModel === model.id
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-200 hover:bg-gray-300'
              }`}
            >
              {model.name}
            </button>
          ))}
        </div>
      </div>
      <Scene activeModel={activeModel} />
    </div>
  )
} 