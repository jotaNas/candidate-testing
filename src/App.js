import React, { useState, useEffect } from "react";
import "./App.css";

const fetchUserIds = async () => {
  return ["john.smith", "sara.lee", "jack.ma"];
};

const App = () => {
  const [users, setUsers] = useState([]);
  const [status, setStatus] = useState([]);
  const [usersReceivedEmail, setUsersReceivedEmail] = useState([]);

  useEffect(() => {
    const fn = async () => {
      const usersData = await fetchUserIds();
      setUsers(usersData);
    };
    fn();
  }, []);

  useEffect(() => {
    const fn = async () => {
      if (users.length > 0) {
        for (const user of users) {
          const statusData = await checkStatus(user);
          setStatus([...status, statusData]);
        }
      }
    };

    fn();
  }, [users]);

  useEffect(() => {
    const fn = async () => {
      if (status.length > 0) {
        for (const user of users) {
          const received = await sendEmail();
          if (received) {
            setUsersReceivedEmail([...usersReceivedEmail, user]);
          }
        }
      }
    };

    fn();
  }, [status]);

  const checkStatus = async (userId) => {
    return Math.random() > 0.8
      ? { status: "online", id: userId }
      : { status: "offline", id: userId };
  };

  const sendEmail = async (userId) => {
    // return if it was sucessfull or not
    return Math.random() > 0.1 ? true : false;
  };

  /*
    Question 1: 
    Find all online users and send them emails. Render the users for which the emails were successfully sent

    // Step 1: Load users
    Step 2: Check users online
    Step 3: Send email for whom are online
    Step 4: Render those which the email was successfully sent

  */

  return (
    <div className="App">
      <div className="App-header">
        <div>
          All online users that introductions were sucessfully sent
          <ul>
            {usersReceivedEmail.map((user) => (
              <li>{user}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default App;