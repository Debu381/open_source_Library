function SectionHeading({section_title}) {
  return (
    <div className="section-heading-block">
      <div className="section-heading-block__container container">
        <h3 className="section-heading"> {section_title ? section_title : 'Section Name here'}</h3>
      </div>
    </div>
  )
}

export default SectionHeading;