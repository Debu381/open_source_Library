function BestBookGridItem({title,src}) {
  return (
    <li>
      <a href="https://google.com"
      ><img
          className="doc_thumb "
          src={src}
          alt={title}
        /></a>
    </li>
  )
}

export default BestBookGridItem;