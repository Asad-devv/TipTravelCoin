import CommunitySection from "../Components/LandingPageComp/CommunitySection"
import FAQ from "../Components/LandingPageComp/FAQ"
import Hero from "../Components/LandingPageComp/Hero"
import PlatformFeatures from "../Components/LandingPageComp/PlatformFeatures"
import PreSaleDetails from "../Components/LandingPageComp/PreSaleDetails"
import RoadmapSection from "../Components/LandingPageComp/RoadmapSection"
import TokenDistribution from "../Components/LandingPageComp/TokenDistribution"
import TokenomicsDisplay from "../Components/LandingPageComp/TokenomicsDisplay"


const Home = () => {
    return (
        <div >

            <Hero />
            <PreSaleDetails />
            <TokenomicsDisplay />
            <RoadmapSection />
            <PlatformFeatures />
            {/* <LogoSlider /> */}
            <TokenDistribution />
            <CommunitySection />
            <FAQ />
        </div>
    )
}

export default Home