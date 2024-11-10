// import React, { useEffect, useState } from 'react'
// import './Css/Home.css'
// import axios from 'axios'
// import UserNavbar from './UserNavbar';

// function Home() {

//   const [searchQuery, setSearchQuery] = useState('');
//   const [bookResults, setBookResults] = useState([]);
//   const [book,setBook]=useState([])
//   const username=localStorage.getItem('username')
//   const [books,setBooks]=useState()
//   const token = localStorage.getItem('user_token');
//   const [preview, setPreview] = useState(null);
//   const [firstName, setFirstName] = useState('');
//   const [authToken, setAuthToken] = useState(null);
//   const [cartItemCount, setCartItemCount] = useState(0);

//   useEffect(() => {
//     // Fetch the existing profile data when the component loads
//     async function fetchProfile() {
//       try {
//         const response = await axios.get('http://127.0.0.1:8000/api/v1/app/profile/update/', {
//           headers: {
//             'Content-Type':'application/json',
//             'Authorization': `Token ${token}`,
//           },
//         });
//         const data = response.data;
//       console.log("Profile Data: ", data);  // Log the entire response
//       if (data.first_name) {
//         setFirstName(data.first_name); // Set the first name from the API response
//       }
//       if (data.photo) {
//         const baseURL = 'http://127.0.0.1:8000';  // Adjust the base URL as needed
//         setPreview(`${baseURL}${data.photo}`);    // Set the preview if photo exists
//       } else {
//         console.log("No photo found in the response");
//       }
//       setAuthToken(token);
//       } catch (error) {
//         console.error('Error fetching profile data:', error);
//         // toast.error('Failed to load profile data');
//       }
//     }
//     fetchProfile();
//   }, [token]);

//   useEffect(()=>{
//     async function fetchData(){
//       try{
//         const response=await axios.get('http://127.0.0.1:8000/api/v1/app/getbooks/',{
//           headers:{
//             'Content-Type':'application/json',
//             // 'Authorization':`Token ${token}`
//           }
//         })
//         // console.log(response)
//         if(response.status===200){
//           setBook(response.data.data)
//           console.log(response.data.data)
//           // console.log(first)
//         }
//       }
//       catch(error){
//         console.error(error)
//       }
//       setBooks('')
//     }
//     fetchData();
//   },[books])



//   // Handle the search input change
//   const handleInputChange = (e) => {
//     setSearchQuery(e.target.value);
//   };

//   // Handle search button click
//   const handleSearch = () => {
//     if (searchQuery.trim() === '') {
//       alert('Please enter a search term.');
//       return;
//     }

//     // Filter books based on the search query
//     const filteredBooks = book.filter((book1) =>
//       book1.book_name.toLowerCase().includes(searchQuery.toLowerCase())
//     );

//     // Update the bookResults state with the filtered books
//     setBookResults(filteredBooks);
//   };

//   const handleAddToCart = async (bookId) => {
//     const quantity = 1;  // Default quantity

//     try {
//       const response = await axios.post('http://127.0.0.1:8000/api/v1/app/cart/add/', {
//         book_id: bookId,
//         quantity: quantity,
//       }, {
//         headers: {
//           'Content-Type': 'application/json',
//           'Authorization': `Token ${token}`,
//         },
//       });

//       if (response.status === 200) {
//         alert('Item added to cart');
//         const newCartCount = cartItemCount + 1;
//         setCartItemCount(newCartCount); // Update cart count state
//         localStorage.setItem('cartCount', newCartCount);
//       }
//     } catch (error) {
//       console.error('Error adding item to cart:', error);
//       alert('Failed to add item to cart');
//     }
//   };

//   useEffect(() => {
//     const storedCartCount = localStorage.getItem('cartCount');
//     if (storedCartCount) {
//       setCartItemCount(parseInt(storedCartCount));
//     }
// }, []);

//   return (
//     <>
//     <div></div><br/>
//     <div></div><br/>
//     <UserNavbar name={firstName} photo={preview} setAuthToken={setAuthToken} cartItemCount={cartItemCount} />
//     <div>
      
//       {/* {preview & preview.map((item)=>( */}
//         {/* <img
//             src={preview ? preview : 'https://via.placeholder.com/150'}
//             alt="Profile"
//             className="profile-pic"
//             style={{ borderRadius: '50%', width: '50px', height: '50px', objectFit: 'cover' }}
//           /> */}
//           {/* <h2 className='profile_name'>{username}</h2> */}
//     </div>
//     <div style={{ padding: '20px', maxWidth: '600px', margin: '0 auto' }}>
//       <h1>Book Search</h1>

