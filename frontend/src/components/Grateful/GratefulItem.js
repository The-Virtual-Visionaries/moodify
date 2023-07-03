import React from 'react'
import { useState } from 'react'
import '../../styles/Grateful/GratefulItem.css'

function GratefulItem() {
    const [gratefulItems, setGratefulItems] = useState([]);

    const handleKeyPress = (event) => {
      if (event.key === 'Enter') {
        const value = event.target.value.trim();
        if (value !== '') {
          const newItem = {
            id: Date.now(),
            text: value,
          };
          setGratefulItems((prevItems) => [...prevItems, newItem]);
          event.target.value = ''; 
        }
      }
    };

    return (
        <div className='Grateful-Item'>
            <input 
                className="form-control form-control-lg add-item" 
                type="text" 
                placeholder="Add something you are grateful for..." 
                aria-label=".form-control-lg example"
                onKeyDown={handleKeyPress}></input>
            <div>
                {gratefulItems.map((item) => (
                    <div key={item.id} className='grateful-item'>{item.text}</div>
                ))}
            </div>
        </div>
    )
}

export default GratefulItem