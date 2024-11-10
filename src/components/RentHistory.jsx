// import axios from 'axios';
// import React, { useEffect, useState } from 'react'
// import RentNavbar from './RentNavbar';

// function RentHistory() {

//     const token = sessionStorage.getItem("user_token");
//     const [history,setHistory]=useState([])
//     const [cont,setCont]=useState()

//     useEffect(() => {
//         async function fetchData() {
//           try {
//             const response = await axios.get(
//               "http://127.0.0.1:8000/api/v1/app/rentals/",
//               {
//                 headers: {
//                   "Content-Type": "application/json",
//                   'Authorization':`Token ${token}`
//                 },
//               }
//             );
//             // console.log(response)
//             if (response.status === 200) {
//               setHistory(response.data);
//               console.log(response.data);
//               console.log("first")
//             }
//           } catch (error) {
//             console.error(error);
//           }
//           setCont("");
//         }
//         fetchData();
//       }, [cont]);

//   return (
//     <>
//     <div></div>
//       <br />
//       <div></div>
//       <br />
//       <RentNavbar />
    
//     <div className='container'>
//     {/* <div>RentHistory</div> */}
//     {history.map((item) => (
//               <div key={item.id} className="product-card">
//                 {/* <div className="product-tumb">
//                   <img src={item.book.image} alt={item.book.book_name} />
//                 </div> */}
//                 <div className="product-details">
//                   <span className="product-catagory"><h3>Book Name: {item.book_name}</h3></span>
//                   <h4>Book ID: {item.id}</h4>
//                   <p>Created Date: {new Date(item.rental_date).toLocaleDateString()}</p>
//                   <p>Rental Date: {new Date(item.due_date).toLocaleDateString()}</p>
//                   <div className="product-bottom-details">
//                     <div className="product-price">
//                     {history.map((rental) => {
//             const today = new Date();
//             const dueDate = new Date(rental.due_date);
//             const isOverdue = dueDate < today;
            
//             return (
//               <li key={rental.id}>
//                 <p>Book: {rental.book}</p>
//                 <p>Due Date: {rental.due_date}</p>
//                 {isOverdue && (
//                   <p style={{ color: 'red' }}>
//                     <strong>Overdue! Please return this book.</strong>
//                   </p>
//                 )}
//               </li>
//             );
//           })}
//                     </div>
//                     {/* <div>
//                       <button
//                         type="submit"
//                         className="btn2"
//                         // onClick={() => handleRemoveFromCart(item.book.id)}
//                       >
//                         Remove from Cart
//                       </button>
//                     </div> */}
//                   </div>
//                 </div>
//               </div>
//             ))}
//             </div>
//     </>
    

//   )
// }

// export default RentHistory


// import axios from 'axios';
// import React, { useEffect, useState } from 'react';
// import RentNavbar from './RentNavbar';

// function RentHistory() {
//     const token = sessionStorage.getItem("user_token");
//     const [history, setHistory] = useState([]);
//     const [cont, setCont] = useState();

//     useEffect(() => {
//         async function fetchData() {
//             try {
//                 const response = await axios.get(
//                     "http://127.0.0.1:8000/api/v1/app/rentals/",
//                     {
//                         headers: {
//                             "Content-Type": "application/json",
//                             'Authorization': `Token ${token}`
//                         },
//                     }
//                 );

//                 if (response.status === 200) {
//                     setHistory(response.data);
//                     console.log(response.data);
//                 }
//             } catch (error) {
//                 console.error(error);
//             }
//             setCont("");
//         }
//         fetchData();
//     }, [cont]);

//     const handlePayFine = async (rentalId) => {
//         try {
//             const response = await axios.post(
//                 `http://127.0.0.1:8000/api/v1/app/pay_fine/${rentalId}`,
//                 {},
//                 {
//                     headers: {
//                         'Content-Type': 'application/json',
//                         'Authorization': `Token ${token}`
//                     }
//                 }
//             );
    
//             if (response.status === 200) {
//                 alert(response.data.message); // Display success message
    
//                 // Check if the response contains updated rental data
//                 const updatedRental = response.data.updated_rental;
    
//                 // Update the history state to reflect that the fine has been paid
//                 setHistory((prevHistory) =>
//                     prevHistory.map((item) =>
//                         item.id === updatedRental.id ? { ...updatedRental } : item // Use updated rental data
//                     )
//                 );
//             }
//         } catch (error) {
//             console.error("Error paying fine:", error);
//             alert("Failed to pay the fine. Please try again.");
//         }
//     };
    

//     return (
//         <>
//            <div></div>
//        <br />
//       <div></div>
//        <br />
//        <RentNavbar />
//             <div className='container'>
//                 {history.map((item) => {
//                     const today = new Date();
//                     const dueDate = new Date(item.due_date);
//                     const isOverdue = dueDate < today;

