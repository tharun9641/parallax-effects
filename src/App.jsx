

import './App.css'
import ScrollingAnimation from './components/scrolling'
import RotatingAnimation from './components/rotating'

function App() {
  return (
    <main className='w-full h-screen bg-black text-white'>
      <div className='text-white font-bolf text-8xl text-center flex items-center h-full w-full justify-center'>
        Hello
      </div>
      <RotatingAnimation />
      <ScrollingAnimation />
    </main>
  )
}

export default App
