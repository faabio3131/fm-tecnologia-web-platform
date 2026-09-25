import Hero from './components/Hero'
import CoreAssistant from './components/CoreAssistant'
import Products from './components/Products'
import CtaFinal from './components/CtaFinal'
import SiteHeader from './components/SiteHeader'
import SiteFooter from './components/SiteFooter'

function App() {
  return (
    <div className="page">
      <SiteHeader />
      <main>
        <Hero />
        <CoreAssistant />
        <Products />
        <CtaFinal />
      </main>
      <SiteFooter />
    </div>
  )
}

export default App
