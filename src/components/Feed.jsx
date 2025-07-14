import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { addFeed } from '../utils/feedSlice';
import UserCard from './UserCard';

const Feed = () => {
  const feed=useSelector((store)=>store.feed);
  const dispatch=useDispatch();
  const getFeed= async()=>{
    //if(feed) return;
    if (feed && feed.length > 0) return;
    try{
       const page = 1;
      const limit = 1;
    const result= await axios.get(`http://localhost:3000/feed?page=${page}&limit=${limit}`,{withCredentials:true});
   // console.log( "result",result);
    dispatch(addFeed(result.data));
   
  }catch(error){
    console.log(error.message);
  }
}

useEffect(()=>{
  getFeed();

},[feed])

 if (!feed || feed.length === 0) {
        return <h1 className="font-bold text-3xl text-center mt-6">No new users founds!</h1>;
    }


  return (
   feed && (<div>
            {feed?.map((user) => (<UserCard key={user._id} user={user}  />))}
        </div>)
  )
}

export default Feed;
