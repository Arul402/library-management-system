import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Navbar from '../Navbar'
import { useNavigate } from 'react-router-dom'
import { ToastContainer, toast, Zoom } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Allowuser() {
  const [user,setUser]=useState([])
  const token=sessionStorage.getItem('admin_token')
  const navigate=useNavigate()
  const [allow,setAloow]=useState(0)

  // async function allowuserHandle(id) {
  //     navigate(`/allowusers/${id}`)
    
  // }
  async function allowuserHandle(id) {
    try{
      const response=await axios.put(`http://127.0.0.1:8000/api/v1/auth/activateuser/${id}`,{},{
        headers:{
          'Content-Type':'application/json',
          'Authorization':`Token ${token}`
      }
      })
      if (response.status===200){
        console.log("User Allowed")
        toast.success("User Allowed")
        // navigate('/admin')
        // setAloow(response.data.data)
        // setUser("")
      }
    }catch(error){
        console.log(error)
      console.log("error")
    }
    setAloow(id)
  }
  
  useEffect(()=>{
    async function fetchData(){
      try{
        const response=await axios.get('http://127.0.0.1:8000/api/v1/app/viewuser/',{
          headers:{
            'Content-Type':'application/json',
            'Authorization':`Token ${token}`
          }
        })
        // console.log(response)
        if(response.status===200){
          setUser(response.data.data)
          console.log(response.data.data)
          // console.log(first)
        }
      }
      catch(error){
        console.error(error)
      }
    }
    fetchData();
  },[allow])

  return (
    <>
    <ToastContainer theme="colored" transition={Zoom}/>
    <div></div><br/>
    <div></div><br/>
    <div><Navbar/></div>
    
    {user.filter(item => item.is_active === true).length === 0 && (
          <h1 className='h1'>No verified users.</h1>
         )} 
    <div className='container'>
    { user.filter((item)=>item.is_active===false)
    .map((item)=>(
      
      <div
             
      className="product-card"
      key={item.id}
    >
             {/* <Link to={"/Productdetail"}> */}
             {/* <div className="badge">Hot</div> */}
             {/* <div className="product-tumb"> */}
               {/* <img src={item.image} alt="" height={100} width={200} />    */}
             {/* </div> */}
             {/* {item.is_active===false? */}
              
              <div className="product-details">
             <span className="product-catagory">
              <h3>First Name : {item.first_name}</h3>
                </span>
               <span className="product-catagory">
                UserName : {item.username}
                </span>
               <h4>
                 <a >
                  Email : {item.email}
                  </a>
               </h4>
               <p>
                Status : {item.is_active===true?"Verified User":"User Not Verified"}
                </p>
               <div className="product-bottom-details">
                 <div className="product-price">
                  {/* {item.price} */}
                  </div>
                 <div>
                  {item.is_active===false?<button type='sumbit' className='btn2'
                     onClick={(e) => {
                      //  toast.success("Added to Cart");
                      e.preventDefault();
                      allowuserHandle(item.id);
                     }}
                   >
                     Allow User
                   </button>:""}
                   
                 </div>
                 {/* <div className="product-links">
                   <a href="">
                     <i className="fa fa-heart"></i>
                   </a>
                   <a href="">
                     <i className="fa fa-shopping-cart"></i>
                   </a>
                 </div> */}
               </div>
             </div>
             
             {/* </Link> */}
           </div>
    ))
  }
  </div>
    </>
  )
}

export default Allowuser