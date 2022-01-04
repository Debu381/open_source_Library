import FeaturedDataItem from "../featuredDataItem/featuredDataItem";

function FeaturedDataList() {
  return (
    <div className="featured-data">
      <div className="featured-data__container container">
        <FeaturedDataItem />
        <FeaturedDataItem />
        <FeaturedDataItem />
        <FeaturedDataItem />
      </div>
    </div>
  )
}

export default FeaturedDataList;