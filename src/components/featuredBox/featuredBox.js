function FeaturedBox() {
  return (
    <div className="featured-box">
    <div className="featured-box__img">
      <a href="https://google.com"><img src="https://s-f.scribdassets.com/images/landing/index/logo_today.svg?4f55e76f0" alt="Feature Icon"/></a>
    </div>
    <div className="featured-box__body">
      <h3 className="featured-box__body-title">Responsive Layout</h3>
      <p className="featured-box__body-description">
        Powerful Layout with Responsive functionality that can be adapted to any screen size. Resize browser
        to view.
      </p>
    </div>
  </div>
  )
}

export default FeaturedBox;