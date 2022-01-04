import FeaturedBox from "../featuredBox/featuredBox";

function FeaturedBoxList() {
  return (
    <div className="featured-boxes">
      <div className="featured-boxes__container container">
        <div className="featured-boxes__title-wrapper">
          <h3 className="featured-boxes__title section-heading">What You Get with Open Library?</h3>
          <p className="featured-boxes__description">
            Best-Selling &amp; Most Trusted HTML5 Template. Experience the Ever-Growing Feature Rich Template since
            2014.
          </p>

          <div className="featured-box-list">
            <FeaturedBox />
            <FeaturedBox />
            <FeaturedBox />
            <FeaturedBox />
          </div>
        </div>
      </div>
    </div>
  )
}

export default FeaturedBoxList;