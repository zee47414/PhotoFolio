import { db } from '../FirebaseInit';
import { useState, useRef } from 'react';
import { collection, doc, setDoc } from 'firebase/firestore';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function CreatePhotos(path) {
  
  const name = useRef();
  const [formData, setFormData] = useState({ title: "", url: "" });
  
  async function handleSubmit(e) {
    e.preventDefault();
    const docRef = doc(db,`albums/${path.path}/photos`,name.current.value);
    await setDoc(docRef,{
      title : formData.title,
      url : formData.url
    });
    toast.success('Added Image to Album!', {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      });
    setFormData({title : "",url: ""});
  }

  function handleClear() {
    setFormData({ title: "", url: "" });
  }

  return (
    <>
      <form className='photos-form' onSubmit={handleSubmit}>
        <h2>Add photos to title</h2>
        <div className='photos-input'>
          <input
            type='text'
            ref={name}
            placeholder='Title'
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            className='photos-title-url'
            required
          />
          <input
            type='text'
            placeholder='Image URL'
            onChange={(e) => setFormData({ ...formData, url: e.target.value })}
            className='photos-title-url'
            value={formData.url}
            required
          />
        </div>
        <div className='photos-btn'>
          <button onClick={handleClear} className='photos-clr-btn'>
            Clear
          </button>
          <button className='photos-add-btn'>Add</button>
        </div>
      </form>
    </>
  );
}
