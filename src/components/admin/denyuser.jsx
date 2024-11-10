import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Navbar from '../Navbar'
import { useNavigate } from 'react-router-dom'
import { ToastContainer, toast, Zoom } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Denyuser() {
  const [user,setUser]=useState([])
  const token=sessionStorage.getItem('admin_token')
  const [deny,setDeny]=useState(0)
  const navigate=useNavigate()

  async function denyhandle(id) {
    try{
        const response=await axios.put(`http://127.0.0.1:8000/api/v1/auth/deactivateuser/${id}`,{},{
          headers:{
            'Content-Type':'application/json',
            'Authorization':`Token ${token}`
        }
        })
        if (response.status===200){
          console.log("User Deactivated")
          toast.warning("User Deactivated")
        //   toast.success("User Allowed")
          // navigate('/admin')
          // setAloow(response.data.data)
          // setUser("")
        }
      }catch(error){
          console.log(error)
        console.log("error")
      }
      setDeny(id)
    
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
  },[deny])

  return (
    <>
    <div></div><br/>
    <div></div><br/>
    <Navbar/>
    <ToastContainer theme="colored" transition={Zoom}/>
    <div className='container'>
    { user
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
             {/* {item.is_active===true} */}
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
                     onClick={() => {
                      //  toast.success("Added to Cart");
                      navigate('/allowuser')
                     }}
                   >
                     Allow User
                   </button>:""}
                   
                 </div>
                 <div>
                  {item.is_active===true?<button type='sumbit' className='btn2'
                     onClick={(e) => {
                      //  toast.success("Added to Cart");
                        e.preventDefault();
                        denyhandle(item.id);
                     }}
                   >
                     Deny User
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

export default Denyuser