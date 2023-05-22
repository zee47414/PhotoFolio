import Navbar from "./component/Navbar";
import Album from "./component/Album";
import Photos from './component/Photos';
import { db } from "./FirebaseInit";
import { useEffect, useState } from 'react';
import { collection, onSnapshot } from 'firebase/firestore';
import { useCollectionData } from "react-firebase-hooks/firestore";

function App() {
  const [visible, setVisible] = useState(false);
  const [photoId, setPhotoId] = useState({ id: "" });
  const [albumName , setAlbumName] = useState("");
  // Rest of your code...

  return (
    <div className="App">
      <Navbar />
      {!visible ? <Album props={setVisible} setPhotoId={setPhotoId} setAlbumName={setAlbumName} /> : <Photos path={photoId.id}  albumName={albumName}/>}
    </div>
  );
}

export default App;
