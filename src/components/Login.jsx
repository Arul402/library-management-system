// import React, { useState } from 'react'
// import { useNavigate } from 'react-router-dom'
// import axios from 'axios'
// import { ToastContainer, toast, Zoom } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import './Css/LoginandSignup.css'

// function Login() {
//     const [username,setUsername] =useState("")
//     const [password,setPassword] =useState("")
//     const navigate=useNavigate()

//     async function handleSumbit() {
//       const  data={
//             username:username,
//             password:password
//         }
//         if(username !== "" && password !== ""){
//         try{
//             const response= await axios.post('http://127.0.0.1:8000/api/v1/auth/login/',data,{
//                 headers:{
//                     'Content-Type':'application/json'
//                 }
//             })
            
                
            
//             if (response.status === 200 ) {
//                 // Handle login for admin
//                 if (response.data.admin===true) {
//                     localStorage.setItem('admin_token', response.data.token);
//                     localStorage.setItem('user_type','admin')
//                     // localStorage.setItem('username', response.data.token);
//                     navigate('/admin'); // Redirect to admin page
//                 } else {
//                     // Handle login for regular users
//                     localStorage.setItem('user_token', response.data.token);
//                     localStorage.setItem('user_type','user')
//                     navigate('/passchange');
//                     // localStorage.setItem('token', response.data.token);
//                     // localStorage.setItem('username', first);
//                      // Redirect to user page
//                 }
//                 // if(userresponse.status===200){
//                 //     localStorage.setItem('token', userresponse.data.token);
//                 //     navigate('/passchange');

//                 // }
//             } else {
//                 toast.error("Login failed. Please try again.");
//                 console.log("Error in login response.");
//             }

//         }catch(error){
//                 // console.log(error)
//             toast.warning("Admin Need to Approve !!!")
//             console.log("Authorization failed ")
//         }
//     }else{
//         toast.error("Enter the Email or Password")
//         console.log("Enter the fields")
//     }
        
//     }
//     function account(){
//         navigate('/signup')
//     }
//   return (
//     <div className="body">
//         <div className='body1'>
//     <div className="form">
//         <ToastContainer theme="colored" transition={Zoom}/>
//             <h2>Login</h2>
//             <div className="input">
//                 <div className="inputBox">
//                     <label htmlFor="">Email</label>
//                     <input type="text" onChange={(e)=>{setUsername(e.target.value)}}/>
//                 </div>
//                 <div className="inputBox">
//                     <label htmlFor="">Password</label>
//                     <input type="password" onChange={(e)=>{setPassword(e.target.value)}}/>
//                 </div>
//                 <div className="inputBox">
//                     <input type="submit" name="" value="Login" onClick={(e)=>{e.preventDefault();handleSumbit()}}/> 
//                 </div>
//             </div>
//             {/* <p className="forgot">Forgot Password? <a href="#">Click Here</a></p> */}
//             <div className="social">
//                 <button type='sumbit' className='sumbit' onClick={(e)=>{e.preventDefault();account()}}><p>Don't have an Account?</p></button>
//                 {/* <button><i className="fa fa-twitter" aria-hidden="true"></i><p>Signin with Twitter</p></button> */}
//             </div>
//         </div>  
//         </div>    
//         </div>
//   )
// }

// export default Login





