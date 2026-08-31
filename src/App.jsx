import './App.css'
import {Routes, Route} from 'react-router-dom'
import Footer from './components/Footer'
import Header from './components/Header'
import Home from './pages/Home'
import CategoryNews from './pages/CategoryNews'
import SearchNews from './pages/SearchNews'

function App() {

  return (
    <div className='min-h-screen flex flex-col'>
      <Header />
      <main  className='flex-1'>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/search' element={<SearchNews />} />

          <Route
            path='/category/:category'
            element={<CategoryNews />}
          />
          
        </Routes>
      </main>
      <Footer />
    </div>
  )
}

export default App
