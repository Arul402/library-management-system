
// import React, { useState } from 'react';
// import axios from 'axios';
// import './Css/LoginandSignup.css'
// import { useNavigate } from 'react-router-dom';
// import { ToastContainer, toast, Zoom } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';


// const Transaction = ({ totalAmount, setCartItems, setTotalAmount,setShowCheckout,cartItems }) => {
//   const [cardDetails, setCardDetails] = useState({
//     card_number: '',
//     card_expiry: '',
//     card_cvc: '',
//   });
//   const [checkoutSuccess, setCheckoutSuccess] = useState(false);
//   const token = sessionStorage.getItem('user_token');
//   const storedCartCount = sessionStorage.getItem('cartCount');
//   const navigate=useNavigate();

//   // Handle card input changes
//   const handleCardChange = (e) => {
//     setCardDetails({
//       ...cardDetails,
//       [e.target.name]: e.target.value,
//     });
//   };

//   const submitPurchaseDetails = async () => {
//     try {
//       // Loop through cart items and send each purchase detail to the backend
//       for (let item of cartItems) {
//         const purchaseData = {
//           book_id: item.book.id,
//           quantity: item.quantity,
//           total_price: totalAmount,
//         };

//         const response = await axios.post(
//           'http://127.0.0.1:8000/api/v1/app/purchase/add/',
//           purchaseData,
//           {
//             headers: {
//               'Content-Type': 'application/json',
//               Authorization: `Token ${token}`,
//             },
//           }
//         );

//         if (response.status !== 201) {
//           throw new Error('Failed to record purchase details.');
//         }
//       }
//       console.log('Purchase details added successfully');
//     } catch (error) {
//       console.error('Error recording purchase details:', error);
//     }
//   };


//   // Handle checkout process
//   const handleCheckout = async () => {
//     try {
//       const response = await axios.post(
//         'http://127.0.0.1:8000/api/v1/app/transaction/',
//         cardDetails,
//         {
//           headers: {
//             'Content-Type': 'application/json',
//             'Authorization': `Token ${token}`,
//           },
//         }
//       );

//       if (response.status === 201) {
//         alert('Transaction successful! Your cart is now empty.');
//         await submitPurchaseDetails();
//         setCheckoutSuccess(true);
//         setCartItems([]);  // Clear the cart items after successful transaction
//         setTotalAmount(0);  // Reset the total amount
//         sessionStorage.removeItem('cartCount');
//       }
//     } catch (error) {
//       console.error('Error processing transaction:', error);
//     }
//   };


  


//   return (
//     <>
//     <ToastContainer theme="colored" transition={Zoom} />
//     <div className="body">
//         <div className='body1'>
//     <div className="form">
//     <h3>Total Amount: ₹{totalAmount}</h3>
//     <div className="input">
//     <h3>Enter Payment Details</h3>
//                 <div className="inputBox">
//                     <label htmlFor="">Card Number:</label>
//                     <input type="text"
//           name="card_number"
//           value={cardDetails.card_number}
//           onChange={handleCardChange}
//           placeholder="1234 5678 9101 1121"
//           required/>
//                 </div>
//                 <div className="inputBox">
//                     <label htmlFor="">Expiry Date:</label>
//                     <input type="text"
//           name="card_expiry"
//           value={cardDetails.card_expiry}
//           onChange={handleCardChange}
//           placeholder="MM/YY"
//           required/>
//                 </div>
//                 <div className="inputBox">
//                     <label htmlFor="">CVC:</label>
//                     <input type="text"
//           name="card_cvc"
//           value={cardDetails.card_cvc}
//           onChange={handleCardChange}
//           placeholder="123"
//           isrequired={true}
//           />
//                 </div>
//                 <div className="inputBox">
//                     <input type="submit" name="" value="Checkout" onClick={handleCheckout}/> 
//                 </div>
//                 <div className="inputBox">
//                     <input type="submit" name="" value="Go Back To Cart" onClick={(e)=>{
//                         e.preventDefault();
//                         setShowCheckout(false)
//                         // navigate('/cart')
//                     }}/> 
//                 </div>
//             </div>
//     </div></div></div>
//     </>
//   );
// };

// export default Transaction;

import React, { useState } from 'react';
import axios from 'axios';
import './Css/LoginandSignup.css'
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast, Zoom } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Loading from './Loading';



