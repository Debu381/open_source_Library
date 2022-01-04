import BestBooksGrid from "../components/bestBooksGrid/bestBooksGrid";
import FeaturedBoxList from "../components/featuredBoxList/featuredBoxList";
import FeaturedDataList from "../components/featuredDataList/featuredDataList";
import FeaturedTestimonial from "../components/featuredTestimonial/featuredTestimonial";
import Hero from "../components/hero/hero";

function Home() {

  const heroData = {
    title: "Endless entertainment and knowledge",
    subtitle: "Read or listen anytime, anywhere.",
    ctaText: "Read free for 90 days",
    ctaSubText: "Only ₹299/month after. Cancel anytime."
  }
  
  return (
    <div className="page__home">
      <Hero {...heroData} />
      <FeaturedBoxList />
      <FeaturedTestimonial />
      <BestBooksGrid />
      <FeaturedDataList />
    </div>
  )
}

export default Home;