import React from 'react'
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { removeUserForFeed } from '../utils/feedSlice';

const UserCard = ({user}) => {
  const dispatch=useDispatch();

  const handleSendRequest = async (status, touserId) => {
        try {
            const res = await axios.post(`http://localhost:3000/request/send/${status}/${touserId}`, {}, { withCredentials: true });
            //console.log("check" ,res.status);
            if(res.status===200){
                 dispatch(removeUserForFeed(touserId));
                // getFeed();
            }
            
        } catch (err) {
            console.error(err.message);
        }
    };

   const { _id, firstName, lastName, age, photoUrl, gender, about, skills } = user;
  return (
     <div className="flex justify-center">
            <div className="card bg-base-300 w-full md:w-96 shadow-sm">
                <figure>
                    <img
                        className="object-cover"
                        src={photoUrl}
                        alt="profile" />
                </figure>
                <div className="card-body">
                    <h2 className="card-title">{firstName} {lastName}</h2>
                    <p>{age}, {gender}</p>
                    <p>{about}</p>
                    <div className="card-actions justify-center">
                        <button className="btn btn-primary"
                            onClick={() => handleSendRequest("ignored", _id)}>Ignore</button>
                        <button className="btn btn-secondary "
                            onClick={() => handleSendRequest("interested", _id)}>Intrested</button>
                    </div>
                </div>
            </div>
        </div>
      
    
  )
}

export default UserCard
