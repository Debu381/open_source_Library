import { Link } from "react-router-dom";

function PillList({ tags }) {
  return (
    <div className="book-detail__pill-list">
      <ul className="pill-list">

        {
          tags.map((tag) => {
            return (
              <li key={tag.id} className="pill-list__item"><Link to={`/tags/${tag.id}`}>{tag.tag_name}</Link></li>
            )
          })
        }
      </ul>
    </div>
  )
}

export default PillList;