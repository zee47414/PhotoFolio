import CreateAlbum from "./CreateAlbum";
import { useEffect, useState } from "react";
import {useCollectionData} from 'react-firebase-hooks/firestore'
import {db} from "../FirebaseInit"
import {collection,doc,onSnapshot} from "firebase/firestore";

export default function Album({props,setPhotoId,setAlbumName}){
    const [albums,setAlbums] = useState([]);
    const [form,setForm] = useState('add');
    albums.map((album)=>{
      console.log(album.name);
    })


    useEffect(()=>{
        onSnapshot(collection(db,"albums"),(snapShot)=>{
            const albums = snapShot.docs.map((doc) => {
                        return{
                            id: doc.id,
                            ...doc.data()
                        }
                    })
              
                    
                    setAlbums(albums);
                 
        })
},[])



   function handlePhotos(id,name){
    props("true");
      setPhotoId({id : id});
      setAlbumName(name);
      console.log(name);
  }
    return (
        <>
        
         {form === 'add' ? "" : <CreateAlbum />}
        <div className="albums">
          <div className="header-album">
            <h2>Your Album</h2>
            <button className={form === 'add' ? "add-btn-album" : "cnl-btn-album"} onClick={() => {
                setForm(form === 'add' ? 'cancel': 'add');
            }}>{form === 'add' ? "Add album" : "Cancel"}</button>

          </div>
          
          <div className="album-container">
            {albums.map((album)=>{
         return (
          <div className="album-list" key={Math.random()} onClick={()=>handlePhotos(album.id,album.name)}>
            <div className="each-album"> 
                <img alt="album-icon" className="album-icon" src="https://cdn-icons-png.flaticon.com/128/1339/1339246.png" />   
                <div className="album-title">{album.name}</div> 
             </div>
            </div>
             )
             })}
            </div>
          </div> 
        
        
        </>
    )
}