import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ToastContainer, toast, Zoom } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './Css/LoginandSignup.css';
import Loading from './Loading';

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [lastUsername, setLastUsername] = useState("");  // To track if the username is repeated
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  // async function handleSubmit() {
  //   const data = {
  //     username: username,
  //     password: password
  //   };

  //   // Validate if the fields are filled
  //   if (username === "" || password === "") {
  //     toast.error("Please fill in both email and password fields.");
  //     return;
  //   }

  //   // Check if the user is attempting to log in with the same credentials
  //   // if (username === lastUsername) {
  //   //   toast.error("You are trying to log in with the same username. Please change your email.");
  //   //   return;
  //   // }
  //   setLoading(true);

  //   try {
  //     const response = await axios.post('http://127.0.0.1:8000/api/v1/auth/login/', data, {
  //       headers: {
  //         'Content-Type': 'application/json'
  //       }
  //     });

  //     if (response.status === 200) {
  //       // Handle login for admin
  //       if (response.data.admin === true) {
  //         localStorage.setItem('admin_token', response.data.token);
  //         localStorage.setItem('user_type', 'admin');
  //         navigate('/admin'); // Redirect to admin page
  //         toast.success("Logged in as Admin!");
  //       } else {
  //         // Handle login for regular users
  //         localStorage.setItem('user_token', response.data.token);
  //         localStorage.setItem('user_type', 'user');
  //         localStorage.setItem('cartCount',"");
  //       localStorage.setItem('cart',0);
  //       localStorage.setItem('email',username);
  //         navigate('/passchange');
  //         toast.success("Logged in successfully!");
  //       }
  //       setLastUsername(username);  // Save the username to prevent repeat attempts

  //     } else {
  //       toast.error("Login failed. Please try again.");
  //     }

  //   } catch (error) {
  //     if (error.response && error.response.status === 401) {
  //       toast.warning("Authorization failed. Admin approval may be required.");
        
  //     } else {
  //       toast.error("Invalid credentials. Please try again.");
  //       // toast.warning("Authorization failed. Admin approval may be required.");
  //     }
  //   }finally {
  //       // Ensure loading state is set back to false after API call
  //       setLoading(false);
  //   }
  // }

  async function handleSubmit() {
    const data = {
      username: username,
      password: password
    };
  
    // Validate if the fields are filled
    if (username === "" || password === "") {
      toast.error("Please fill in both email and password fields.");
      return;
    }
  
    setLoading(true);
  
    try {
      const response = await axios.post('http://127.0.0.1:8000/api/v1/auth/login/', data, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
  
      if (response.status === 200) {
        // Handle login for admin
        if (response.data.admin === true) {
          sessionStorage.setItem('admin_token', response.data.token); // Using sessionStorage
          sessionStorage.setItem('user_type', 'admin');               // Using sessionStorage
          navigate('/admin'); // Redirect to admin page
          toast.success("Logged in as Admin!");
        } else {
          // Handle login for regular users
          sessionStorage.setItem('user_token', response.data.token);  // Using sessionStorage
          sessionStorage.setItem('user_type', 'user');                // Using sessionStorage
          sessionStorage.setItem('cartCount', "");
          sessionStorage.setItem('cart', 0);
          sessionStorage.setItem('email', username);
          navigate('/passchange');
          toast.success("Logged in successfully!");
        }
        setLastUsername(username);  // Save the username to prevent repeat attempts
  
      } else {
        toast.error("Login failed. Please try again.");
      }
  
    } catch (error) {
      if (error.response && error.response.status === 401) {
        toast.warning("Authorization failed. Admin approval may be required.");
      } else {
        toast.error("Invalid credentials. Please try again.");
      }
    } finally {
      // Ensure loading state is set back to false after API call
      setLoading(false);
    }
  }
  

  function account() {
    navigate('/signup');
  }

  return (
    <>
    <ToastContainer theme="colored" transition={Zoom} />
    {loading ?  (
                    <Loading/>
                ):
    <div className="body">
      <div className='body1'>
        <div className="form">
          
          <h2>Login</h2>
          <div className="input">
            <div className="inputBox">
              <label htmlFor="">Email</label>
              <input
                type="text"
                value={username}
                onChange={(e) => { setUsername(e.target.value) }}
              />
            </div>
            <div className="inputBox">
              <label htmlFor="">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => { setPassword(e.target.value) }}
              />
            </div>
            <div className="inputBox">
              <input
                type="submit"
                name=""
                value="Login"
                onClick={(e) => { e.preventDefault(); handleSubmit() }}
              />
            </div>
          </div>
          <div className="social">
            <button type='submit' className='submit' onClick={(e) => { e.preventDefault(); account() }}>
              <p>Don't have an Account?</p>
            </button>
          </div>
        </div>
      </div>
    </div>
}
    </>
  );
}

export default Login;
