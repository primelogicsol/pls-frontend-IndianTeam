import { getHomePage } from "@/lib/home-page"
import { HeroSection } from "@/components/home/hero-section"
import AllServices from "@/components/home/all-services"
import { IndustryCard } from "@/components/home/industry-card"
import { QualityServices } from "@/components/home/quality-services"
import { unstable_noStore as noStore } from "next/cache"
import SearchSection from "@/components/home/search-section"
import EnterpriseSuite from "@/components/home/enterprise-suite"
import DigitalServices from "@/components/home/digital-services"
import QualityDigital from "@/components/home/quality-digital"
import IndustryCardSection from "@/components/home/industry-card-section"
import { QualityIndustry } from "@/components/home/quality-industry"
import TechnologyCardSection from "@/components/home/technology-card-section"
import { TechnologyIndustry } from "@/components/home/technology_industry"
import Designers from "@/components/home/designers"
import Clientcard from "@/components/home/client-card"
import Testimonials from "@/components/home/testimonials"
import Talents from "@/components/home/talents"
import ProcessTimeline from "@/components/home/process-timeline"
import Appointment from "@/components/home/appointment"
// Import the PLS Advantage component
import PLSAdvantage from "@/components/home/pls-advantage"

export default async function Home() {
  // Disable caching to ensure fresh data
  noStore()

  // Fetch home page data
  const homePageData = await getHomePage()

  // Log the data to see what we're getting
  console.log("Home page data:", JSON.stringify(homePageData, null, 2))

  return (
    <main>
      <HeroSection slides={homePageData?.heroSlides || []} />
      <AllServices services={homePageData?.services || []} />
      <PLSAdvantage data={homePageData?.plsAdvantage || {}} />
      <SearchSection />
      <IndustryCard itCards={homePageData?.itCards || []} />
      <QualityServices
        services={homePageData?.qualityServices || []}
        images={
          homePageData?.qualityServiceImages || {
            topImage: "/assets/17.png",
            bottomImage: "/assets/22.png",
          }
        }
      />
      <DigitalServices services={homePageData?.digitalServices || []} />
      <QualityDigital
        services={homePageData?.qualityDigitalSection?.services || []}
        images={
          homePageData?.qualityDigitalSection?.images || {
            topImage: "/assets/9.png",
            bottomImage: "/assets/11.png",
          }
        }
        heading={homePageData?.qualityDigitalSection?.heading}
        subheading={homePageData?.qualityDigitalSection?.subheading}
      />
      <EnterpriseSuite />
      <IndustryCardSection industryCards={homePageData?.industryCards || []} />
      <QualityIndustry
        industries={homePageData?.qualityIndustry || []}
        images={
          homePageData?.qualityIndustryImages || {
            topImage: "/assets/9.png",
            bottomImage: "/assets/15.png",
          }
        }
      />
      <TechnologyCardSection technologyCards={homePageData?.technologyCards || []} />
      <TechnologyIndustry
        industries={homePageData?.technologyIndustry || []}
        images={
          homePageData?.technologyIndustryImages || {
            topImage: "/assets/6.png",
            bottomImage: "/assets/11.png",
          }
        }
      />
      <Designers />
      <Clientcard />
      <Testimonials />
      <Talents />
      <ProcessTimeline />
      <Appointment />
    </main>
  )
}
