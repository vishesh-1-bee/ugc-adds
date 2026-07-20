import CTA from "../components/CTA"
import Features from "../components/Features"
import Hero from "../components/Hero"
import Pricing from "../components/Pricing"
import Workflow from "../components/Workflow"


const Home = () => {
  return (
    <div>
    <main>
          <Hero />
          <Features />
          <Workflow />
          <Pricing />
          <CTA />
        </main>

    </div>
  )
}   

export default Home