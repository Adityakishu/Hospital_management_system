import axios from "axios";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

const AppointmentForm = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [nic, setNic] = useState("");
  const [dob, setDob] = useState("");
  const [gender, setGender] = useState("");
  const [appointmentDate, setAppointmentDate] = useState("");
  const [department, setDepartment] = useState("");
  const [doctorFirstName, setDoctorFirstName] = useState("");
  const [doctorLastName, setDoctorLastName] = useState("");
  const [address, setAddress] = useState("");
  const [hasVisited, setHasVisited] = useState(false);

  const departmentsArray = [
    "Select Department",
    "Pediatrics",
    "Orthopedics",
    "cardiology",
    "Neurology",
    "Oncology",
    "Radiology",
    "Physical Therapy",
    "Dermatology",
    "ENT",
  ];

  const doctorsArray = {
    Pediatrics: [
      { firstName: "John", lastName: "Doe" },
      { firstName: "Jane", lastName: "Smith" },
      { firstName: "Alex", lastName: "Johnson" },
      { firstName: "Chris", lastName: "Lee" },
      { firstName: "Pat", lastName: "Taylor" },
    ],
    Orthopedics: [
      { firstName: "Sam", lastName: "Green" },
      { firstName: "Kelly", lastName: "Brown" },
      { firstName: "Jamie", lastName: "White" },
      { firstName: "Robin", lastName: "Black" },
      { firstName: "Morgan", lastName: "Gray" },
    ],
    cardiology: [
      { firstName: "Jordan", lastName: "King" },
      { firstName: "Taylor", lastName: "Knight" },
      { firstName: "Reese", lastName: "Morgan" },
      { firstName: "Casey", lastName: "Wright" },
      { firstName: "mine", lastName: "car" },
    ],
    Neurology: [
      { firstName: "Sky", lastName: "Walker" },
      { firstName: "Blake", lastName: "Davis" },
      { firstName: "Cameron", lastName: "Wilson" },
      { firstName: "Sydney", lastName: "Miller" },
      { firstName: "River", lastName: "Evans" },
    ],
    Oncology: [
      { firstName: "Avery", lastName: "Brown" },
      { firstName: "Quinn", lastName: "Johnson" },
      { firstName: "Riley", lastName: "White" },
      { firstName: "Jesse", lastName: "Taylor" },
      { firstName: "Alexis", lastName: "Lee" },
    ],
    Radiology: [
      { firstName: "Jordan", lastName: "Young" },
      { firstName: "Casey", lastName: "Clark" },
      { firstName: "Drew", lastName: "Allen" },
      { firstName: "Cameron", lastName: "Lopez" },
      { firstName: "Skyler", lastName: "Adams" },
    ],
    "Physical Therapy": [
      { firstName: "Taylor", lastName: "Nelson" },
      { firstName: "Reese", lastName: "Hill" },
      { firstName: "Casey", lastName: "Scott" },
      { firstName: "Drew", lastName: "Perez" },
      { firstName: "Jordan", lastName: "Roberts" },
    ],
    Dermatology: [
      { firstName: "Riley", lastName: "Edwards" },
      { firstName: "Avery", lastName: "Cruz" },
      { firstName: "Morgan", lastName: "Parker" },
      { firstName: "Alexis", lastName: "Ward" },
      { firstName: "Quinn", lastName: "Ramirez" },
    ],
    ENT: [
      { firstName: "Pat", lastName: "Sanchez" },
      { firstName: "Chris", lastName: "Baker" },
      { firstName: "Alex", lastName: "Gonzalez" },
      { firstName: "Jamie", lastName: "Adams" },
      { firstName: "Robin", lastName: "Butler" },
    ],
  };

  const handleAppointment = async (e) => {
    e.preventDefault();
    try {
      const hasVisitedBool = Boolean(hasVisited);
      const { data } = await axios.post(
        "http://localhost:4000/api/v1/appointment/post",
        {
          firstName,
          lastName,
          email,
          phone,
          nic,
          dob,
          gender,
          appointment_date: appointmentDate,
          department,
          doctor_firstName: doctorFirstName,
          doctor_lastName: doctorLastName,
          hasVisited: hasVisitedBool,
          address,
        },
        {
          withCredentials: true,
          headers: { "Content-Type": "application/json" },
        }
      );
      toast.success(data.message);
      setFirstName("");
      setLastName("");
      setEmail("");
      setPhone("");
      setNic("");
      setDob("");
      setGender("");
      setAppointmentDate("");
      setDepartment("");
      setDoctorFirstName("");
      setDoctorLastName("");
      setHasVisited(false);
      setAddress("");
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  return (
    <>
      <div className="container form-component appointment-form">
        <h2 style={{ color: "#1c1a1a" }}>Appointment</h2>
        <form onSubmit={handleAppointment}>
          <div>
            <input
              type="text"
              placeholder="First Name"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
            <input
              type="text"
              placeholder="Last Name"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
          </div>
          <div>
            <input
              type="text"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="number"
              placeholder="Mobile Number"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </div>
          <div>
            <input
              type="number"
              placeholder="NIC"
              value={nic}
              onChange={(e) => setNic(e.target.value)}
            />
            <input
              type="date"
              placeholder="Date of Birth"
              value={dob}
              onChange={(e) => setDob(e.target.value)}
            />
          </div>
          <div>
            <select value={gender} onChange={(e) => setGender(e.target.value)}>
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
            <input
              type="date"
              placeholder="Appointment Date"
              value={appointmentDate}
              onChange={(e) => setAppointmentDate(e.target.value)}
            />
          </div>
          <div>
            <select
              value={department}
              onChange={(e) => {
                setDepartment(e.target.value);
                setDoctorFirstName("");
                setDoctorLastName("");
              }}
            >
              {departmentsArray.map((depart, index) => (
                <option value={depart} key={index}>
                  {depart}
                </option>
              ))}
            </select>
            <select
              value={`${doctorFirstName} ${doctorLastName}`}
              onChange={(e) => {
                const [firstName, lastName] = e.target.value.split(" ");
                setDoctorFirstName(firstName);
                setDoctorLastName(lastName);
              }}
              disabled={!department || department === "Select Department"}
            >
              <option value="">Select Doctor</option>
              {department &&
                doctorsArray[department]?.map((doctor, index) => (
                  <option
                    value={`${doctor.firstName} ${doctor.lastName}`}
                    key={index}
                  >
                    {doctor.firstName} {doctor.lastName}
                  </option>
                ))}
            </select>
          </div>
          <textarea
            rows="10"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            placeholder="Address"
          />
          <div
            style={{
              gap: "10px",
              justifyContent: "flex-end",
              flexDirection: "row",
            }}
          >
            <p style={{ marginBottom: 0 }}>Have you visited before?</p>
            <input
              type="checkbox"
              checked={hasVisited}
              onChange={(e) => setHasVisited(e.target.checked)}
              style={{ flex: "none", width: "25px" }}
            />
          </div>
          <button style={{ margin: "0 auto" }}>GET APPOINTMENT</button>
        </form>
      </div>
    </>
  );
};

export default AppointmentForm;