const Transaction = ({ totalAmount, setCartItems, setTotalAmount, setShowCheckout, cartItems }) => {
  const [cardDetails, setCardDetails] = useState({
    card_number: '',
    card_expiry: '',
    card_cvc: '',
  });
  const [checkoutSuccess, setCheckoutSuccess] = useState(false);
  const token = sessionStorage.getItem('user_token');
  const storedCartCount = sessionStorage.getItem('cartCount');
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  // Handle card input changes
  const handleCardChange = (e) => {
    setCardDetails({
      ...cardDetails,
      [e.target.name]: e.target.value,
    });
  };

  // Validate card details
  const validateCardDetails = () => {
    const { card_number, card_expiry, card_cvc } = cardDetails;
    
    if (!card_number || !card_expiry || !card_cvc) {
      toast.error('All fields are required!');
      return false;
    }
    
    if (!/^\d{16}$/.test(card_number)) {
      toast.error('Card number must be 16 digits.');
      return false;
    }
    
    if (!/^(0[1-9]|1[0-2])\/?([0-9]{2})$/.test(card_expiry)) {
      toast.error('Expiry date must be in MM/YY format.');
      return false;
    }
    
    if (!/^\d{3}$/.test(card_cvc)) {
      toast.error('CVC must be 3 digits.');
      return false;
    }

    return true;
  };

  const submitPurchaseDetails = async () => {
    setLoading(true);
    try {
      // Loop through cart items and send each purchase detail to the backend
      for (let item of cartItems) {
        const purchaseData = {
          book_id: item.book.id,
          quantity: item.quantity,
          total_price: totalAmount,
        };

        const response = await axios.post(
          'http://127.0.0.1:8000/api/v1/app/purchase/add/',
          purchaseData,
          {
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Token ${token}`,
            },
          }
        );

        if (response.status !== 201) {
          throw new Error('Failed to record purchase details.');
        }
      }
      console.log('Purchase details added successfully');
    } catch (error) {
      console.error('Error recording purchase details:', error);
      toast.error('Failed to record purchase details.');
    }finally {
      // Ensure loading state is set back to false after API call
      setLoading(false);
  }
  };

  // Handle checkout process
  const handleCheckout = async () => {
    // Validate card details before proceeding
    if (!validateCardDetails()) {
      return;
    }
    setLoading(true);
    try {
      const response = await axios.post(
        'http://127.0.0.1:8000/api/v1/app/transaction/',
        cardDetails,
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Token ${token}`,
          },
        }
      );

      if (response.status === 201) {
        toast.success('Transaction successful! Your cart is now empty.');
        await submitPurchaseDetails();
        setCheckoutSuccess(true);
        setCartItems([]);  // Clear the cart items after successful transaction
        setTotalAmount(0);  // Reset the total amount
        sessionStorage.removeItem('cartCount');
        sessionStorage.removeItem('cart');
      }
    } catch (error) {
      console.error('Error processing transaction:', error);
      toast.error('Error processing transaction. Please try again.');
    }finally {
      // Ensure loading state is set back to false after API call
      setLoading(false);
  }
  };

  return (
    <>
    <ToastContainer theme="colored" transition={Zoom} />
    {loading ?  (
                    <Loading/>
                ):
      
      <div className="body">
        <div className='body1'>
          <div className="form">
            <h3>Total Amount: ₹{totalAmount}</h3>
            <div className="input">
              <h3>Enter Payment Details</h3>
              <div className="inputBox">
                <label htmlFor="">Card Number:</label>
                <input
                  type="text"
                  name="card_number"
                  value={cardDetails.card_number}
                  onChange={handleCardChange}
                  placeholder="1234 5678 9101 1121"
                  
                />
              </div>
              <div className="inputBox">
                <label htmlFor="">Expiry Date:</label>
                <input
                  type="text"
                  name="card_expiry"
                  value={cardDetails.card_expiry}
                  onChange={handleCardChange}
                  placeholder="MM/YY"
                  
                />
              </div>
              <div className="inputBox">
                <label htmlFor="">CVC:</label>
                <input
                  type="text"
                  name="card_cvc"
                  value={cardDetails.card_cvc}
                  onChange={handleCardChange}
                  placeholder="123"
                  
                />
              </div>
              <div className="inputBox">
                <input type="submit" name="" value="Checkout" onClick={handleCheckout} />
              </div>
              <div className="inputBox">
                <input
                  type="submit"
                  name=""
                  value="Go Back To Cart"
                  onClick={(e) => {
                    e.preventDefault();
                    setShowCheckout(false);
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
}
    </>
  );
};

export default Transaction;
