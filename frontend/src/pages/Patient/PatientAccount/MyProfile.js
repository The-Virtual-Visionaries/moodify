import React, { useState } from 'react'
import Navbar from '../../../components/Navbar'
import SidePage from '../../../components/Account/SidePage'
import AccountButton from '../../../components/Account/AccountButton'
import '../../../styles/Account/MyProfile.css'

function MyProfile() {

  const [selectedImage, setSelectedImage] = useState(null);

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = () => {
      setSelectedImage(reader.result);
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  };

  
  return (
    <div className='MyProfile'>
        <Navbar/>
        <div className='my-profile'>
          <SidePage/>
          <div className='InputFields'>
            <h1>
                Account Settings
            </h1>
            <div>
              <div className='image-container'>
                <input type="file" id="image-input" accept="image/*" onChange={handleImageChange} />
                {selectedImage 
                  ? (<img src={selectedImage} alt="Selected Image" />) 
                  : (<label htmlFor="image-input">Choose Image</label>)}
              </div>
              <div className='edit-button'><AccountButton text='Edit Information'/></div>
            </div>
            <div>
                <div className='input-field'>
                    <div className='input-field-title'>Username</div>
                    <input 
                        class="form-control account-detail" 
                        type="text" 
                        // placeholder="Username..." 
                        aria-label=".form-control-lg example">
                    </input>
                </div>
                <div className='input-field'>
                    <div className='input-field-title'>Email</div>
                    <input 
                        class="form-control account-detail" 
                        type="text" 
                        placeholder="" 
                        aria-label=".form-control-lg example">
                    </input>
                </div>
                <div className='input-field'>
                    <div className='input-field-title'>Mobile number</div>
                    <input 
                        class="form-control account-detail" 
                        type="text" 
                        // placeholder="Mobile number..." 
                        aria-label=".form-control-lg example">
                    </input>
                </div>
            </div>
          </div>
        </div>
    </div>
  )
}

export default MyProfile