//                     return (
//                         <div key={item.id} className="product-card">
//                             <div className="product-details">
//                                 <span className="product-catagory"><h3>Book Name: {item.book_name}</h3></span>
//                                 <h4>Book ID: {item.id}</h4>
//                                 <p>Created Date: {new Date(item.rental_date).toLocaleDateString()}</p>
//                                 <p>Due Date: {new Date(item.due_date).toLocaleDateString()}</p>
//                                 <p>Fine : {item.fine}</p>
//                                 <p>Fine Paid: {item.fine_paid ? 'Yes' : 'No'}</p>
//                                 {isOverdue && !item.fine_paid && (
//                                     <button onClick={() => handlePayFine(item.id)} className="pay-fine-button">
//                                         Pay Fine
//                                     </button>
//                                 )}
//                                 {item.fine_paid && (
//                                     <p style={{ color: 'green' }}><strong>Fine paid</strong></p>
//                                 )}
//                                 <div className="product-bottom-details">
//                                     {isOverdue && !item.fine_paid && (
//                                         <p style={{ color: 'red' }}>
//                                             <strong>Overdue! Please pay the fine and return this book.</strong>
//                                         </p>
//                                     )}
//                                 </div>
//                             </div>
//                         </div>
//                     );
//                 })}

// {selectedRental && (
//                     // <PaymentForm rental={selectedRental} />
//                     <div className="body">
//         <div className='body1'>
//           <div className="form">
//             <h3>Total Amount: ₹{totalAmount}</h3>
//             <div className="input">
//               <h3>Enter Payment Details</h3>
//               <div className="inputBox">
//                 <label htmlFor="">Card Number:</label>
//                 <input
//                   type="text"
//                   name="card_number"
//                   value={cardDetails.card_number}
//                   onChange={handleCardChange}
//                   placeholder="1234 5678 9101 1121"
                  
//                 />
//               </div>
//               <div className="inputBox">
//                 <label htmlFor="">Expiry Date:</label>
//                 <input
//                   type="text"
//                   name="card_expiry"
//                   value={cardDetails.card_expiry}
//                   onChange={handleCardChange}
//                   placeholder="MM/YY"
                  
//                 />
//               </div>
//               <div className="inputBox">
//                 <label htmlFor="">CVC:</label>
//                 <input
//                   type="text"
//                   name="card_cvc"
//                   value={cardDetails.card_cvc}
//                   onChange={handleCardChange}
//                   placeholder="123"
                  
//                 />
//               </div>
//               <div className="inputBox">
//                 <input type="submit" name="" value="Checkout" onClick={handlePayFine} />
//               </div>
//               {/* <div className="inputBox">
//                 <input
//                   type="submit"
//                   name=""
//                   value="Go Back To Cart"
//                   onClick={(e) => {
//                     e.preventDefault();
//                     // setShowCheckout(false);
//                   }}
//                 />
//               </div> */}
//             </div>
//           </div>
//         </div>
//       </div>
//                 )}
//             </div>
//         </>
//     );
// }

// export default RentHistory;

import axios from 'axios';
import React, { useEffect, useState } from 'react';
import RentNavbar from './RentNavbar';

