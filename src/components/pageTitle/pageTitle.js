export default function PageTitle({ title, subTitle }) {
  return (
    <div className="page-title">
    {title && <h1> {title} </h1>} 
    {subTitle && <i> {subTitle} </i>}
    <hr />
    </div>
  )
}