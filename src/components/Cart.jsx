// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// // import Transaction from './Transaction';
// import { useNavigate } from 'react-router-dom';
// import './Css/Home.css'
// import Transaction from './Transaction';

// function Cart() {
//   const [cartItems, setCartItems] = useState([]);  // Initialize as an empty array
//   const [totalAmount, setTotalAmount] = useState(0);
//   const [cardDetails, setCardDetails] = useState({
//     card_number: '',
//     card_expiry: '',
//     card_cvc: '',
//   });
//   const [checkoutSuccess, setCheckoutSuccess] = useState(false);
//   const token = sessionStorage.getItem('user_token');
// //   const [totalAmount, setTotalAmount] = useState(0);
//   const [showCheckout, setShowCheckout] = useState(false);
//   const navigate=useNavigate()
//   const storedCartCount = sessionStorage.getItem('cartCount');

//   // Fetch cart items when the component loads
//   useEffect(() => {
//     async function fetchCartItems() {
//       try {
//         const response = await axios.get('http://127.0.0.1:8000/api/v1/app/cart/', {
//           headers: {
//             'Content-Type': 'application/json',
//             'Authorization': `Token ${token}`,
//           },
//         });

//         if (response.status === 200) {
//           console.log(response.data); // Check the response data structure
//           setCartItems(response.data.items || []); // Update this to correctly set the cart items
          
//           // Calculate the total amount
//           const total = (response.data.items || []).reduce(
//             (sum, item) => sum + item.book.price * item.quantity,
//             0
//           );
//           setTotalAmount(total);
//         }
//       } catch (error) {
//         console.error('Error fetching cart items:', error.response || error);
//       }
//     }

//     fetchCartItems();
//   }, [token]);

//   // Handle removing item from cart
//   const handleRemoveFromCart = async (bookId) => {
//     try {
//       const response = await axios.post(
//         'http://127.0.0.1:8000/api/v1/app/cart/remove/',
//         { book_id: bookId },
//         {
//           headers: {
//             'Content-Type': 'application/json',
//             'Authorization': `Token ${token}`,
//           },
//         }
//       );

//       if (response.status === 200) {
//         alert('Item removed from cart');
//         // Update the cart items state after removal
//         const updatedCartItems = cartItems.filter(item => item.book.id !== bookId);
//         setCartItems(updatedCartItems);
        
        
//         // Recalculate the total amount
//         const updatedTotal = updatedCartItems.reduce(
//           (sum, item) => sum + item.book.price * item.quantity,
//           0
//         );
//         setTotalAmount(updatedTotal);

//         if (updatedCartItems.length > 0) {
//           sessionStorage.setItem('cartCount', updatedCartItems.length);  // Update cart count in sessionStorage
//         } else {
//           sessionStorage.removeItem('cartCount');  // Clear cartCount from sessionStorage if no items left
//         }
//       }
//     } catch (error) {
//       console.error('Error removing item from cart:', error);
//     }
//   };

//   // Handle card input changes
// //   const handleCardChange = (e) => {
// //     setCardDetails({
// //       ...cardDetails,
// //       [e.target.name]: e.target.value,
// //     });
// //   };

//   const toggleCheckoutForm = () => {
//     // setShowCheckout(prev => !prev);
//     // setShowCheckout(true);
//     navigate('/transaction')
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
//         setCheckoutSuccess(true);
//         setCartItems([]);  // Clear the cart items after successful transaction
//         setTotalAmount(0);  // Reset the total amount
//         sessionStorage.removeItem('cartCount');
//       }
//     } catch (error) {
//       console.error('Error processing transaction:', error);
//     }
//   };

//   const handleCheckoutClick = () => {
//     setShowCheckout(true);
//   };

//   return (
//     <>
//      <div style={{ padding: '20px', maxWidth: '600px', margin: '0 auto' }}>
//       {/* <h1>Your Cart</h1> */}
//       {/* <div className='container'> */}

//       {!showCheckout ? (
//         <>
//             <h1>Your Cart</h1>
//       {cartItems.length > 0 ? (  
//         <>
//           <ul>
//             {cartItems.map((item) => (
//               <div key={item.book.id} className="product-card">
//                 <div className="product-details">
//                   <span className="product-catagory">{item.book.author_name}</span>
//                   <h4>{item.book.book_name}</h4>
//                   <p>Quantity: {item.quantity}</p>
//                   <div className="product-bottom-details">
//                     <div className="product-price">₹{item.book.price}</div>
//                     <div>
//                       <button
//                         type="submit"
//                         className="btn2"
//                         onClick={() => handleRemoveFromCart(item.book.id)}
//                       >
//                         Remove from Cart
//                       </button>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </ul>
//           <h2>Total Amount: ₹{totalAmount}</h2>
//           <button onClick={handleCheckoutClick} className="btn1">
//             {/* {showCheckout ? 'Cancel Checkout' : 'Proceed to Checkout'} */}
//             Proceed to Checkout
//           </button>
//           <button onClick={()=>navigate('/home')} className="btn1">
//             {/* {showCheckout ? 'Cancel Checkout' : 'Proceed to Checkout'} */}
//             Back To Home
//           </button>
//           {/* {showCheckout && (
//           <Transaction 
//             totalAmount={totalAmount}
//             setCartItems={setCartItems}
//             setTotalAmount={setTotalAmount}
//           />
//         )} */}
//         </>
//           ) : (
//             <p>Your cart is empty.</p>
//           )}
//         </>
//       ) : (
//         // Pass totalAmount as a prop to CheckoutForm
//         <Transaction 
//             totalAmount={totalAmount}
//             setCartItems={setCartItems}
//             setTotalAmount={setTotalAmount}
//             setShowCheckout={setShowCheckout}
//             cartItems={cartItems}
//           />
//       )}
//     </div>
//      {/* </div> */}
//     </>
    
