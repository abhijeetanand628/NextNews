import './App.css'
import Footer from './components/Footer'
import Header from './components/Header'
import HotTopics from './components/HotTopics'
import LatestNews from './components/LatestNews'

function App() {

  return (
    <div className='min-h-screen flex flex-col'>
      <Header />
      <main  className='flex-1'>
        <HotTopics />
        <LatestNews />
      </main>
      <Footer />
    </div>
  )
}

export default App
