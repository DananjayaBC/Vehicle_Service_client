import React, { useState, useEffect, Fragment, useContext } from 'react'
import Navb from '../layout/Navbar'
import firebase from '../../firebase';
import { useAuth } from "../../contexts/AuthContext"
import 'firebase/firestore';


function SnapshotFirebaseAdvanced() {
  const { currentUser } = useAuth();
  const currentUserId = currentUser ? currentUser.uid : null;
  const [Request, setRequest] = useState([]);
  const [loading, setLoading] = useState(false);


  const ref = firebase.firestore().collection('userData').doc(currentUserId).collection('Request').orderBy('date', "desc");

  function getPayments() {
    setLoading(true);
    ref
      //.where('owner', '==', currentUserId)
      //.where('title', '==', 'School1') // does not need index
      //.where('score', '<=', 10)    // needs index
      //.orderBy('owner', 'asc')
      //.limit(3)
      .onSnapshot((querySnapshot) => {
        const items = [];
        querySnapshot.forEach((doc) => {
          items.push(doc.data(currentUserId));
        });
        setRequest(items);
        setLoading(false);
      });
  }

  useEffect(() => {
    getPayments();
    // eslint-disable-next-line
  }, []);


  return (
    <React.Fragment>
      <Navb />
      {Request.map((Requests) => (
        <div className="row justify-content-center">
          <div className="col-md-6 text-center  ">
            <div className="crd mb-4 shadow-sm">
              <div className="card-body bg-light" key={Requests.title}>
                <h5>{Requests.title}</h5>
                <p className="card-text" >
                  <strong><i className="fas fa-time"></i>Mobile Number - </strong>: {Requests.mNumber}
                  <br />
                  <strong><i className="fas fa-time"></i>Note - {Requests.note} </strong>
                  <br />
                  <strong><i className="fas fa-time"></i>Vehicle Type -  </strong> : {Requests.type}
                  <br />
                  <strong><i className="fas fa-play"></i> {Requests.date} </strong>
                </p>
              </div>
            </div>
          </div>
        </div>
      ))}
    </React.Fragment>
  )
}
export default SnapshotFirebaseAdvanced;