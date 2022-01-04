import Alert from "../components/alert/alert";
import CardList from "../components/cardList/cardList";
import SectionHeading from "../components/sectionHeading/sectionHeading";

function List(props) {
  return (
    <div className="page__list">
      <SectionHeading section_title="List of books"/>
      { props.location?.state?.alert_message && (<div className="container--no-flex"><Alert msg={props.location.state.alert_message} /></div>) }
      <CardList />
    </div>
  )
}

export default List;