//       <input
//         type="text"
//         value={searchQuery}
//         onChange={handleInputChange}
//         placeholder="Search for a book..."
//         style={{ padding: '10px', width: '100%', marginBottom: '20px' }}
//       />

//       <button onClick={handleSearch} className='sumbit' style={{ padding: '10px 20px', marginBottom: '20px' }}>
//         Search
//       </button>

//       {bookResults.length > 0 ? (
//         <ul>
//           {bookResults.map((item, index) => (
//             <div
             
//             className="product-card"
//             key={item.id}
//           >
//             {/* <Link to={"/Productdetail"}> */}
//             <div className="badge">Hot</div>
//             <div className="product-tumb">
//               <img src={item.image} alt="" />   
//             </div>
//             <div className="product-details">
//               <span className="product-catagory">
//                {item.author_name}
//                </span>
//               <h4>
//                 <a href="">
//                  {item.book_name}
//                  </a>
//               </h4>
//               <p>
//                {item.pub_id}
//                </p>
//               <div className="product-bottom-details">
//                 <div className="product-price">₹
//                  {item.price}
//                  </div>
//                 <div>
//                   <button type='sumbit' className='sumbit'
//                     onClick={() => {
//                      //  toast.success("Added to Cart");
//                      handleAddToCart(item.id)
//                     }}
//                   >
//                     Add to Cart
//                   </button>
//                 </div>
//                 {/* <div className="product-links">
//                   <a href="">
//                     <i className="fa fa-heart"></i>
//                   </a>
//                   <a href="">
//                     <i className="fa fa-shopping-cart"></i>
//                   </a>
//                 </div> */}
//               </div>
//             </div>
//             {/* </Link> */}
//           </div>
//           ))}
//         </ul>
//       ) : (
//         <p>No books found.</p>
//       )}
//     </div>
//     {/* <h1>{book.data[1]}</h1> */}

//     </>
//   )
// }

// export default Home







// import React, { useEffect, useState } from 'react';
// import './Css/Home.css';
// import axios from 'axios';
// import UserNavbar from './UserNavbar';
// import { ToastContainer, toast, Zoom } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';

// function Home() {
//   const [searchQuery, setSearchQuery] = useState('');
//   const [bookResults, setBookResults] = useState([]);
//   const [book, setBook] = useState([]);
//   const username = localStorage.getItem('username');
//   const [books, setBooks] = useState();
//   const token = localStorage.getItem('user_token');
//   const [preview, setPreview] = useState(null);
//   const [firstName, setFirstName] = useState('');
//   const [authToken, setAuthToken] = useState(null);
//   const [cart, setCart] = useState({});
//   const [cartItemCount, setCartItemCount] = useState(0);
//   const storedCartCount = localStorage.getItem('cartCount');


//   useEffect(() => {
//     async function fetchProfile() {
//       try {
//         const response = await axios.get('http://127.0.0.1:8000/api/v1/app/profile/update/', {
//           headers: {
//             'Content-Type': 'application/json',
//             'Authorization': `Token ${token}`,
//           },
//         });
//         const data = response.data;
//         if (data.first_name) {
//           setFirstName(data.first_name);
//         }
//         if (data.photo) {
//           const baseURL = 'http://127.0.0.1:8000';
//           setPreview(`${baseURL}${data.photo}`);
//         }
//         setAuthToken(token);
//       } catch (error) {
//         console.error('Error fetching profile data:', error);

//       }
//     }
//     fetchProfile();
//   }, [token]);

//   useEffect(() => {
//     async function fetchData() {
//       try {
//         const response = await axios.get('http://127.0.0.1:8000/api/v1/app/getbooks/', {
//           headers: {
//             'Content-Type': 'application/json',
//           },
//         });
//         if (response.status === 200) {
//           setBook(response.data.data);
//         }
//       } catch (error) {
//         console.error(error);
//       }
//       setBooks('');
//     }
//     fetchData();
//   }, [books]);

//   // Handle search input
//   const handleInputChange = (e) => {
//     setSearchQuery(e.target.value);
//   };

//   const handleSearch = () => {
//     if (searchQuery.trim() === '') {
//       // alert('Please enter a search term.');
//       toast.warning('Please enter a search term.');
//       return;
//     }

