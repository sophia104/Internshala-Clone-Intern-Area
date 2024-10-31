import './App.css';
import Footer from './Componets/Footerr/Footer';
import Home from './Componets/Home/Home';
import Navbar from './Componets/Navbar/Navbar';
import { Routes,Route } from 'react-router-dom';
import Register from './Componets/auth/Register';
import Intern from "./Componets/Internships/Intern"
import JobAvl from "./Componets/Job/JobAvl";
import JobDetail from './Componets/Job/JobDetail';
import InternDeatil from "./Componets/Internships/InternDeatil"
import { useDispatch, useSelector } from 'react-redux';
import { login,logout,selectUser } from "./Feature/Userslice"
import { useEffect } from 'react';
import { auth } from './firebase/firebase';
import Profile from './profile/Profile';
import AdminLogin from './Admin/AdminLogin';
import Adminpanel from './Admin/Adminpanel';
import ViewAllApplication from "./Admin/ViewAllApplication"
import Postinternships from './Admin/Postinternships';
import DeatilApplication from './Applications/DeatilApplication';
import UserApplicatiom from './profile/UserApplicatiom';
import UserapplicationDetail from "./Applications/DeatilApplicationUser";
// import  LoginButton  from "./Components/auth/login"
// import  LogoutButton  from "./Components/auth/logout"
// import Avatar from 'react-avatar';
import ChatBot from 'react-simple-chatbot'
import Post from './Post/Post';
import ForgotPassword from './Componets/ForgotPassword/ForgotPassword';
import Notification from './Componets/Notification/Notification';
import VideoUpload from './Componets/VideoUpload/VideoUpload';
import PaymentForm from './Componets/PaymentForm/PaymentForm';
import {Elements} from '@stripe/react-stripe-js';
import {loadStripe} from '@stripe/stripe-js';
import Login from './Componets/Login/Login'
import { useState } from "react";
import ResumeForm from './Componets/ResumeForm/ResumeForm';

function App() {
  // const [count, setCount] = useState(0)
  const stripePromise = loadStripe('your-publishable-key');
  const steps = [
    {
      id:'Greet',
      message: "Hello Intern!",

      id:'Name',
      message: "I am Siri to help"
    }
  ]

  const user=useSelector(selectUser);
  const dispatch=useDispatch();
  useEffect(() => {
    auth.onAuthStateChanged((authUser)=>{
      if(authUser){
        dispatch(login({
  
          uid:authUser.uid,
          photo:authUser.photoURL,
          name:authUser.displayName,
          email:authUser.email,
          phoneNumber:authUser.phoneNumber
        }))
      }
        else{
          dispatch(logout())
        }
    })
    },[dispatch] );
  return (
    <div className="App">
<Navbar/>
<ResumeForm/>
<ChatBot steps={steps}/>
<Login/>
{/* <Avatar skypeId="sitebase" size="200" />
<Avatar color={Avatar.getRandomColor('sitebase', ['red', 'green', 'blue'])} name="Aditi Arya" title="First Avator"/> */}
{/* <button className="btn3"><LoginButton/> </button>
// <button className="btn4"> <LogoutButton/> </button> */}
{/* <div className='hero'>
  <div className='card'>
    <h1>Elon Musk</h1>
    <p>@elonmusk</p>
    <img src='C:\Users\LENOVO\Downloads\myphotoamity.jpeg' alt='My Photo'/>
  </div>
</div> */}
<Elements stripe={stripePromise}>
    <PaymentForm />
  </Elements>

<Routes>
<Route path='/notification' element={<Notification/>}/>
<Route path='/videoupload' element={<VideoUpload/>}/>
<Route path='/' element={<Home/>}/>
<Route path="/forgot-password" element={<ForgotPassword/>} />
<Route path="/post" element={<Post/>} />
<Route path='/register' element={<Register/>}/>
<Route path='/internship' element={<Intern/>}/>
<Route path='/Jobs' element={<JobAvl/>}/>
<Route path='/profile' element={<Profile/>}/>
<Route path='/detailjob' element={<JobDetail/>}/>
<Route path='/detailInternship' element={<InternDeatil/>}/>
<Route path='/detailApplication' element={<DeatilApplication/>}/>
<Route path='/adminLogin' element={<AdminLogin/>}/>
<Route path='/adminepanel' element={<Adminpanel/>}/>
<Route path='/postInternship' element={<Postinternships/>}/>
<Route path='/applications' element={<ViewAllApplication/>}/>
<Route path='/UserapplicationDetail' element={< UserapplicationDetail/>}/>
<Route path='/userapplication' element={<UserApplicatiom/>}/>
</Routes>
<Footer/>
    </div>
  );
}

export default App;