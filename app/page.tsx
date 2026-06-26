import Nav from './components/Nav'
import Hero from './components/Hero'
import FeaturesSection from './components/FeaturesSection'
import PricingSection from './components/PricingSection'
import SocialProof from './components/SocialProof'
import Footer from './components/Footer'

export default function HomePage() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <FeaturesSection />
        <PricingSection />
        <SocialProof />
      </main>
      <Footer />
    </>
  )
}
