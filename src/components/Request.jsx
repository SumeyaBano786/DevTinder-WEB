import axios, { Axios } from 'axios'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addRequests, removeRequest } from '../utils/requestSlice';

const Request = () => {
    const dispatch=useDispatch();
    const requests=useSelector((store)=>store.requests);

 

    const reviewRequest = async (status, requestId) => {
  try {
    const result = await axios.post(
      `http://localhost:3000/request/review/${status}/${requestId}`,
      {},
      { withCredentials: true }
    );

    if (result.status === 200) {
      dispatch(removeRequest(requestId));
      console.log("Request", status, "successfully");
    }
  } catch (error) {
    console.log("Review request failed", error.response?.data || error.message);
  }
};


    const fetchUsers=async()=>{
        try{
            const result= await axios.get("http://localhost:3000/user/requests/received",{withCredentials:true});
            dispatch(addRequests(result.data.data));
         //  console.log(result);


        }catch(error){
            console.oog(error.message);

        }
    }

    useEffect(()=>{
        fetchUsers();

    },[])

        if (!requests || requests.length === 0) {
        return <h1 className="font-bold text-3xl text-center mt-6">No requests found</h1>;
    };
  return (
     <div>
            <h1 className="font-bold text-3xl text-center mt-6 mb-8">Pending Requests</h1>

            {requests.map((request, index) => {
                const { _id, firstName, lastName, age, gender, about, photoUrl } = request?.fromUserId;
                return (
                    <div key={_id} className="flex flex-col md:flex-row m-4 p-4 rounded-lg bg-base-300 w-full md:w-1/2 mx-auto justify-between">
                        <div className="flex">
                            <div>
                                <img
                                    alt="photo"
                                    className="w-20 h-20 rounded-full object-cover"
                                    src={photoUrl}
                                />
                            </div>
                            <div className="text-left mx-4">
                                <h2 className="font-bold text-xl">
                                    {firstName + " " + lastName}
                                </h2>
                                {age && gender && <p>{age + ", " + gender}</p>}
                                <p>{about}</p>
                            </div>
                        </div>
                        <div className="flex md:flex-row w-full md:w-56 justify-center items-center mt-4 md:mt-0 md:ml-20">
                            <button className="btn btn-primary mx-2 p-6"
                                onClick={() => reviewRequest("rejected", request._id)}>Reject</button>
                            <button className="btn btn-secondary mx-2 p-6"
                                onClick={() => reviewRequest("accepted", request._id)}>Accept</button>
                        </div>
                    </div>
                );
            })}
        </div>

  )
}

export default Request
