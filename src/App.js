import Navbar from "./component/Navbar";
import Album from "./component/Album";
import Photos from './component/Photos';
import { db } from "./FirebaseInit";
import {  useState } from 'react';
import { collection, onSnapshot } from 'firebase/firestore';
import { useCollectionData } from "react-firebase-hooks/firestore";
import * as React from 'react';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import Button from '@mui/material/Button';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  const [visible, setVisible] = useState(false);
  const [photoId, setPhotoId] = useState({ id: "" });
  const [albumName , setAlbumName] = useState({name : ""});
  const query = collection(db, "albums");
  const [docs,loader,error] = useCollectionData(query);
  // Rest of your code...

  return (
    <div className="App">
      <Navbar />
      {loader && <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open>
        <CircularProgress color="inherit" />
      </Backdrop>}
      
      {!visible ? <Album props={setVisible} setPhotoId={setPhotoId} setAlbumName={setAlbumName} /> : <Photos path={photoId.id}  albumName={albumName.name} setVisible={setVisible}/>}
      <ToastContainer
         position="top-right"
         autoClose={5000}
         hideProgressBar={false}
         newestOnTop={false}
         closeOnClick
         rtl={false}
         pauseOnFocusLoss
         draggable
         pauseOnHover
         theme="light"
      />
    </div>
  );
  
}

export default App;