//     const filteredBooks = book.filter((book1) =>
//       book1.book_name.toLowerCase().includes(searchQuery.toLowerCase())
//     );
//     setBookResults(filteredBooks);
//   };

//   // Handle adding to cart
//   const handleAddToCart = async (bookId, quantity) => {
//     try {
//       const response = await axios.post(
//         'http://127.0.0.1:8000/api/v1/app/cart/add/',
//         {
//           book_id: bookId,
//           quantity: quantity,
//         },
//         {
//           headers: {
//             'Content-Type': 'application/json',
//             'Authorization': `Token ${token}`,
//           },
//         }
//       );

//       if (response.status === 200) {
//         // alert('Item added to cart');
//         // toast.success('Item added to cart');
//         const newCartCount = cartItemCount + quantity;
//         setCartItemCount(newCartCount); // Update cart count state
//         localStorage.setItem('cartCount', newCartCount);

//         // Update cart state with the new book and its quantity
//         setCart((prevCart) => {
//           const updatedCart = {
//             ...prevCart,
//             [bookId]: (prevCart[bookId] || 0) + quantity,
//           };
//           localStorage.setItem('cart', JSON.stringify(updatedCart)); // Save to local storage
//           // toast.success('Item added to cart');
//           return updatedCart;
//         });
//       }
//     } catch (error) {
//       console.error('Error adding item to cart:', error);
//       // alert('Failed to add item to cart');
//       toast.error('Failed to add item to cart');
//     }
//   };

//   // Handle increment quantity
//   const incrementQuantity = (bookId) => {
//     handleAddToCart(bookId, 1);
//     toast.success('Item added to cart');
//   };

//   // Handle decrement quantity
//   const decrementQuantity = (bookId) => {
//     if (cart[bookId] > 1) {
//       // idbook=
//       handleAddToCart(bookId, -1);
//       toast.warning('Item removed from cart');
//     } else {
//       // Remove item if quantity is 1 and decrement is clicked
//       handleRemoveFromCart(bookId);
      
//     }
//   };

//   // Handle removing an item from cart
//   const handleRemoveFromCart = async (bookId) => {
//     try {
//       const response = await axios.post(
//         'http://127.0.0.1:8000/api/v1/app/cart/remove/',
//         {
//           book_id: bookId,
//         },
//         {
//           headers: {
//             'Content-Type': 'application/json',
//             'Authorization': `Token ${token}`,
//           },
//         }
//       );

//       if (response.status === 200) {
//         // alert('Item removed from cart');
//         toast.warning('Item removed from cart');
//         setCartItemCount(cartItemCount - 1);
//         storedCartCount=cartItemCount
        

//         // Update cart state after removing the item
//         setCart((prevCart) => {
//           const updatedCart = { ...prevCart };
//           delete updatedCart[bookId];
//           localStorage.setItem('cart', JSON.stringify(updatedCart)); // Save to local storage
//           alert('Item removed from cart');
//           localStorage.setItem('cartCount',storedCartCount)
//           return updatedCart;
//         });
//         console.log(cart)
//       }
//     } catch (error) {
//       console.error('Error removing item from cart:', error);
//     }
//   };

//   useEffect(() => {
//     const storedCart = JSON.parse(localStorage.getItem('cart')) || {};
//     setCart(storedCart);
//     setCartItemCount(Object.values(storedCart).reduce((a, b) => a + b, 0)); // Calculate total items in cart
//   }, []);

//     useEffect(() => {
//     const storedCartCount = localStorage.getItem('cartCount');
//     if (storedCartCount) {
//       setCartItemCount(parseInt(storedCartCount));
//     }
// }, []);
//   return (
//     <>
//       <div></div><br />
//       <div></div><br />
//       <ToastContainer theme="colored" transition={Zoom}/>
//       <UserNavbar name={firstName} photo={preview} setAuthToken={setAuthToken} cartItemCount={cartItemCount} />
//       <br/>
//       <div style={{ padding: '20px', maxWidth: '600px', margin: '0 auto', display:'flex', flexDirection:'column',alignItems:'center' }}>
//         <h1>
//           Book Search

//         </h1>
//         <div id="inputBox"><input
//           type="text"
//           value={searchQuery}
//           onChange={handleInputChange}
//           placeholder="Search for a book..."
//           className="inputBox"
//           // style={{ padding: '10px', width: '100%', marginBottom: '20px' }}
//         /></div>
        
