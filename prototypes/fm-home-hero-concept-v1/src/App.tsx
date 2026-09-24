import Hero from './components/Hero'
import CoreAssistant from './components/CoreAssistant'
import Products from './components/Products'
import SiteHeader from './components/SiteHeader'

function App() {
  return (
    <div className="page">
      <SiteHeader />
      <main>
        <Hero />
        <CoreAssistant />
        <Products />
      </main>
    </div>
  )
}

export default App
