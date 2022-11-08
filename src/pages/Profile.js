import { child, get, ref } from 'firebase/database';
import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { InstagramContext } from '../App';
import { database } from '../database/firebaseConfig';

function Profile() {
    const {id} = useParams()
    const {user} = useContext(InstagramContext)
    const [iduser, setiduser] = useState()

    function getData() {
        const dbRef = ref(database);
        get(child(dbRef, `/users/${id}`)).then((snapshot) => {
          if (snapshot.exists()) {
            setiduser(snapshot.val())
            console.log(snapshot.val())
          } else {
            console.log("No data available");
          }
        }).catch((error) => {
          console.error(error);
        });
       }

    useEffect(() => {
      getData()
    }, [])
    

  return (
    <div className='flex items-center justify-center'>
        {iduser?.uid === user?.uid ? (
            <>
            <h1>My: {user?.displayName}</h1>
            </>
        ):(
            <>
            <h1>Other: {iduser?.username}</h1>
            </>
        )}
    </div>
  )
}

export default Profile