import axios from "axios";
import React, { useEffect, useState } from "react";
import RentNavbar from "./RentNavbar";

function LostBookReport() {
  const token = sessionStorage.getItem("user_token");
  const [history, setHistory] = useState([]);
  const [cont, setCont] = useState();
  const [reportedBooks, setReportedBooks] = useState({});

  // const [report, setReport] = useState(false);
  // const [report2, setReport2] = useState(false);

  async function handlelostbook(id) {
    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/api/v1/app/lost-reports/",
        {
          rental: id,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Token ${token}`,
          },
        }
      );
      if (response.status === 200) {
        console.log("Repoarted Success");
        alert("Repoarted Success");
        setReportedBooks((prevState) => ({
          ...prevState,
          [id]: true, // Set this specific book as reported
        }));
        
      }
       
    } catch (error) {
      console.log(error);
      console.log("error");
      if(error.status===500){
        alert("Book Already Reported")
    }
    }
  }

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get(
          "http://127.0.0.1:8000/api/v1/app/rentals/",
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Token ${token}`,
            },
          }
        );
        // console.log(response)
        if (response.status === 200) {
          setHistory(response.data);
          console.log(response.data);
          console.log("first");
        }
        
      } catch (error) {
        console.error(error);
      }
      setCont("");
    }
    fetchData();
  }, []);

  return (
    <>
      <div></div>
      <br />
      <div></div>
      <br />
      <RentNavbar />

      <div className="container">
        {/* <div>RentHistory</div> */}
        {history.map((item) => (
          <div key={item.id} className="product-card">
            {/* <div className="product-tumb">
                  <img src={item.book.image} alt={item.book.book_name} />
                </div> */}
            <div className="product-details">
              <span className="product-catagory">
                <h3>Book Name: {item.book_name}</h3>
              </span>
              <h4>Book ID: {item.id}</h4>
              <p>Created Date: {new Date(item.rental_date).toLocaleDateString()}</p>
              <p>Rental Date: {new Date(item.due_date).toLocaleDateString()}</p>
              <div className="product-bottom-details">
                {/* <div className="product-price">₹{item.book.price}</div> */}
                <div>
                  {reportedBooks[item.id] ? (
                    <h3>Book Reported</h3>
                  ) : (
                    <button
                      type="submit"
                      className="btn2"
                      onClick={() => handlelostbook(item.id)}
                    >
                      Report Lost Book
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

export default LostBookReport;
