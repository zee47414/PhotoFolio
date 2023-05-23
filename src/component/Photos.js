import CreatePhotos from "./CreatePhotos"
import Album from "./Album";
import {useState,useEffect} from 'react';
import { db } from "../FirebaseInit";
import {collection ,onSnapshot ,doc, deleteDoc} from 'firebase/firestore'
import { useCollectionData } from "react-firebase-hooks/firestore";
import * as React from 'react';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


export default function Photos(path,albumName ,setVisible){
    const [back,setBack] = useState(true);
    const [form,setForm] = useState("add");
    const [photos ,setPhotos] = useState([]);
    const [selectedPhoto, setSelectedPhoto] = useState(null); // New state variable
    const query = collection(db,`albums/${path.path}/photos`);
    const [docs,loader,error] = useCollectionData(query);
    const [imgFullScn,setImgFullScn] = useState(false);
    useEffect(()=>{
      const unsub =  onSnapshot(collection(db,`albums/${path.path}/photos`),(snapShot)=>{
            const photos = snapShot.docs.map((doc) => {
                        return{
                            id: doc.id,
                            ...doc.data()
                        }
                    })                 
                    setPhotos(photos);                 
        })        
    },[]);

 async function handleDelete(event, id){
        event.stopPropagation();
        await deleteDoc(doc(db,`albums/${path.path}/photos`,id));
        toast.info(' Image Deleted!', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        });
    }
    
    // New function to handle photo selection
    function handlePhotoSelection(photo) {
        setSelectedPhoto(photo);
    }

    return (
        <>
        
        {form === 'add' ?  "" :<CreatePhotos path = {path.path} /> }
        <div className="photos">
            <div className="header-photo">
                <div className="header-photos-left">
                <button className="photos-back-div" onClick={()=>{
                    path.setVisible(false);
                }} >
                <img alt="back-button" className="photos-back-btn" src="https://cdn-icons-png.flaticon.com/512/2099/2099238.png" />
                </button>
                 <h1>Image in {path.albumName}</h1>
                </div>
                <button className={form === "add" ? "add-btn-photos":"cnl-btn-photos"}
                onClick={()=>{
                    setForm(form === "add" ? "cancel":"add")
                }}
                >{form === "add" ? "Add Photo" : "Cancel"}</button>
            </div>
            {loader && <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open>
        <CircularProgress color="inherit" />
      </Backdrop>}
        <div className="photo-conatainer">
                {photos.map((photo)=>{
                return (
                    <>
                   
                      <div className="photo-list" onClick={() => handlePhotoSelection(photo)}> {/* Added onClick handler */}
                        <div className="each-photo" >
                          <img src={photo.url} alt="photos in album" className="photo"/>
                        </div>   
                       </div>
                    <div className="delete-container">
                        <div className="delete-div">  <img onClick={(e) => handleDelete(e, photo.id)} src="https://cdn-icons-png.flaticon.com/128/3096/3096673.png" className="delete-img"/> </div> 
                        
                    </div>
                      <div className="photo-title">{photo.title}</div>
                  
                 </>
                )
                })}
         </div> 
        </div>
        
       {/* Overlay component to show the selected photo in full screen mode */}
       {selectedPhoto && (
                <div className="fullscreen-overlay" onClick={() => setSelectedPhoto(null)}>
                    <img src={selectedPhoto.url} alt="selected photo" className="fullscreen-photo" style={{ backgroundImage: `url(${selectedPhoto.url})` }} />
                    <span className="close-button" onClick={() => setSelectedPhoto(null)}>X</span>
                </div>
            )}
        </>
     );
}