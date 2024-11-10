import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Navbar from '../Navbar'; // Import your Navbar component

const RentalHistory = () => {
  const [rentals, setRentals] = useState([]);
  const token = sessionStorage.getItem('admin_token');

  useEffect(() => {
    const fetchRentalHistory = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/api/v1/app/rental-history/', {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Token ${token}`,
          },
        });
        if (response.status === 200) {
          setRentals(response.data);
        }
      } catch (error) {
        console.error('Error fetching rental history:', error);
      }
    };

    fetchRentalHistory();
  }, [token]);

  return (
    <>
    


    <div></div><br/>
    <div></div><br/>
    <Navbar/>
    <div className='container'>
    { rentals.map((item)=>(
    <div
             
             className="product-card"
             key={item.id}
           >
             
             <div className="product-details">
                <h3>Username : {item.username}</h3>
             <span className="product-catagory">
              <h3>Book Name : {item.book_name}</h3>
                </span>
               <span className="product-catagory">
               Due Date : {new Date(item.due_date).toLocaleDateString()}
                </span>
               <h4>
                 {/* <a > */}
                 Rental Date : {new Date(item.rental_date).toLocaleDateString()}
                  {/* </a> */}
               </h4>
               <h4>
                Fine : ₹{item.fine}
                </h4>
               <div className="product-bottom-details">
                 <div className="product-price">
                  {/* {item.price} */}
                  </div>
                 {/* <div>
                  {item.is_active===false?<button type='sumbit' className='sumbit'
                     onClick={() => {
                      //  toast.success("Added to Cart");
                      navigate('/allowuser')
                     }}
                   >
                     Allow User
                   </button>:""}
                   
                 </div> */}
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
  );
};

export default RentalHistory;
