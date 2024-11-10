// import logo from './logo.svg';
// import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from './components/Home';
import Signup from './components/Signup';
import Login from './components/Login';
// import './components/Css/LoginandSignup.css'
// import './components/admin/admin.css'
import PassChange from './components/PassChange';
import Admin from './components/admin/admin';
import Addbook from "./components/admin/addbook";
import Viewuser from "./components/admin/viewuser";
import Allowuser from "./components/admin/allowuser";
// import Deletebook from "./components/admin/deletebook";
import Editbook from "./components/admin/editbook";
import Bookdetails from "./components/admin/bookdetails";
import Allowusers from "./components/admin/allowusers";
import Denyuser from "./components/admin/denyuser";
import UpdateProfile from "./components/UpdateProfile";
import RentBook from "./components/RentBook";
import LostBook from "./components/LostBookReport";
import Cart from "./components/Cart";
import Transaction from "./components/Transaction";
import BookHistory from "./components/admin/BookHistory";
import RentHistory from "./components/RentHistory";
import LostBookReport from "./components/LostBookReport";
import RentalHistory from "./components/admin/RentalHistory";
import Loading from "./components/Loading";
import RentalList from "./components/admin/RentalList";
import Editdeletebook from "./components/admin/editdeletebook";


function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path='/admin' element={<Admin/>} />
          <Route path='/addbook' element={<Addbook/>} />
          <Route path='/viewuser' element={<Viewuser/>} />
          <Route path='/allowuser' element={<Allowuser/>} />
          <Route path='/denyuser' element={<Denyuser/>} />
          <Route path='/allowusers/:id' element={<Allowusers/>} />
          <Route path='/editdeletebook' element={<Editdeletebook/>} />
          <Route path='/bookdetails' element={<Bookdetails/>} />
          <Route path='/editbook/:id' element={<Editbook/>} />
          <Route path='/home' element={<Home/>} />
          <Route path='/signup' element={<Signup/>} />
          <Route path='/' element={<Login/>} />
          <Route path='/passchange' element={<PassChange/>} />
          <Route path='/updateprofile' element={<UpdateProfile/>} />
          <Route path='/rentbook' element={<RentBook/>} />
          <Route path='/lostbook' element={<LostBook/>} />
          <Route path='/cart' element={<Cart/>} />
          <Route path='/transaction' element={<Transaction/>} />
          <Route path='/bookhistory' element={<BookHistory/>} />
          <Route path='/renthistory' element={<RentHistory/>} />
          <Route path='/lostbookreport' element={<LostBookReport/>} />
          <Route path='/adminrentalhistory' element={<RentalHistory/>} />
          <Route path='/loading' element={<Loading/>} />
          <Route path='/rentallist' element={<RentalList/>} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
