import axios from "axios";
import React, { useEffect, useState } from "react";
import UserNavbar from "./UserNavbar";
import { useNavigate } from "react-router-dom";
import RentNavbar from "./RentNavbar";

function RentBook() {
  const [book, setBook] = useState([]);
  const [books, setBooks] = useState();
  const [dueDate, setDueDate] = useState("");
  const [rentSuccess, setRentSuccess] = useState(false);
  const [error, setError] = useState("");
  const token = sessionStorage.getItem("user_token");
  const navigate = useNavigate();
  const [showRent, setShowRent] = useState(false);
  const [bookid, setBookId] = useState('');

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get(
          "http://127.0.0.1:8000/api/v1/app/getbooks/",
          {
            headers: {
              "Content-Type": "application/json",
              // 'Authorization':`Token ${token}`
            },
          }
        );
        // console.log(response)
        if (response.status === 200) {
          setBook(response.data.data);
          console.log(response.data.data);
          // console.log(first)
        }
      } catch (error) {
        console.error(error);
      }
      setBooks("");
    }
    fetchData();
  }, [books]);

  const handleRent = async (e) => {
    // e.preventDefault();
    try {
      const rentData = {
        book: bookid, // Use the selected book's ID
        due_date: dueDate,
      };

      const response = await axios.post(
        "http://127.0.0.1:8000/api/v1/app/rentals/",
        rentData,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Token ${token}`,
          },
        }
      );

      if (response.status === 201) {
        setRentSuccess(true);
        alert("Book rented successfully!");
      }
    } catch (error) {
      setError("Failed to rent the book. Please try again.");
      console.error("Error renting book:", error);
    }
  };

  const handleRentClick = () => {
    setShowRent(true);
  };
  return (
    <>
      <div></div>
      <br />
      <div></div>
      <br />
      <RentNavbar />
      {/* <UserNavbar name={firstName} photo={preview} setAuthToken={setAuthToken} cartItemCount={cartItemCount} /> */}
      {!showRent ? (
        <>
          <div className="container">
            {book.map((item) => (
              <div className="product-card" key={item.id}>
                {/* <Link to={"/Productdetail"}> */}
                <div className="badge">Hot</div>
                <div className="badge2">{item.book_stock}</div>
                <div className="product-tumb">
                  <img src={item.image} alt="" height={100} width={200} />
                </div>
                <div className="product-details">
                  <span className="product-catagory">{item.author_name}</span>
                  <h4>
                    <a href="">{item.book_name}</a>
                  </h4>
                  <p>{item.pub_id}</p>
                  <div className="product-bottom-details">
                    <div className="product-price">₹{item.price}</div>
                    <div>
                      <button
                        type="sumbit"
                        className="btn2"
                        onClick={() => {
                          //  toast.success("Added to Cart");
                          handleRentClick();
                          setBookId(item.id)
                        }}
                      >
                        Rent Book
                      </button>
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
            ))}
          </div>
        </>
      ) : (
        // Pass totalAmount as a prop to CheckoutForm
        // <Transaction
        //     totalAmount={totalAmount}
        //     setCartItems={setCartItems}
        //     setTotalAmount={setTotalAmount}
        //     setShowCheckout={setShowCheckout}
        //     cartItems={cartItems}
        //   />

        //     <div className="container">
        //   <h2>Rent Book: {book.title}</h2>
        //   <p>Author: {book.author}</p>
        //   {rentSuccess ? (
        //     <div>
        //       <p>Your rental was successful!</p>
        //       <button onClick={() => navigate('/rentals')}>View Rentals</button>
        //     </div>
        //   ) : (
        //     <form onSubmit={handleRent}>
        //       {error && <p className="error">{error}</p>}

        //       <div className="form-group">
        //         <label htmlFor="due_date">Due Date:</label>
        //         <input
        //           type="date"
        //           id="due_date"
        //           value={dueDate}
        //           onChange={(e) => setDueDate(e.target.value)}
        //           required
        //         />
        //       </div>

        //       <button type="submit" className="btn btn-primary">
        //         Rent Book
        //       </button>
        //       <button type="submit" className="btn btn-primary">
        //         Cancel Go Back
        //       </button>
        //     </form>
        //   )}
        // </div>

        <div className="body">
          <div className="body1">
            <div className="form">
              {/* <h3>Total Amount: ₹{totalAmount}</h3> */}
              <div className="input">
                {/* <h3>Enter Payment Details</h3> */}
                <div className="inputBox">
                  <label htmlFor="">Due Date:</label>
                  <input
                  type="date"
                  id="due_date"
                  value={dueDate}
                  onChange={(e) => setDueDate(e.target.value)}
                  required
                />
                </div>
        
                <div className="inputBox">
                  <input
                    type="submit"
                    name=""
                    value="Rent Book"
                    onClick={() => {
                      // e.preventDefault();
                      handleRent()
                      setShowRent(true);
                      // setShowCheckout(false);
                      // navigate('/cart')
                    }}
                  />
                </div>
                <div className="inputBox">
                  <input
                    type="submit"
                    name=""
                    value="Cancel"
                    onClick={() => {
                      // e.preventDefault();
                      // handleRent()
                      setShowRent(false);
                      // setShowCheckout(false);
                      // navigate('/cart')
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
    // <div>RentBook</div>
  );
}

export default RentBook;
