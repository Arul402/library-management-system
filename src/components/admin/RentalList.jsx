import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Navbar from '../Navbar';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function RentalList() {
  const [rentals, setRentals] = useState([]);
  const token = sessionStorage.getItem('admin_token');

  useEffect(() => {
    async function fetchRentals() {
      try {
        const response = await axios.get('http://127.0.0.1:8000/api/v1/app/rental-history/', {
          headers: {
            "Content-Type": "application/json",
            'Authorization': `Token ${token}`,
          },
        });
        setRentals(response.data);
        console.log(response.data)
      } catch (error) {
        console.error(error);
      }
    }
    fetchRentals();
  }, [token]);

  async function markAsReturned(rentalId) {
    try {
      const response = await axios.put(`http://127.0.0.1:8000/api/v1/app/return-book/${rentalId}`, {
        returned: true,
      }, {
        headers: {
          'Authorization': `Token ${token}`,
        },
      });

      if (response.status === 200) {
        toast.success('Book marked as returned');
        // Update rental list after marking as returned
        setRentals(rentals.map(r => r.id === rentalId ? { ...r, returned: true } : r));
        console.log(rentals)
      }
    } catch (error) {
      toast.error('Error marking book as returned');
      console.error(error);
    }
  }

  return (
    <>
      <ToastContainer />
      <div></div><br />
      <div></div><br />
      <Navbar />
      <div className='container'>
        {rentals.map((rental) => (
          <div className="product-card" key={rental.id}>
            <div className="product-details">
              <span className="product-catagory">
                <h3>User: {rental.username}</h3>
              </span>
              <span className="product-catagory">
                Book: {rental.book_name}
              </span>
              <h4>
                Rental Date: {new Date(rental.rental_date).toLocaleDateString()}
              </h4>
              <p>
                Due Date: {new Date(rental.due_date).toLocaleDateString()}
              </p>
              <p>
                Status: {rental.returned ? "Returned" : "Not Returned"}
              </p>
              <div className="product-bottom-details">
                <div className="product-price">
                  {/* Optional: You could add fine details if needed */}
                </div>
                <div>
                  {!rental.returned && (
                    <button type='submit' className='btn2'
                      onClick={() => markAsReturned(rental.id)}
                    >
                      Mark as Returned
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

export default RentalList;
