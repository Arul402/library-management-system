import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Navbar from '../Navbar';
import { useNavigate } from 'react-router-dom';

function BookHistory() {
  const [history, setHistory] = useState([]);
  const token = sessionStorage.getItem('admin_token'); // Use appropriate token, admin in this case
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchHistory() {
      try {
        const response = await axios.get('http://127.0.0.1:8000/api/v1/app/purchase/history/', {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Token ${token}`,
          },
        });

        if (response.status === 200) {
          setHistory(response.data); // Adjust if the data is nested within another object
          console.log(response.data);
        }
      } catch (error) {
        console.error('Error fetching purchase history:', error);
      }
    }

    fetchHistory();
  }, [token]);

  return (
    <>
      <div></div><br />
      <div></div><br />
      <Navbar />
      <div className='container'>
        {history.length > 0 ? (
          history.map((item) => (
            <div
              className="product-card"
              key={item.id} // Key for unique identification
            >
              <div className="product-details">
              <p>User ID: {item.user}</p>
              <span className="product-catagory"><h3>User Name: {item.username}</h3></span>
                
                <span className="product-catagory">
                  <h3>Book Title: {item.book_name}</h3> {/* Assuming book_name is the title */}
                </span>
                <span className="product-catagory">
                  Price per Unit: ₹{item.price} {/* Assuming price is the unit price */}
                </span>
                <h4>
                  <a>
                    Purchase Date: {new Date(item.purchase_date).toLocaleDateString()}
                  </a>
                </h4>
                <p>
                  Quantity: {item.quantity}
                </p>
                <p>
                  Total Price: ₹{item.total_price}
                </p>
                <div className="product-bottom-details">
                  <div className="product-price">
                    {/* Additional Price or Other Info */}
                  </div>
                  {/* <div>
                    <button
                      className='sumbit'
                      onClick={() => {
                        navigate(`/book/${item.id}`); // Example: Navigate to book detail page
                      }}
                    >
                      View Book
                    </button>
                  </div> */}
                </div>
              </div>
            </div>
          ))
        ) : (
          <p>No purchase history found.</p>
        )}
      </div>
    </>
  );
}

export default BookHistory;
