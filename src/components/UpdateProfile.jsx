// import axios from 'axios';
// import React, { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { ToastContainer, toast, Zoom } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';

// function UpdateProfile() {
//   const [first_name, setFirstName] = useState('');
//   const [last_name, setLastName] = useState('');
//   const [photo, setPhoto] = useState(null);
//   const [preview, setPreview] = useState(null);
//   const navigate = useNavigate();
//   const token = sessionStorage.getItem('user_token');

//   useEffect(() => {
//     // Fetch the existing profile data when the component loads
//     async function fetchProfile() {
//       try {
//         const response = await axios.get('http://127.0.0.1:8000/api/v1/app/profile/update/', {
//           headers: {
//             'Authorization': `Token ${token}`,
//           },
//         });
//         const data = response.data;
//         setFirstName(data.first_name);
//         setLastName(data.last_name);
//         if (data.photo) {
//           setPreview(data.photo);
//         }
//       } catch (error) {
//         console.error('Error fetching profile data:', error);
//         toast.error('Failed to load profile data');
//       }
//     }
//     fetchProfile();
//   }, [token]);

//   const handlePhotoChange = (e) => {
//     const file = e.target.files[0];
//     setPhoto(file);

//     // Preview the image before submitting
//     const reader = new FileReader();
//     reader.onloadend = () => {
//       setPreview(reader.result);
//     };
//     reader.readAsDataURL(file);
//   };

//   async function handleUpdateProfile() {
//     if (first_name && last_name) {
//       const formData = new FormData();
//       formData.append('first_name', first_name);
//       formData.append('last_name', last_name);
//       if (photo) {
//         formData.append('photo', photo);
//       }

//       try {
//         const response = await axios.put('http://127.0.0.1:8000/api/v1/app/profile/update/', formData, {
//           headers: {
//             'Authorization': `Token ${token}`,
//             'Content-Type': 'multipart/form-data',
//           },
//         });

//         if (response.status === 200) {
//           console.log('Profile updated successfully');
//           toast.success('Profile updated successfully');
//           navigate('/home'); // Navigate to profile details or another page
//         } else {
//           toast.error('Failed to update profile');
//         }
//       } catch (error) {
//         console.error('Error updating profile:', error);
//         toast.error('Error updating profile');
//       }
//     } else {
//       toast.error('Please fill in all fields');
//     }
//   }

//   return (
//     <>
//       <div className="body">
//         <div className="form">
//           <ToastContainer theme="colored" transition={Zoom} />
//           <h2>Update Profile</h2>
//           <div className="input">
//             <div className="inputBox">
//               <label htmlFor="">First Name</label>
//               <input
//                 type="text"
//                 value={first_name}
//                 onChange={(e) => setFirstName(e.target.value)}
//               />
//             </div>
//             <div className="inputBox">
//               <label htmlFor="">Last Name</label>
//               <input
//                 type="text"
//                 value={last_name}
//                 onChange={(e) => setLastName(e.target.value)}
//               />
//             </div>
//             <div className="inputBox">
//               <label htmlFor="">Profile Photo</label>
//               <input type="file" accept="image/*" onChange={handlePhotoChange} />
//               {preview && <img src={preview} alt="Profile Preview" width="100" />}
//             </div>
//             <div className="inputBox">
//               <input
//                 type="submit"
//                 value="Update Profile"
//                 onClick={(e) => {
//                   e.preventDefault();
//                   handleUpdateProfile();
//                 }}
//               />
//             </div>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// }

// export default UpdateProfile;




import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast, Zoom } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Loading from './Loading';

function UpdateProfile() {
  const [first_name, setFirstName] = useState('');
  const [last_name, setLastName] = useState('');
  const [phone_number, setPhoneNumber] = useState('');  // New phone number state
  const [place, setPlace] = useState('');  // New place state
  const [photo, setPhoto] = useState(null);
  const [preview, setPreview] = useState(null);
  const navigate = useNavigate();
  const token = sessionStorage.getItem('user_token');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Fetch the existing profile data when the component loads
    async function fetchProfile() {
      setLoading(true);
      try {
        const response = await axios.get('http://127.0.0.1:8000/api/v1/app/profile/update/', {
          headers: {
            'Authorization': `Token ${token}`,
          },
        });
        const data = response.data;
        setFirstName(data.first_name);
        setLastName(data.last_name);
        setPhoneNumber(data.phone_number);  // Set phone number from data
        setPlace(data.place);  // Set place from data
        if (data.photo) {
          setPreview(data.photo);
        }
        console.log(preview)
      } catch (error) {
        console.error('Error fetching profile data:', error);
        toast.error('Failed to load profile data');
      }finally {
        // Ensure loading state is set back to false after API call
        setLoading(false);
    }
    }
    fetchProfile();
  }, [token]);

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    setPhoto(file);

    // Preview the image before submitting
    const reader = new FileReader();
    reader.onloadend = () => {
      setPreview(reader.result);
    };
    reader.readAsDataURL(file);
  };

  async function handleUpdateProfile() {
    if (first_name && last_name && phone_number && place) {  // Ensure all fields are filled
      const formData = new FormData();
      formData.append('first_name', first_name);
      formData.append('last_name', last_name);
      formData.append('phone_number', phone_number);  // Append phone number
      formData.append('place', place);  // Append place
      if (photo) {
        formData.append('photo', photo);
      }
      setLoading(true);
      try {
        const response = await axios.put('http://127.0.0.1:8000/api/v1/app/profile/update/', formData, {
          headers: {
            'Authorization': `Token ${token}`,
            'Content-Type': 'multipart/form-data',
          },
        });

        if (response.status === 200) {
          console.log('Profile updated successfully');
          toast.success('Profile updated successfully');
          navigate('/home'); // Navigate to profile details or another page
        } else {
          toast.error('Failed to update profile');
        }
      } catch (error) {
        console.error('Error updating profile:', error);
        toast.error('Error updating profile');
      }finally {
        // Ensure loading state is set back to false after API call
        setLoading(false);
    }
    } else {
      toast.error('Please fill in all fields');
    }
  }

  return (
    <>
    <ToastContainer theme="colored" transition={Zoom} />
    {loading ?  (
                    <Loading/>
                ):
      <div className="body">
        <div className="form">
          {/* <ToastContainer theme="colored" transition={Zoom} /> */}
          <h2>Update Profile</h2>
          <div className="input">
            <div className="inputBox">
              <label htmlFor="">First Name</label>
              <input
                type="text"
                value={first_name}
                onChange={(e) => setFirstName(e.target.value)}
              />
            </div>
            <div className="inputBox">
              <label htmlFor="">Last Name</label>
              <input
                type="text"
                value={last_name}
                onChange={(e) => setLastName(e.target.value)}
              />
            </div>
            <div className="inputBox">
              <label htmlFor="">Phone Number</label>
              <input
                type="text"
                value={phone_number}
                onChange={(e) => setPhoneNumber(e.target.value)}
              />
            </div>
            <div className="inputBox">
              <label htmlFor="">Place</label>
              <input
                type="text"
                value={place}
                onChange={(e) => setPlace(e.target.value)}
              />
            </div>
            <div className="inputBox">
              <label htmlFor="">Profile Photo</label>
              <input type="file"  onChange={handlePhotoChange} />
              {preview && <img src={preview} alt="Profile Preview" width="100" />}
            </div>
            <div className="inputBox">
              <input
                type="submit"
                value="Update Profile"
                onClick={(e) => {
                  e.preventDefault();
                  handleUpdateProfile();
                }}
              />
            </div>
          </div>
        </div>
      </div>
}
    </>
  );
}

export default UpdateProfile;
