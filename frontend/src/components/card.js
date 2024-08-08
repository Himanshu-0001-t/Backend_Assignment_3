import React, { useEffect, useState } from 'react'
import { FaRegHeart } from "react-icons/fa";
import { FaHeart } from "react-icons/fa";
import { CiEdit } from "react-icons/ci";
import { MdDelete } from "react-icons/md";
import axios from "axios"

function Card() {
    const [userData, setUserData] = useState([])
    const [isOpen, setIsOpen] = useState(false);
    const [id, setId] = useState(null)

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        web: '',
    });

    const openModal = (user) => {
        setId(user._id)
        setFormData({
            name: user.name,
            email: user.email,
            phone: user.phone,
            web: user.web,
        })
        setIsOpen(true)
    }

    const closeModal = () => setIsOpen(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const submitForm = async () => {
        let response = await axios.patch(`http://localhost:5000/api/user/${id}`, formData)

        if (response.data.status === "success") {
            getUsers()
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        submitForm()
        closeModal();
    };

    const getUsers = async () => {
        let response = await axios.get("http://localhost:5000/api/user")

        if (response.data.status === "success") {
            setUserData(response.data.data)
        }
    }

    let toggle = async (index) => {
        let response = await axios.post("http://localhost:5000/api/user/toggle", { id: userData[index]._id, like: !userData[index].liked })

        if (response.data.status === "success") {
            getUsers()
        }
    }

    let deleteUser = async (id) => {
        let response = await axios.delete(`http://localhost:5000/api/user/${id}`,)

        if (response.data.status === "success") {
            getUsers()
        }

    }

    const avatars = [
        "https://api.dicebear.com/9.x/adventurer/svg?seed=Casper",
        "https://api.dicebear.com/9.x/adventurer/svg?seed=Charlie",
        "https://api.dicebear.com/9.x/adventurer/svg?seed=Bailey",
        "https://api.dicebear.com/9.x/adventurer/svg?seed=Baby",
        "https://api.dicebear.com/9.x/adventurer/svg?seed=Chester",
        "https://api.dicebear.com/9.x/adventurer/svg?seed=Whiskers",
        "https://api.dicebear.com/9.x/adventurer/svg?seed=Princess",
        "https://api.dicebear.com/9.x/adventurer/svg?seed=Midnight",
        "https://api.dicebear.com/9.x/adventurer/svg?seed=Molly",
        "https://api.dicebear.com/9.x/adventurer/svg?seed=Bandit",
        "https://api.dicebear.com/9.x/adventurer/svg?seed=Boo",
        "https://api.dicebear.com/9.x/adventurer/svg?seed=Toby"
    ]

    useEffect(() => {
        getUsers()

    }, [])


    return (
        <>
            {userData?.map((user, index) => {
                return (
                    <div key={user.name} className='flex flex-col min-h-52 md:max-w-md w-full'>
                        <div className='h-44 border-2 bg-gray-100 flex items-center justify-center'>
                            <img className='h-full' src={avatars[index]} alt="avatar" />
                        </div>
                        <div className='border-2 flex flex-col justify-around p-5  gap-1'>
                            <h1 className='font-bold'>{user.name}</h1>
                            <h3>{user.email}</h3>
                            <h3>{user.phone}</h3>
                            <h3>{`http://${user.web}.com`}</h3>
                        </div>

                        <div className='h-14 bg-gray-200 border-2 flex items-center justify-around' >
                            <button className=' text-2xl' onClick={() => toggle(index)}>{user.liked ? <FaHeart color='red' /> : <FaRegHeart color='red' />}</button>
                            <button className='text-2xl' onClick={() => openModal(user)}> <CiEdit /></button>
                            <button className='text-2xl' onClick={() => deleteUser(user._id)}><MdDelete /></button>
                        </div>
                    </div >

                )
            })}

            {isOpen && <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full">
                <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
                    <form onSubmit={handleSubmit}>
                        <h2 className="text-xl font-bold mb-4">Update details</h2>
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">Name</label>
                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">Email</label>
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="phone">Phone</label>
                            <input
                                type="tel"
                                name="phone"
                                value={formData.phone}
                                onChange={handleChange}
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="web">Website</label>
                            <input
                                type="text"
                                name="web"
                                value={formData.web}
                                onChange={handleChange}
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            />
                        </div>
                        <div className="flex items-center justify-between">
                            <button
                                type="button"
                                onClick={closeModal}
                                className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                            >
                                Save
                            </button>
                        </div>
                    </form>
                </div>
            </div>
            }


        </>

    )
}

export default Card