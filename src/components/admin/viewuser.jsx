import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Navbar from '../Navbar'
import { useNavigate } from 'react-router-dom'

function Viewuser() {
  const [user,setUser]=useState([])
  const token=sessionStorage.getItem('admin_token')
  const navigate=useNavigate()

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
  },[token])

  return (
    <>
    <div></div><br/>
    <div></div><br/>
    <Navbar/>
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

export default Viewuser