function RentHistory() {
    const token = sessionStorage.getItem("user_token");
    const [history, setHistory] = useState([]);
    const [selectedRental, setSelectedRental] = useState(null);
    const [cardDetails, setCardDetails] = useState({
        card_number: '',
        card_expiry: '',
        card_cvc: ''
    });
    const [totalAmount, setTotalAmount] = useState(0);
    const [payfine,setPayfine]=useState(false)
    
    useEffect(() => {
        async function fetchData() {
            try {
                const response = await axios.get(
                    "http://127.0.0.1:8000/api/v1/app/rentals/",
                    {
                        headers: {
                            "Content-Type": "application/json",
                            'Authorization': `Token ${token}`
                        },
                    }
                );

                if (response.status === 200) {
                    setHistory(response.data);
                }
            } catch (error) {
                console.error(error);
            }
        }
        fetchData();
    }, [token]);

    const handlePayFine = async (rentalId) => {
        setSelectedRental(rentalId);
        const rental = history.find(item => item.id === rentalId);
        setTotalAmount(rental.fine); // Set the total amount based on the rental fine
        setPayfine(true)
    };

    const handleCardChange = (e) => {
        const { name, value } = e.target;
        setCardDetails(prevDetails => ({ ...prevDetails, [name]: value }));
    };

    const handleCheckout = async () => {
        if (!selectedRental) return;
        // const cardDetail = {
        //     card_number: cardDetails.card_number, // Dummy card number
        //     card_expiry: cardDetails.card_expiry,            // Valid expiry date
        //     card_cvc: cardDetails.card_cvc,                  // Valid CVC
        // };

        try {
            const response = await axios.post(
                `http://127.0.0.1:8000/api/v1/app/pay_fine/${selectedRental}`,
                { cardDetails }, // Send the card details
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Token ${token}`
                    }
                }
            );
    
            if (response.status === 200) {
                alert(response.data.message); // Display success message
                // Update the history state to reflect that the fine has been paid
                const updatedRental = response.data.updated_rental;
                setHistory(prevHistory =>
                    prevHistory.map(item =>
                        item.id === updatedRental.id ? { ...updatedRental } : item
                    )
                );
                setSelectedRental(null); // Reset selected rental
                setCardDetails({ card_number: '', card_expiry: '', card_cvc: '' }); // Clear card details
                setPayfine(false)
            }
        } catch (error) {
            console.error("Error paying fine:", error);
            alert("Failed to pay the fine. Please try again.");
        }
    };

    return (
        <>
        <div></div>
        <br />
       <div></div>
        <br />
            <RentNavbar />
            {!payfine ? <div className='container'>
                {history.map((item) => {
                    const today = new Date();
                    const dueDate = new Date(item.due_date);
                    const isOverdue = dueDate < today;

                    return (
                        <div key={item.id} className="product-card">
                            <div className="product-details">
                                <span className="product-catagory"><h3>Book Name: {item.book_name}</h3></span>
                                <h4>Book ID: {item.id}</h4>
                                <p>Created Date: {new Date(item.rental_date).toLocaleDateString()}</p>
                                <p>Due Date: {new Date(item.due_date).toLocaleDateString()}</p>
                                <p>Fine : {item.fine}</p>
                                <p>Fine Paid: {item.fine_paid ? 'Yes' : 'No'}</p>
                                {isOverdue && !item.fine_paid && (
                                    <button onClick={() => handlePayFine(item.id)} className="btn2">
                                        Pay Fine
                                    </button>
                                )}
                                {item.fine_paid && (
                                    <p style={{ color: 'green' }}><strong>Fine paid</strong></p>
                                )}
                                {isOverdue && !item.fine_paid && (
                                    <p style={{ color: 'red' }}>
                                        <strong>Overdue! Please pay the fine and return this book.</strong>
                                    </p>
                                )}
                            </div>
                        </div>
                    );
                })}</div>:
            
                <div>
                {selectedRental && (
                    // <div className="payment-form">
                    //     <h3>Total Amount: ₹{totalAmount}</h3>
                    //     <div>
                    //         <h3>Enter Payment Details</h3>
                    //         <div>
                    //             <label>Card Number:</label>
                    //             <input
                    //                 type="text"
                    //                 name="card_number"
                    //                 value={cardDetails.card_number}
                    //                 onChange={handleCardChange}
                    //                 placeholder="1234 5678 9101 1121"
                    //             />
                    //         </div>
                    //         <div>
                    //             <label>Expiry Date:</label>
                    //             <input
                    //                 type="text"
                    //                 name="card_expiry"
                    //                 value={cardDetails.card_expiry}
                    //                 onChange={handleCardChange}
                    //                 placeholder="MM/YY"
                    //             />
                    //         </div>
                    //         <div>
                    //             <label>CVC:</label>
                    //             <input
                    //                 type="text"
                    //                 name="card_cvc"
                    //                 value={cardDetails.card_cvc}
                    //                 onChange={handleCardChange}
                    //                 placeholder="123"
                    //             />
                    //         </div>
                    //         <button onClick={handleCheckout}>Checkout</button>
                    //         <button onClick={()=>{setPayfine(false)}}>Cancel</button>
                    //     </div>
                    // </div>
                    <div className="body">
  <div className="body1">
    <div className="form">
      <h3>Total Amount: ₹{totalAmount}</h3>
      <h2>Enter Payment Details</h2>
      
      <div className="input">
        <div className="inputBox">
          <label htmlFor="card_number">Card Number</label>
          <input
            type="text"
            name="card_number"
            value={cardDetails.card_number}
            onChange={handleCardChange}
            placeholder="1234 5678 9101 1121"
          />
        </div>
        
        <div className="inputBox">
          <label htmlFor="card_expiry">Expiry Date</label>
          <input
            type="text"
            name="card_expiry"
            value={cardDetails.card_expiry}
            onChange={handleCardChange}
            placeholder="MM/YY"
          />
        </div>
        
        <div className="inputBox">
          <label htmlFor="card_cvc">CVC</label>
          <input
            type="text"
            name="card_cvc"
            value={cardDetails.card_cvc}
            onChange={handleCardChange}
            placeholder="123"
          />
        </div>
        
        <div className="inputBox">
          <input
            type="submit"
            name=""
            value="Checkout"
            onClick={handleCheckout}
          />
        </div>
      </div>

      <div className="social">
        <button type="submit" className="submit" onClick={() => setPayfine(false)}>
          <p>Cancel</p>
        </button>
      </div>
    </div>
  </div>
</div>

                )}
            </div>
}
        </>
    );
}

export default RentHistory;