//         <div id="searchbtn"><button onClick={handleSearch} id='sumbit' 
//         // style={{ padding: '10px', width: '100%', marginBottom: '20px' }}
//          >
//           Search
//         </button></div>
        

//         {bookResults.length > 0 ? (
//           <ul>
//             {bookResults.map((item) => (
//               <div className="product-card" key={item.id}>
//                 <div className="badge">Hot</div>
//                 <div className="product-tumb">
//                   <img src={item.image} alt="" />
//                 </div>
//                 <div className="product-details">
//                   <span className="product-catagory">{item.author_name}</span>
//                   <h4><a href="">{item.book_name}</a></h4>
//                   <p>{item.pub_id}</p>
//                   <div className="product-bottom-details">
//                     <div className="product-price">₹{item.price}</div>
//                     {cart[item.id] ? ( // If the book is in the cart
//                       <div >
//                         <button className='btn3' onClick={() => decrementQuantity(item.id)}>-</button>
//                         <span className='num'>{cart[item.id]}</span>
//                         <button className='btn3' onClick={() => incrementQuantity(item.id)}>+</button>
                        
//                       </div>
//                     ) : (
//                       <button className='btn2' onClick={() => {handleAddToCart(item.id)}}>Add to Cart</button>
//                     )}
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </ul>
//         ) : (
//           <p>No books found.</p>
//         )}
//       </div>
//       <div className='container'>
//     { book
//     .map((item)=>(<div
             
//              className="product-card"
//              key={item.id}
//            >
//              {/* <Link to={"/Productdetail"}> */}
//              <div className="badge">Hot</div>
//              <div className="badge2">{item.book_stock}</div>
//              <div className="product-tumb">
//                <img src={item.image} alt="" height={100} width={200} />   
//              </div>
//              <div className="product-details">
//                <span className="product-catagory">
//                 {item.author_name}
//                 </span>
//                <h4>
//                  <a href="">
//                   {item.book_name}
//                   </a>
//                </h4>
//                <p>
//                 {item.pub_id}
//                 </p>
//                <div className="product-bottom-details">
//                  <div className="product-price">₹
//                   {item.price}
//                   </div>
//                   {cart[item.id] ? ( // If the book is in the cart
//                       <div >
//                         <button className='btn3' onClick={() => decrementQuantity(item.id)}>-</button>
//                         <span className='num'>{cart[item.id]}</span>
//                         <button className='btn3' onClick={() => incrementQuantity(item.id)}>+</button>
                        
//                       </div>
//                     ) : (
//                       <button className='btn2' onClick={() => handleAddToCart(item.id,1)}>Add to Cart</button>
//                     )}
//                  {/* <div className="product-links">
//                    <a href="">
//                      <i className="fa fa-heart"></i>
//                    </a>
//                    <a href="">
//                      <i className="fa fa-shopping-cart"></i>
//                    </a>
//                  </div> */}
//                </div>
//              </div>
//              {/* </Link> */}
//            </div>))
    
// }
// </div>
//     </>
//   );
// }

// export default Home;


// ---------------------------------    //


