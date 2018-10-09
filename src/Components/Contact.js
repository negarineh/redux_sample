import React from 'react';
import '../Components/stylesheets/css/ContactsList.css';

const Contact = ({info}) => {
  return (
    
        <tr className='info-table'>
            <td className='info-table'>
                {info.id}
            </td>
            <td className='info-table'>
                {info.name}
            </td>
        </tr>
    
  )
}

export default Contact;
