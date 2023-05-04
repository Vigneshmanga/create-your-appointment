import './index.css'

const AppointmentItem = props => {
  const {details, changeStarStatus} = props
  const {id, title, date, isStarred} = details
  const starredImageUrl = isStarred
    ? 'https://assets.ccbp.in/frontend/react-js/appointments-app/filled-star-img.png'
    : 'https://assets.ccbp.in/frontend/react-js/appointments-app/star-img.png'

  const onClickStarBtn = () => {
    changeStarStatus(id)
  }

  return (
    <li className="appointment-list-item">
      <div>
        <p className="title-heading">{title}</p>
        <p className="date-text">{`Date: ${date}`}</p>
      </div>
      <button
        onClick={onClickStarBtn}
        type="button"
        className="star-btn"
        data-testid="star"
      >
        <img src={starredImageUrl} className="star-image" alt="star" />
      </button>
    </li>
  )
}

export default AppointmentItem
