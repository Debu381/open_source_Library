import { Link } from "react-router-dom";

function Card({ id, title, image, description, authorName, authorURL }) {
  return (
    <div className="card">

      <Link className="card__title" to={`/book/${id}`}>{title}</Link>

      <img
        className="card__img"
        alt="awesome book cover"
        src={image}
      />

      <div className="card__description">
        {description}
      </div>

      <a className="card__author" href={authorURL}>{authorName}</a>
    </div>
  )
}


export default Card;