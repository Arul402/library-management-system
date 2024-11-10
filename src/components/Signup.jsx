// import axios from 'axios'
// import React, { useState } from 'react'
// import { useNavigate } from 'react-router-dom'
// import { ToastContainer, toast, Zoom } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import './Css/LoginandSignup.css'

// function Signup() {
//     const [username,setUsername]=useState()
//     const [email,setEmail]=useState()
//     const [first_name,setFirstname]=useState()
//     const [last_name,setLastname]=useState()
//     const navigate=useNavigate()
//     const is_activate=false

//     async function handlesignup() {
//         const data={
//             username:username,
//             first_name:first_name,
//             last_name:last_name,
//             email:email,
//             is_active:is_activate
//         }
//         if(!((username==="") && (first_name==="") && (last_name==="") && (email===""))){
//         try{
//             const response=await axios.post('http://127.0.0.1:8000/api/v1/auth/create/',data,{
//                 headers:{
//                     'Content-Type':'application/json'
//                 }
//             })
//             if (response.status===200){
//                 sessionStorage.setItem('username',data.first_name)
//                 navigate('/')
//                 console.log("User Created")
//             }else{
//                 sessionStorage.setItem('username',"")
//             }
//         }
//         catch(error){
//             console.log("error")
//             console.log(error)
//             toast.error("Error")
            
//         }
//     }else{
//         toast.error("Enter the Fields")
//         console.log("Enter the fields")

//     }
        
//     }

//     function login(){
//         navigate('/')
//     }


//   return (<>
//     <div className="body">
//     <div className="form">
//         <ToastContainer theme="colored" transition={Zoom}/>
//             <h2>Sign UP</h2>
//             <div className="input">
//             <div className="inputBox">
//                     <label htmlFor="">Username</label>
//                     <input type="text" value={username} onChange={(e)=>{setUsername(e.target.value)}}/>
//                 </div>
//                 <div className="inputBox">
//                     <label htmlFor="">Email</label>
//                     <input type="text" value={email} onChange={(e)=>{setEmail(e.target.value)}}/>
//                 </div>
//                 <div className="inputBox">
//                     <label htmlFor="">First Name</label>
//                     <input type="text" value={first_name} onChange={(e)=>{setFirstname(e.target.value)}}/>
//                 </div>
//                 <div className="inputBox">
//                     <label htmlFor="">Last Name</label>
//                     <input type="text" value={last_name} onChange={(e)=>{setLastname(e.target.value)}}/>
//                 </div>
//                 <div className="inputBox">
//                     <input type="submit" name="" value="Sign Up" onClick={(e)=>{e.preventDefault();handlesignup()}} /> 
//                 </div>
//             </div>
//             {/* <p className="forgot">Forgot Password? <a href="#">Click Here</a></p> */}
//             <div className="social">
//                 <button type='sumbit' onClick={(e)=>{e.preventDefault();login()}}><p>Have An Account?</p></button>
//                 {/* <button><i className="fa fa-twitter" aria-hidden="true"></i><p>Signin with Twitter</p></button> */}
//             </div>
//         </div>  
//         </div>     
//         </>   
//   )
// }

// export default Signup


import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast, Zoom } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './Css/LoginandSignup.css';
import Loading from './Loading';

function Signup() {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [first_name, setFirstname] = useState("");
    const [last_name, setLastname] = useState("");
    const [phone_number, setPhoneNumber] = useState("");
    const [place, setPlace] = useState("");
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const is_activate = false;

    async function handleSignup() {
        const data = {
            username: email,  // Username is the email
            first_name: first_name,
            last_name: last_name,
            email: email,
            phone_number: phone_number,
            place: place,
            is_active: is_activate
        };

        // Check if any field is empty
        if (!username || !first_name || !last_name || !email || !phone_number || !place) {
            toast.error("All fields must be filled.");
            return;
        }
        setLoading(true);

        try {
            const response = await axios.post('http://127.0.0.1:8000/api/v1/auth/create/', data, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            if (response.status === 200) {
                
                sessionStorage.setItem('username', data.first_name);
                navigate('/');

                toast.success("User created successfully.");
            }
            else {
                toast.error("User creation failed. Try again.");
            }
        } catch (error) {
            setLoading(false);
            if (error.response.status === 500) {
                toast.error(error.response.data.error || "User with this email already exists.");
            } else {
                toast.error("Error occurred. Please try again.");
            }
            console.log(error);
        }finally {
            // Ensure loading state is set back to false after API call
            setLoading(false);
        }
    }

    function login() {
        navigate('/');
    }

    return (
        <>
        <ToastContainer theme="colored" transition={Zoom} />
         {loading ?  (
                    <Loading/>
                ):
            <div className="body">
           
                <div className="form">
                    
                    <h2>Sign UP</h2>
                    <div className="input">
                        <div className="inputBox">
                            <label htmlFor="">Username (Email)</label>
                            <input type="text" value={email} onChange={(e) => { setEmail(e.target.value); setUsername(e.target.value); }} />
                        </div>
                        <div className="inputBox">
                            <label htmlFor="">First Name</label>
                            <input type="text" value={first_name} onChange={(e) => { setFirstname(e.target.value); }} />
                        </div>
                        <div className="inputBox">
                            <label htmlFor="">Last Name</label>
                            <input type="text" value={last_name} onChange={(e) => { setLastname(e.target.value); }} />
                        </div>
                        <div className="inputBox">
                            <label htmlFor="">Phone Number</label>
                            <input type="text" value={phone_number} onChange={(e) => { setPhoneNumber(e.target.value); }} />
                        </div>
                        <div className="inputBox">
                            <label htmlFor="">Place</label>
                            <input type="text" value={place} onChange={(e) => { setPlace(e.target.value); }} />
                        </div>
                        <div className="inputBox">
                            <input type="submit" value="Sign Up" onClick={(e) => { e.preventDefault(); handleSignup(); }} />
                        </div>
                    </div>
                    <div className="social">
                        <button type='submit' onClick={(e) => { e.preventDefault(); login(); }}><p >Have An Account?</p></button>
                    </div>
                </div>
                
            </div>
}
        </>
    );
}

export default Signup;
