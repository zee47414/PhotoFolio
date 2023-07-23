import { db , storage} from '../FirebaseInit';
import { useState, useRef } from 'react';
import {  doc, setDoc } from 'firebase/firestore';
import {  toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { getDownloadURL, ref ,uploadBytes } from 'firebase/storage';

export default function CreatePhotos(path) {
  
  const name = useRef();
  const [formData, setFormData] = useState({ title: "", file: null });
  
  async function handleSubmit(e) {
    e.preventDefault();

    // upload file to firebase Storage
    const storageRef = await ref(storage,`${name.current.value}`);
  
    uploadBytes(storageRef, formData.file).then((snapshot) => {
      console.log('Uploaded a blob or file!');
    });

  //  get the download url of the upload file
  const downloadUrl = await getDownloadURL(storageRef);
  console.log(downloadUrl);
    const docRef = doc(db,`albums/${path.path}/photos`,name.current.value);
    await setDoc(docRef,{
      title : formData.title,
      url : downloadUrl, //use the download URL as the file URL
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
    setFormData({title : "",file: null}); //reset the form data 
  }

  function handleClear() {
    setFormData({ title: "", file: null }); //reset the form data
  }
  function handleFileChange(e){
    const file = e.target.files[0];
    setFormData({...formData,file}); //update the file state 
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
            type='file'
            accept='image/*'
            placeholder='Image'
            onChange={handleFileChange} //handle file change event
            className='photos-title-url'
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