//   );
// }

// export default Cart;




import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Css/Home.css';
import Transaction from './Transaction';

function Cart() {
  const [cartItems, setCartItems] = useState([]);  // Initialize as an empty array
  const [totalAmount, setTotalAmount] = useState(0);
  const [showCheckout, setShowCheckout] = useState(false);
  const token = sessionStorage.getItem('user_token');
  const navigate = useNavigate();
  const storedCartCount = sessionStorage.getItem('cartCount');

  // Fetch cart items when the component loads
  useEffect(() => {
    async function fetchCartItems() {
      try {
        const response = await axios.get('http://127.0.0.1:8000/api/v1/app/cart/', {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Token ${token}`,
          },
        });

        if (response.status === 200) {
          setCartItems(response.data.items || []); // Set the cart items

          // Calculate the total amount
          const total = (response.data.items || []).reduce(
            (sum, item) => sum + item.book.price * item.quantity,
            0
          );
          setTotalAmount(total);
        }
      } catch (error) {
        console.error('Error fetching cart items:', error.response || error);
      }
    }

    fetchCartItems();
  }, [token]);

  // Handle incrementing quantity
  const incrementQuantity = async (bookId) => {
    try {
      const updatedCartItems = cartItems.map(item =>
        item.book.id === bookId ? { ...item, quantity: item.quantity + 1 } : item
      );
      setCartItems(updatedCartItems);

      // Update local storage and recalculate total amount
      updatesessionStorageAndTotal(updatedCartItems);

      await axios.post(
        'http://127.0.0.1:8000/api/v1/app/cart/add/',
        { book_id: bookId, quantity: 1 },
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Token ${token}`,
          },
        }
      );
    } catch (error) {
      console.error('Error updating quantity:', error);
    }
  };

  // Handle decrementing quantity
  const decrementQuantity = async (bookId) => {
    try {
      const updatedCartItems = cartItems
        .map(item =>
          item.book.id === bookId && item.quantity > 1
            ? { ...item, quantity: item.quantity - 1 }
            : item
        )
        .filter(item => item.quantity > 0); // Remove items with 0 quantity
      setCartItems(updatedCartItems);

      // Update local storage and recalculate total amount
      updatesessionStorageAndTotal(updatedCartItems);

      await axios.post(
        'http://127.0.0.1:8000/api/v1/app/cart/add/',
        { book_id: bookId, quantity: -1 },
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Token ${token}`,
          },
        }
      );
    } catch (error) {
      console.error('Error updating quantity:', error);
    }
  };

  // Handle removing item from cart
  const handleRemoveFromCart = async (bookId) => {
    try {
      const response = await axios.post(
        'http://127.0.0.1:8000/api/v1/app/cart/remove/',
        { book_id: bookId },
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Token ${token}`,
          },
        }
      );

      if (response.status === 200) {
        alert('Item removed from cart');
        const updatedCartItems = cartItems.filter(item => item.book.id !== bookId);
        setCartItems(updatedCartItems);

        updatesessionStorageAndTotal(updatedCartItems);
      }
    } catch (error) {
      console.error('Error removing item from cart:', error);
    }
  };

  // Update sessionStorage and recalculate total amount
  const updatesessionStorageAndTotal = (updatedCartItems) => {
    // Update the cart count in sessionStorage
    const totalCount = updatedCartItems.reduce((count, item) => count + item.quantity, 0);
    if (totalCount > 0) {
      sessionStorage.setItem('cartCount', totalCount);
    } else {
      sessionStorage.removeItem('cartCount');
    }

    // Recalculate total amount
    const updatedTotal = updatedCartItems.reduce(
      (sum, item) => sum + item.book.price * item.quantity,
      0
    );
    setTotalAmount(updatedTotal);

    // Store updated cart in sessionStorage
    sessionStorage.setItem('cartItems', JSON.stringify(updatedCartItems));
  };

  // Handle checkout process
  const handleCheckoutClick = () => {
    setShowCheckout(true);
  };

  return (
    <>
      <div style={{ padding: '20px', maxWidth: '600px', margin: '0 auto' }}>
        {!showCheckout ? (
          <>
            <h1>Your Cart</h1>
            {cartItems.length > 0 ? (
              <>
                <ul>
                  {cartItems.map((item) => (
                    <div key={item.book.id} className="product-card">
                      <div className="product-details">
                        <span className="product-catagory">{item.book.author_name}</span>
                        <h4>{item.book.book_name}</h4>
                        <p>Quantity: {item.quantity}</p>
                        <div className="product-bottom-details">
                          <div className="product-price">₹{item.book.price}</div>
                          <div>
                            <button className='btn3' onClick={() => decrementQuantity(item.book.id)}>-</button>
                            <span className='num'>{item.quantity}</span>
                            <button className='btn3' onClick={() => incrementQuantity(item.book.id)}>+</button>
                          </div>
                          <button
                            type="submit"
                            className="btn2"
                            onClick={() => handleRemoveFromCart(item.book.id)}
                          >
                            Remove from Cart
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </ul>
                <h2>Total Amount: ₹{totalAmount}</h2>
                <button onClick={handleCheckoutClick} className="btn1">
                  Proceed to Checkout
                </button>
                <button onClick={() => navigate('/home')} className="btn1">
                  Back To Home
                </button>
              </>
            ) : (
              <p>Your cart is empty.</p>
            )}
          </>
        ) : (
          <Transaction
            totalAmount={totalAmount}
            setCartItems={setCartItems}
            setTotalAmount={setTotalAmount}
            setShowCheckout={setShowCheckout}
            cartItems={cartItems}
          />
        )}
      </div>
    </>
  );
}

export default Cart;
