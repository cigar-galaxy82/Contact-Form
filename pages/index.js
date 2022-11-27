import React from "react";
import styles from "../styles/Home.module.css";
import { useState} from "react";
import axios from "axios";


export default function Home() {

  // const
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [first, setFirst] = useState('')
  const [last, setLast] = useState('')
  const [message, setMessage] = useState('')


  async function sendEmail () {
      console.log(email, last, first, message, phone)
      await axios.post("/api/email", {
        email,
        first,
        last,
        phone,
        message
    }).then((response) => {
      alert("Email Send")
  })
  }

  return (
    <div className="container">
      <h1>Get in touch</h1>
      <div className="email block">
        <label>Email</label>
        <input type="email" id="email" name="email" onChange={(e) => setEmail(e.target.value)} required/>
      </div>
      <div className="block phone">
        <label>Phone</label>
        <input type="text" id="phone" name="phone" onChange={(e) => setPhone(e.target.value)}  required/>
      </div>
      <div className="name block">
        <div>
          <label>First</label>
          <input type="text" id="first" name="first" onChange={(e) => setFirst(e.target.value)} required/>
        </div>
        
        <div>
          <label>Last</label>
          <input type="text" id="last" name="last" onChange={(e) => setLast(e.target.value)} required/>
        </div>
      </div>
      <div className="message block">
        <label>Message</label>
        <textarea rows="6" id="message" name="message" onChange={(e) => setMessage(e.target.value)}></textarea>
      </div>
      <div className="button block">
      <button id="submit" onClick={sendEmail}>Submit</button>
      </div>
    </div>
  );
}
