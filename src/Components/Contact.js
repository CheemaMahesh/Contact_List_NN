import React, { useState } from "react";
import styles from "./Contacts.module.css"; 
import { useValue } from "../ContactContext";

export default function Contact() {
  const { albums, updateAlbum,removeAlbum } = useValue();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [editingAlbumId, setEditingAlbumId] = useState(null);
  const [isFormVisible, setIsFormVisible] = useState(false);
 


  // ================Form visibility setup
  const handleUpdateClick = (albumId) => {
    setEditingAlbumId(albumId);
    setIsFormVisible(true);
  };

  // ========================Handle form submission
  const handleSubmit = (e, album) => {
    e.preventDefault();
    updateAlbum(name, email, album.id);
    setName("");
    setEmail("");
    setEditingAlbumId(null);
    setIsFormVisible(false);
  };

  return (
    <div className={styles.Album}>
      <div className={styles.empty}></div>
      <div className={styles.albumContainer}>
        {albums.map((album) => (
          <div key={album.id} className={styles.album}>
            <div className={styles.titles}>
              <div className={styles.title}>{album.name}</div>
              <div className={styles.ids}>
                <span>Email: {album.email}</span>
                <span>website: {album.website}</span>
                <span>Phone: {album.phone}</span>
              </div>
            </div>
            <div className={styles.btns}>
              <button
                className={styles.update}
                onClick={() => handleUpdateClick(album.id)}
              >
                Update
              </button>
              <button
                className={styles.delete}
                onClick={() => removeAlbum(album.id)}
              >
                Delete
              </button>
            </div>
            {editingAlbumId === album.id && isFormVisible && (
              <div className={styles.formPopup}>
                <form onSubmit={(e) => handleSubmit(e, album)}>
                  <input
                    className={styles.titleInp}
                    placeholder="Name"
                    onChange={(e) => setName(e.target.value)}
                    value={name}
                    required
                  />
                  <input
                    className={styles.AlbumId}
                    placeholder="Email"
                    type="email"
                    onChange={(e) => setEmail(e.target.value)}
                    value={email}
                    required
                  />
                  <button className={styles.submit}>Submit</button>
                </form>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
