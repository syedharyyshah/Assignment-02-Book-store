import React, { useState, useEffect } from 'react';
import Sidebar from './sidebar/Sidebar';
import axios from 'axios';

export default function Cards() {
  const [cardsData, setCardsData] = useState([]);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: 'All books', // Set default category
    price: 0,
    salePrice: 0,
    image: null,
    favorite: false,
    sold: 0,
  });
  const [editMode, setEditMode] = useState(false);
  const [selectedCardId, setSelectedCardId] = useState(null);

  const handleInputChange = (e) => {
    if (e.target.name === 'image') {
      setFormData({
        ...formData,
        [e.target.name]: e.target.files[0],
      });
    } else {
      setFormData({
        ...formData,
        [e.target.name]: e.target.value,
      });
    }
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    try {
      const postData = new FormData();
      postData.append('title', formData.title);
      postData.append('description', formData.description);
      postData.append('category', formData.category);
      postData.append('price', formData.price);
      postData.append('salePrice', formData.salePrice);
      postData.append('image', formData.image);

      // Check if in edit mode, then update the existing card
      if (editMode) {
        const response = await axios.patch(
          `https://mrbookupdated.onrender.com/sale-cardupdate/${selectedCardId}`,
          postData,
          {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          }
        );
        console.log('Update Response:', response.data);
      } else {
        // If not in edit mode, add a new card
        const response = await axios.post(
          'https://mrbookupdated.onrender.com/api/salecard',
          postData,
          {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          }
        );
        console.log('Response:', response.data);
      }

      // Reset the form and edit mode after successful submission
      setFormData({
        title: '',
        description: '',
        category: 'All books',
        price: 0,
        salePrice: 0,
        image: null,
        favorite: false,
        sold: 0,
      });
      setEditMode(false);

      // Fetch data again after successful submission or update
      fetchData();
    } catch (error) {
      console.error('Error:', error);

      if (error.response) {
        console.error('Response Data:', error.response.data);
        console.error('Response Status:', error.response.status);
      }

      alert('An error occurred. Please check the console for details.');
    }
  };

  const fetchData = async () => {
    try {
      const response = await axios.get('https://mrbookupdated.onrender.com/api/getSaleCard');
      setCardsData(response.data.data);
    } catch (error) {
      console.error('Error fetching data:', error);
      // Handle error if needed
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleDelete = async (cardId) => {
    try {
      const response = await axios.delete(
        `https://mrbookupdated.onrender.com/card-delete/${cardId}`
      );
      console.log('Delete Response:', response.data);

      // Fetch data again after successful deletion
      fetchData();
    } catch (error) {
      console.error('Delete Error:', error);

      if (error.response && error.response.data && error.response.data.error) {
        alert(error.response.data.message || 'Error in deleting card data');
      } else {
        alert('Network error. Please try again.');
      }
    }
  };

  const handleUpdate = (cardId) => {
    // Set edit mode to true, and store the selected card ID
    setEditMode(true);
    setSelectedCardId(cardId);
  
    // Find the selected card in the cardsData array and set the form data
    const selectedCard = cardsData.find((card) => card._id === cardId);
    if (selectedCard) {
      setFormData({
        title: selectedCard.title,
        description: selectedCard.description,
        category: selectedCard.category,
        price: selectedCard.price,
        salePrice: selectedCard.salePrice,
        image: null, // You may want to handle images differently based on your requirements
        favorite: selectedCard.favorite,
        sold: selectedCard.sold,
      });
    }
  };

    
  return (
    <div className='flex'>
      <Sidebar />
      <div className='w-full mx-auto bg-slate-100 rounded overflow-hidden shadow-lg'>
        <div className='px-6 py-4'>
          <form onSubmit={handleFormSubmit}>
            <div>
              <label className='block text-gray-700 text-sm font-bold mt-2 mb-2'>
                Title:
              </label>
              <input
                type='text'
                name='title'
                onChange={handleInputChange}
                value={formData.title}

                className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
              />
            </div>

            <div>
              <label className='block text-gray-700 text-sm font-bold mt-2 mb-2'>
                Description:
              </label>
              <textarea
                name='description'
                onChange={handleInputChange}
                value={formData.description}
                className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
              ></textarea>
            </div>

            <div>
              <label className='block text-gray-700 text-sm font-bold mt-2 mb-2'>
                Category:
              </label>
              <select
                name='category'
                onChange={handleInputChange}
                value={formData.category}
                className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
              >
                {['English books', 'Urdu books', 'Noval books', 'Seasonal books', 'All books'].map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className='block text-gray-700 text-sm font-bold mt-2 mb-2'>
                Price:
              </label>
              <input
                type='number'
                name='price'
                onChange={handleInputChange}
                value={formData.price}
                
                className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
              />
            </div>
            <div>
              <label className='block text-gray-700 text-sm font-bold mt-2 mb-2'>
                Sale Price:
              </label>
              <input
                type='number'
                name='salePrice'
                onChange={handleInputChange}
                value={formData.salePrice}
                className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
              />
            </div>

            <div>
            <label htmlFor='image' className='text-lg text-gray-700 block'>
          Upload Image
        </label>
        <input
          type='file'
          id='image'
          name='image'
          className='border rounded-md p-2 w-full'
          onChange={handleInputChange}
        />
            </div>

            <button
              type='submit'
              className='bg-blue-500 text-white py-2 px-4 mt-4 rounded hover:bg-blue-700 focus:outline-none focus:shadow-outline'
            >
              {editMode ? 'Update' : 'Submit'}
            </button>

          </form>
        </div>
        <div className="container mx-auto p-4">
        <table className='min-w-full bg-white border border-gray-300'>
          <thead>
            <tr>
              <th className='py-2 px-4 border'>Title</th>
              <th className='py-2 px-4 border'>Description</th>
              <th className='py-2 px-4 border'>Category</th>
              <th className='py-2 px-4 border'>Price</th>
              <th className='py-2 px-4 border'>Sale Price</th>
              <th className='py-2 px-4 border'>Image</th>
              <th className='py-2 px-4 border'>Actions</th>
            </tr>
          </thead>
          <tbody>
            {cardsData.map((card) => (
              <tr key={card._id} className='bg-gray-100'>
                <td className='py-2 px-4 border text-center'>{card.title}</td>
                <td className='py-2 px-4 border text-center'>{card.description}</td>
                <td className='py-2 px-4 border text-center'>{card.category}</td>
                <td className='py-2 px-4 border text-center'>{`$${card.price}`}</td>
                <td className='py-2 px-4 border text-center'>{`$${card.salePrice}`}</td>
                <td className='py-2 px-4 border'>
                  <div className='flex justify-center items-center'>
                    <img src={card.url} className='w-[40px] h-[30px]' alt={card.title} />
                  </div>
                </td>
                <td className='py-2 px-4 border'>
                  <div className='flex justify-center items-center'>
                  <button
                        onClick={() => handleUpdate(card._id)}
                        className='bg-blue-500 text-white py-1 px-4 rounded hover:bg-blue-700 focus:outline-none focus:shadow-outline'
                      >
                        Update
                      </button>
                      <button
                        onClick={() => handleDelete(card._id)}
                        className='bg-red-700 text-white px-4 py-2 rounded-md hover:bg-red-400 ml-2'
                      >
                        Delete
                      </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        </div>
      </div>

    </div>
  )
}