import React, { useEffect, useState } from 'react';
import './Css/Home.css';
import axios from 'axios';
import UserNavbar from './UserNavbar';
import { ToastContainer, toast, Zoom } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Home() {
  const [searchQuery, setSearchQuery] = useState('');
  const [bookResults, setBookResults] = useState([]);
  const [book, setBook] = useState([]);
  const username = sessionStorage.getItem('username'); // Using sessionStorage
  const [books, setBooks] = useState();
  const token = sessionStorage.getItem('user_token');  // Using sessionStorage
  const [preview, setPreview] = useState(null);
  const [firstName, setFirstName] = useState('');
  const [authToken, setAuthToken] = useState(null);
  const [cart, setCart] = useState({});
  const [cartItemCount, setCartItemCount] = useState(0);
  const [quantities, setQuantities] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const [stock,setstock]=useState();

  const fetchBookStock = async (bookId) => {
    try {
      const response = await axios.get(`http://127.0.0.1:8000/api/v1/app/get_book_stock/${bookId}`,{},{
        headers: {
          "Content-Type": "application/json",
          'Authorization': `Token ${token}`
      },
      });
      setstock(response.data.stock);
      console.log(response.data.stock)
    } catch (error) {
      console.error("Error fetching book stock:", error);
    }
  };

  useEffect(() => {
    async function fetchRentals() {
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
                const rentals = response.data;
                const today = new Date();

                // Check for overdue books
                const overdueBooks = rentals.filter(item => new Date(item.due_date) < today);
                
                // Display a toast if there are overdue books
                if (overdueBooks.length > 0) {
                    toast.error(`You have ${overdueBooks.length} overdue book(s)! Please return them.`);
                }
            }
        } catch (error) {
            console.error('Error fetching rental history:', error);
        }
    }

    fetchRentals();
}, [token]);



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
          const items = response.data.items || [];
          setCartItems(items); 

          const quantitiesArray = items.map(item => item.quantity);
          setQuantities(quantitiesArray);

          const totalQuantity = quantitiesArray.reduce((sum, quantity) => sum + quantity, 0);
          sessionStorage.setItem('cartCount', totalQuantity); // Using sessionStorage
        }
      } catch (error) {
        console.error('Error fetching cart items:', error.response || error);
      }
    }

    fetchCartItems();
  }, [token]);

  useEffect(() => {
    async function fetchProfile() {
      try {
        const response = await axios.get('http://127.0.0.1:8000/api/v1/app/profile/update/', {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Token ${token}`,
          },
        });
        const data = response.data;
        if (data.first_name) {
          setFirstName(data.first_name);
          sessionStorage.setItem('username', firstName);  // Using sessionStorage
        }
        if (data.photo) {
          const baseURL = 'http://127.0.0.1:8000';
          setPreview(`${baseURL}${data.photo}`);
        }
        setAuthToken(token);
      } catch (error) {
        console.error('Error fetching profile data:', error);
      }
    }
    fetchProfile();
  }, [token]);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get('http://127.0.0.1:8000/api/v1/app/getbooks/', {
          headers: {
            'Content-Type': 'application/json',
          },
        });
        if (response.status === 200) {
          setBook(response.data.data);
          console.log(response.data.book_stock)
          // console.log(book)
          // {book.map((item)=>(setstock(item.book_stock)))}
          // console.log(stock)
        }
      } catch (error) {
        console.error(error);
      }
      setBooks('');
    }
    fetchData();
  }, [books,stock]);

  const handleInputChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSearch = () => {
    if (searchQuery.trim() === '') {
      toast.warning('Please enter a search term.');
      return;
    }

    const filteredBooks = book.filter((book1) =>
      book1.book_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    book1.author_name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setBookResults(filteredBooks);
  };

  // const handleAddToCart = async (bookId, quantity = 1) => {
  //   try {
  //     const response = await axios.post(
  //       'http://127.0.0.1:8000/api/v1/app/cart/add/',
  //       {
  //         book_id: bookId,
  //         quantity: quantity,
  //       },
  //       {
  //         headers: {
  //           'Content-Type': 'application/json',
  //           'Authorization': `Token ${token}`,
  //         },
  //       }
  //     );

  //     if (response.status === 200) {
  //       const newCartCount = cartItemCount + quantity;
  //       setCartItemCount(newCartCount);
  //       sessionStorage.setItem('cartCount', newCartCount);  // Using sessionStorage

  //       setCart((prevCart) => {
  //         const updatedCart = {
  //           ...prevCart,
  //           [bookId]: (prevCart[bookId] || 0) + quantity,
  //         };
  //         sessionStorage.setItem('cart', JSON.stringify(updatedCart));  // Using sessionStorage
  //         return updatedCart;
  //       });

  //       toast.success('Item added to cart');
  //     }
  //   } catch (error) {
  //     console.error('Error adding item to cart:', error);
  //     toast.error('Failed to add item to cart');
  //   }
  // };

  const incrementQuantity = (bookId) => {
    handleAddToCart(bookId, 1);
    
  };

  const decrementQuantity = (bookId) => {
    if (cart[bookId] > 1) {
      handleAddToCart(bookId, -1);
    } else {
      handleRemoveFromCart(bookId);
    }
  };

  // const handleRemoveFromCart = async (bookId) => {
  //   try {
  //     const response = await axios.post(
  //       'http://127.0.0.1:8000/api/v1/app/cart/remove/',
  //       {
  //         book_id: bookId,
  //       },
  //       {
  //         headers: {
  //           'Content-Type': 'application/json',
  //           'Authorization': `Token ${token}`,
  //         },
  //       }
  //     );

  //     if (response.status === 200) {
  //       toast.warning('Item removed from cart');
  //       setCartItemCount(cartItemCount - cart[bookId]);

  //       setCart((prevCart) => {
  //         const updatedCart = { ...prevCart };
  //         delete updatedCart[bookId];
  //         sessionStorage.setItem('cart', JSON.stringify(updatedCart));  // Using sessionStorage
  //         sessionStorage.setItem('cartCount', cartItemCount - cart[bookId]);  // Using sessionStorage
  //         return updatedCart;
  //       });
  //     }
  //   } catch (error) {
  //     console.error('Error removing item from cart:', error);
  //   }
  // };

  const handleAddToCart = async (bookId, quantity = 1) => {
    const bookToAdd = book.find(b => b.id === bookId);
      if (!bookToAdd || bookToAdd.book_stock <= 0) {
        toast.warning('This book is out of stock!');
        return;
      }
    try {
      const response = await axios.post(
        'http://127.0.0.1:8000/api/v1/app/cart/add/',
        { book_id: bookId, quantity: quantity },
        { headers: { 'Content-Type': 'application/json', 'Authorization': `Token ${token}` } }
      );

      if (response.status === 200) {
        const currentBook = cart[bookId] ? cart[bookId] : 0;
        const newCartCount = cartItemCount + quantity;
        setCartItemCount(newCartCount);
        sessionStorage.setItem('cartCount', newCartCount);  // Update cart count in sessionStorage

        // Update cart in sessionStorage
        setCart((prevCart) => {
          const updatedCart = { ...prevCart, [bookId]: currentBook + quantity };
          sessionStorage.setItem('cart', JSON.stringify(updatedCart));
          return updatedCart;
        });

        // Update book stock in sessionStorage and state
        setBook((prevBooks) => {
          const updatedBooks = prevBooks.map((b) =>
            b.id === bookId ? { ...b, book_stock: b.book_stock - quantity } : b
          );
          sessionStorage.setItem('books', JSON.stringify(updatedBooks));  // Update sessionStorage with new book stock
          return updatedBooks;
        });

        toast.success('Item added to cart');
      }
    } catch (error) {
      console.error('Error adding item to cart:', error);
      toast.error('Failed to add item to cart');
    }
    fetchBookStock(bookId)
  };


// const handleRemoveFromCart = async (bookId) => {
//   try {
//     const response = await axios.post(
//       'http://127.0.0.1:8000/api/v1/app/cart/remove/',
//       { book_id: bookId },
//       { headers: { 'Content-Type': 'application/json', 'Authorization': `Token ${token}` } }
//     );

//     if (response.status === 200) {
//       const itemQuantity = cart[bookId];
//       toast.warning('Item removed from cart');
//       setCartItemCount(cartItemCount - cart[bookId]);

//       setCart((prevCart) => {
//         const updatedCart = { ...prevCart };
//         delete updatedCart[bookId];
//         sessionStorage.setItem('cart', JSON.stringify(updatedCart));  // Using sessionStorage
//         sessionStorage.setItem('cartCount', cartItemCount - cart[bookId]);  // Using sessionStorage
//         return updatedCart;
//       });

//       // Update book stock on frontend
//       setBook((prevBooks) => {
//         const updatedBooks = prevBooks.map((b) =>
//           b.id === bookId ? { ...b, book_stock: b.book_stock + itemQuantity } : b
//         );
//         sessionStorage.setItem('books', JSON.stringify(updatedBooks)); // Save updated stock to sessionStorage
//         return updatedBooks;
//       });
//     }
//   } catch (error) {
//     console.error('Error removing item from cart:', error);
//   }
// };

const handleRemoveFromCart = async (bookId) => {
    try {
      const response = await axios.post(
        'http://127.0.0.1:8000/api/v1/app/cart/remove/',
        { book_id: bookId },
        { headers: { 'Content-Type': 'application/json', 'Authorization': `Token ${token}` } }
      );

      if (response.status === 200) {
        const itemQuantity = cart[bookId];
        toast.warning('Item removed from cart');
        setCartItemCount(cartItemCount - cart[bookId]);

        setCart((prevCart) => {
          const updatedCart = { ...prevCart };
          delete updatedCart[bookId];
          sessionStorage.setItem('cart', JSON.stringify(updatedCart));
          sessionStorage.setItem('cartCount', cartItemCount - cart[bookId]);
          return updatedCart;
        });

        // Update book stock in sessionStorage and state
        setBook((prevBooks) => {
          const updatedBooks = prevBooks.map((b) =>
            b.id === bookId ? { ...b, book_stock: b.book_stock + itemQuantity } : b
          );
          sessionStorage.setItem('books', JSON.stringify(updatedBooks));
          return updatedBooks;
        });
      }
    } catch (error) {
      console.error('Error removing item from cart:', error);
    }
  };

  useEffect(() => {
    const storedCart = JSON.parse(sessionStorage.getItem('cart')) || {};  // Using sessionStorage
    setCart(storedCart);
    setCartItemCount(Object.values(storedCart).reduce((a, b) => a + b, 0));
  }, []);

  useEffect(() => {
    const storedCartCount = sessionStorage.getItem('cartCount');  // Using sessionStorage
    if (storedCartCount) {
      setCartItemCount(parseInt(storedCartCount));
    }
  }, []);

  useEffect(() => {
  // Load cart and cart count from sessionStorage on page reload
  const storedCart = sessionStorage.getItem('cart');
  const storedCartCount = sessionStorage.getItem('cartCount');

  if (storedCart) {
    setCart(JSON.parse(storedCart));  // Restore cart state without changing book stock
  }

  if (storedCartCount) {
    setCartItemCount(Number(storedCartCount));  // Restore cart item count
  }
}, []);  // Run once when the component mounts


  


  return (
    <>
      <div></div><br />
      <ToastContainer theme="colored" transition={Zoom} />
      <UserNavbar name={firstName} photo={preview} setAuthToken={setAuthToken} cartItemCount={cartItemCount}  handleSearch={handleSearch} searchQuery={searchQuery} 
        setSearchQuery={setSearchQuery} />
      <br/>
      
        {/* <h1>Book Search</h1>
        <div className="inputBox">
          <input
            type="text"
            value={searchQuery}
            onChange={handleInputChange}
            placeholder="Search for a book..."
            className="inputBox"
          />
        </div>
        
        <div id="searchbtn">
          <button onClick={handleSearch} className='btn2'>Search</button>
        </div> */}
        {searchQuery ? 
        <div style={{ padding: '20px', maxWidth: '600px', margin: '0 auto', display:'flex', flexDirection:'column', alignItems:'center' }}>
        {bookResults.length > 0 ? (
          
          <ul>
            {bookResults.map((item) => (
              <div className="product-card" key={item.id}>
                <div className="badge">Hot</div>
                <div className="product-tumb">
                  <img src={item.image} alt="" />
                </div>
                <div className="product-details">
                  <span className="product-catagory">{item.author_name}</span>
                  <h4><a href="">{item.book_name}</a></h4>
                  <p>{item.pub_id}</p>
                  <div className="product-bottom-details">
                    <div className="product-price">₹{item.price}</div>
                    {cart[item.id] ? (
                      <div>
                        <button className='btn3' onClick={() => decrementQuantity(item.id)}>-</button>
                        <span className='num'>{cart[item.id]}</span>
                        <button className='btn3' onClick={() => incrementQuantity(item.id)}>+</button>
                      </div>
                    ) : (
                      <button className='btn2' onClick={() => handleAddToCart(item.id, 1)}>Add to Cart</button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </ul>
          
        ) : (
          <p>No books found.</p>
        )}
        </div>
      :""}

      <div className='container'>
        {book.map((item) => (
          <div className="product-card" key={item.id}>
            <div className="badge">Hot</div>
            <div className="badge2">{item.book_stock}</div>
            <div className="product-tumb">
              <img src={item.image} alt="" height={100} width={200} />
            </div>
            <div className="product-details">
              <span className="product-catagory">{item.author_name}</span>
              <h4><a href="">{item.book_name}</a></h4>
              <p>{item.pub_id}</p>
              <div className="product-bottom-details">
                <div className="product-price">₹{item.price}</div>
                {cart[item.id] ? (
                  <div>
                    <button className='btn3' onClick={() => decrementQuantity(item.id)}>-</button>
                    <span className='num'>{cart[item.id]}</span>
                    <button className='btn3' onClick={() => incrementQuantity(item.id)}>+</button>
                  </div>
                ) : (
                  <button className='btn2' onClick={() => handleAddToCart(item.id, 1)}>Add to Cart</button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
        {/* )}; */}
    </>
  );
}

export default Home;
