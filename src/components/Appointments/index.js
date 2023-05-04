import {Component} from 'react'

import {format} from 'date-fns'

import {v4 as uuidv4} from 'uuid'

import AppointmentItem from '../AppointmentItem'

import './index.css'

class Appointments extends Component {
  state = {title: '', date: '', appointmentsList: [], showAll: true}

  onTypingTitle = event => {
    this.setState({title: event.target.value})
  }

  onTypingDate = event => {
    this.setState({date: event.target.value})
  }

  changeStarStatus = id => {
    this.setState(prevState => ({
      title: prevState.title,
      date: prevState.date,
      appointmentsList: prevState.appointmentsList.map(each => {
        if (each.id === id) {
          return {...each, isStarred: !each.isStarred}
        }
        return each
      }),
    }))
  }

  changeStateShow = () => {
    const {showAll} = this.state
    this.setState({showAll: !showAll})
  }

  onSubmitAppointment = event => {
    event.preventDefault()
    const {title, date} = this.state
    if (title !== '' && date !== '') {
      const formattedDate = format(new Date(date), 'dd MMMM yyyy, EEEE')
      const newAppointment = {
        id: uuidv4(),
        title,
        date: formattedDate,
        isStarred: false,
      }
      this.setState(prevState => ({
        title: '',
        date: '',
        appointmentsList: [...prevState.appointmentsList, newAppointment],
      }))
    }
  }

  render() {
    const {title, date, appointmentsList, showAll} = this.state
    const toBeDisplayList = showAll
      ? [...appointmentsList]
      : appointmentsList.filter(each => each.isStarred)

    const starredBtnCls = showAll ? 'starred-btn' : 'un-starred-btn'

    console.log(starredBtnCls, showAll)

    return (
      <div className="bg-container">
        <div className="card-container">
          <div className="card-top-section">
            <form onSubmit={this.onSubmitAppointment} className="form-el">
              <h1 className="top-section-heading">Add Appointment</h1>
              <label className="label" htmlFor="title">
                TITLE
              </label>
              <input
                onChange={this.onTypingTitle}
                className="input-el"
                type="input"
                id="title"
                placeholder="Title"
                value={title}
              />
              <label htmlFor="date" className="label">
                DATE
              </label>
              <input
                value={date}
                onChange={this.onTypingDate}
                id="date"
                className="input-el"
                type="date"
              />
              <button className="add-btn" type="submit">
                Add
              </button>
            </form>
            <img
              src="https://assets.ccbp.in/frontend/react-js/appointments-app/appointments-img.png"
              alt="appointments"
              className="appointments-image"
            />
          </div>
          <div className="middle-section">
            <h1 className="middle-section-heading">Appointments</h1>
            <button
              onClick={this.changeStateShow}
              type="button"
              className={starredBtnCls}
            >
              Starred
            </button>
          </div>
          <ul className="bottom-appointments-container">
            {toBeDisplayList.map(each => (
              <AppointmentItem
                key={each.id}
                details={each}
                changeStarStatus={this.changeStarStatus}
              />
            ))}
          </ul>
        </div>
      </div>
    )
  }
}

export default Appointments
