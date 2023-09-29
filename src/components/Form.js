import React, {useState} from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router';
import toast from 'react-hot-toast';

const Form = () => {

    const [formData, setFormData] = useState({ ID: '', 'Avatar Name': '', 'Performance Score': '' });
    const navigate = useNavigate();

    const handleCancel = () => {
        navigate('/');
      };
    
      const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
          ...formData,
          [name]: value,
        });
    };

    const handleSubmit = async () => {
        try {
            console.log(formData);
          await axios.post('https://googlesheetsapi.onrender.com/add-task', formData);
          toast.success("Data added successfully");
        } catch (error) {
          console.error('Error adding data:', error);
        }
        navigate('/');
    };
  
  return (
    <div>
        <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 z-50">
          <div className="bg-white p-4 rounded-lg shadow-lg w-2/6">
            <h2 className="text-xl font-semibold mb-4">Add Data</h2>
            <form>
              <div className="mb-4">
                <label className="block text-gray-700 font-semibold" htmlFor="ID">
                  ID:
                </label>
                <input
                  className="w-full border rounded px-3 py-2 focus:outline-none focus:border-blue-500"
                  type="number"
                  name="ID"
                  id="ID"
                  value={formData.ID}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 font-semibold" htmlFor="AvatarName">
                  Avatar Name:
                </label>
                <input
                  className="w-full border rounded px-3 py-2 focus:outline-none focus:border-blue-500"
                  type="text"
                  name="Avatar Name"
                  id="AvatarName"
                  value={formData['Avatar Name']}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 font-semibold" htmlFor="Performance">
                  Performance:
                </label>
                <input
                  className="w-full border rounded px-3 py-2 focus:outline-none focus:border-blue-500"
                  type="number"
                  name="Performance Score"
                  id="Performance"
                  value={formData['Performance Score']}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div>
                <button
                  type="button"
                  onClick={handleCancel}
                  className="px-4 py-2 bg-red-500 text-white rounded mr-2 hover:bg-red-700"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleSubmit}
                  className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
    </div>
  )
}

export default Form