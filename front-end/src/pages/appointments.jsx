import React, { Component } from "react";
import ATable from "../components/atable";
import { Container } from "react-bootstrap";
import NewAppointment from "../components/newAppointment";
import CancelAppointmentConfirm from "../components/cancelAppointmentConfirm";
import NoAppSelection from "../components/newAppNoSelectionModal";
import axios from "axios";

class Appointment extends React.Component {
  state = {
    allAppointments: [],
    newAppVisibility: false,
    cancelAppVisibility: false,
    appointmentDeleting: null,
    noSelectionVisibility: false,
  };

  getCoachNameById(id) {
    axios.get(`http://localhost:4000/branch_staff/${id}`).then((res) => {
      const name = res.data.firstName + res.data.lastName;
      return name;
    });
  }

  getBranchNameById(id) {
    axios.get(`http://localhost:4000/branch/${id}`).then((res) => {
      const name = res.data.name;
      return name;
    });
  }

  componentDidMount() {
    const userId = localStorage.getItem("id");
    axios.get("http://localhost:4000/timeslot").then((res) => {
      const timeslots = res.data;
      const filtered = timeslots.filter((timeslot) => {
        if (timeslot.customerId == null) {
          return false;
        }
        return timeslot.customerId == userId;
      });
      let appointments = filtered.map((appointment) => ({
        _id: appointment._id,
        coach: this.getCoachNameById(appointment.coachId),
        branch: this.getBranchNameById(appointment.branchId),
        time: this.getAppointmentTime(appointment),
        date: this.getAppointmentDate(appointment),
      }));
      console.log(appointments);
      this.setState({
        allAppointments: appointments,
      });
    });
  }

  getAppointmentTime(appointment) {
    const startTime = new Date(appointment.startTime);
    const endTime = new Date(appointment.endTime);
    let startHour = startTime.getHours().toString();
    let startMinute = startTime.getMinutes().toString();
    let endHour = endTime.getHours().toString();
    let endMinute = endTime.getMinutes().toString();
    if (startHour === "0") {
      startHour = "00";
    }
    if (startMinute === "0") {
      startMinute = "00";
    }
    if (endHour === "0") {
      endHour = "00";
    }
    if (endMinute === "0") {
      endMinute = "00";
    }
    return startHour + ":" + startMinute + "-" + endHour + ":" + endMinute;
  }

  getAppointmentDate(appointment) {
    let date = new Date(appointment.startTime);
    return date.getFullYear() + "-" + date.getMonth() + "-" + date.getDate();
  }

  handleNewAppointment = () => {
    this.setState({
      newAppVisibility: true,
    });
  };

  handleCloseNewApp = () => {
    this.setState({
      newAppVisibility: false,
    });
  };

  handleCloseCancelApp = () => {
    this.setState({ cancelAppVisibility: false });
  };

  handleDelete = (appointment) => {
    this.setState({
      appointmentDeleting: appointment,
      cancelAppVisibility: true,
    });
  };

  handleConfirmDelete = () => {
    const appointments = this.state.allAppointments.filter(
      (appointment) => appointment._id !== this.state.appointmentDeleting._id
    );
    this.setState({
      allAppointments: appointments,
      cancelAppVisibility: false,
    });
  };

  handleMakeNewApp = (timeSlot) => {
    if (timeSlot === null) {
      this.setState({ noSelectionVisibility: true });
    } else {
      console.log(timeSlot);
      this.setState({ newAppVisibility: false });
    }
  };

  handleNoSelectionClose = () => {
    this.setState({ noSelectionVisibility: false });
  };

  render() {
    return (
      <div>
        <Container className="d-flex flex-column justify-content-center">
          <ATable
            allAppointments={this.state.allAppointments}
            onDelete={this.handleDelete}
          />
          <button
            type="button"
            className="btn btn-primary btn-sm align-self-center"
            style={{ width: "10rem" }}
            onClick={this.handleNewAppointment}
          >
            New appointment
          </button>
        </Container>
        <NewAppointment
          show={this.state.newAppVisibility}
          handleClose={this.handleCloseNewApp}
          onSubmit={this.handleMakeNewApp}
        />
        <CancelAppointmentConfirm
          onClose={this.handleCloseCancelApp}
          ifVisible={this.state.cancelAppVisibility}
          onConfirmDelete={this.handleConfirmDelete}
        />
        <NoAppSelection
          ifVisible={this.state.noSelectionVisibility}
          onClose={this.handleNoSelectionClose}
        />
      </div>
    );
  }
}

export default Appointment;
