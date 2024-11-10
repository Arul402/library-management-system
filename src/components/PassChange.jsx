// import axios from 'axios'
// import React, { useState } from 'react'
// import { useNavigate } from 'react-router-dom'
// import './Css/LoginandSignup.css'

// function PassChange() {
//     const [oldpass,setOldpass]=useState()
//     const [newpass,setNewpass]=useState()
//     const navigate=useNavigate()
//     const token=sessionStorage.getItem('user_token')
//     const username=sessionStorage.getItem('email')

//     async function handleChange() {
//         const data={
//             old_password:oldpass,
//             new_password:newpass,
//             username:username,
//         }
//         try{
//             const response=await axios.post('http://127.0.0.1:8000/api/v1/app/changepassword/',data,{
//                 headers:{
//                     'Content-Type':'application/json',
//                     'Authorization': `Token ${token}`

//                 }
//             })
//             if (response.status===200){
//                 console.log("Password Changed")
//                 navigate('/home')
//             }
//         }catch(error){
//             console.log(error)
//         }
        
//     }
//     function account(){
//         navigate('/home')
//     }

//   return (
//     <div className='body'>
//     <div className="form">
//         {/* <ToastContainer theme="colored" transition={Zoom}/> */}
//             <h2>Change Password</h2>
//             <div className="input">
//                 <div className="inputBox">
//                     <label htmlFor="">Old Password</label>
//                     <input type="password" value={oldpass} onChange={(e)=>{setOldpass(e.target.value)}}/>
//                 </div>
//                 <div className="inputBox">
//                     <label htmlFor="">New Password</label>
//                     <input type="password" value={newpass} onChange={(e)=>{setNewpass(e.target.value)}}/>
//                 </div>
//                 <div className="inputBox">
//                     <input type="submit" name="" value="Change Password" onClick={(e)=>{e.preventDefault();handleChange()}}/> 
//                 </div>
//             </div>
//             {/* <p className="forgot">Forgot Password? <a href="#">Click Here</a></p> */}
//             <div className="social">
//                 <button type='sumbit' onClick={(e)=>{e.preventDefault();account()}}><p>Change Later</p></button>
//                 {/* <button><i className="fa fa-twitter" aria-hidden="true"></i><p>Signin with Twitter</p></button> */}
//             </div>
//         </div>
//         </div>
//   )
// }

// export default PassChange






import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Css/LoginandSignup.css';
import { ToastContainer, toast, Zoom } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Loading from './Loading';


function PassChange() {
  const [oldpass, setOldpass] = useState('');
  const [newpass, setNewpass] = useState('');
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const token = sessionStorage.getItem('user_token');
  const username = sessionStorage.getItem('email');
  const [loading, setLoading] = useState(false);

  // Validate password
  const validatePassword = (password) => {
    const errors = {};
    
    if (!password) {
      errors.newpass = 'Password is required';
      toast.error('Password is required')
    } else {
      // Minimum length validation
      if (password.length < 5 || password.length > 10) {
        errors.newpass = 'Password must be between 5 and 10 characters';
        toast.error('Password must be between 5 and 10 characters')
      }
      
      // At least one number
      if (!/\d/.test(password)) {
        errors.newpass = 'Password must contain at least one number';
        toast.error('Password must contain at least one number')
      }
      
      // At least one special character
      if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
        errors.newpass = 'Password must contain at least one special character';
        toast.error('Password must contain at least one special character')
      }
    }
    
    return errors;
  };

  async function handleChange() {
    const data = {
      old_password: oldpass,
      new_password: newpass,
      username: username,
    };

    // Validate the new password
    const validationErrors = validatePassword(newpass);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    setLoading(true);

    try {
      const response = await axios.post('http://127.0.0.1:8000/api/v1/app/changepassword/', data, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Token ${token}`,
        },
      });
      if (response.status === 200) {
        console.log("Password Changed");
        navigate('/updateprofile');
      }
    } catch (error) {
      console.log(error);
    }finally {
        // Ensure loading state is set back to false after API call
        setLoading(false);
    }
  }

  function account() {
    navigate('/home');
  }

  return (
    <>
    <ToastContainer theme="colored" transition={Zoom} />
    {loading ?  (
                    <Loading/>
                ):
    <div className='body'>
        
      <div className="form">
        <h2>Change Password</h2>
        <div className="input">
          <div className="inputBox">
            <label htmlFor="">Old Password</label>
            <input
              type="password"
              value={oldpass}
              onChange={(e) => { setOldpass(e.target.value) }}
            />
          </div>
          <div className="inputBox">
            <label htmlFor="">New Password</label>
            <input
              type="password"
              value={newpass}
              onChange={(e) => { setNewpass(e.target.value); setErrors({}); }}
            />
            {errors.newpass && <p className="error">{errors.newpass}</p>}
          </div>
          <div className="inputBox">
            <input
              type="submit"
              value="Change Password"
              onClick={(e) => { e.preventDefault(); handleChange() }}
            />
          </div>
        </div>
        <div className="social">
          <button type='submit' onClick={(e) => { e.preventDefault(); account() }}>
            <p>Change Later</p>
          </button>
        </div>
      </div>
    </div>
    }
    </>
  );
}

export default PassChange;
