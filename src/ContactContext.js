import React, { createContext, useContext, useEffect, useState } from "react";

const ContactsContext = createContext();

const useValue = () => {
  const value = useContext(ContactsContext);
  return value;
};

const simulateApiCall = (method, url, data, callback) => {
  setTimeout(() => {
    fetch(url, {
      method: method,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then(callback)
      .catch((error) => console.error(`Error in ${method} request:`, error));
  }, 1000); 
};

const ContactContext = ({ children }) => {
  const [albums, setAlbums] = useState([]);

  // ========================Fetch data from the API and update the state
  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((response) => response.json())
      .then((data) => {
        setAlbums(data);
      })
      .catch((error) => {
        console.error("Error fetching albums:", error);
      });
  }, []);

  // ====================================Remove an Album
  function removeAlbum(id) {
  //======================================Dummy api call===================================================
    simulateApiCall('DELETE', `https://jsonplaceholder.typicode.com/users/${id}`, null, () => {
      // setAlbums((prevAlbums) => prevAlbums.filter((album) => album.id !== id));
      // alert("Album Removed from the List");
    });
    setAlbums((prevAlbums) => prevAlbums.filter((album) => album.id !== id));
    alert("Album Removed from the List");

  }

  // ===================================Add a new Album
  function addNewAlbum(name, email, id, phone) {
    const newAlbum = {
      email,
      name,
      id,
      phone,
    };


    //======================================Dummy api call===================================================
    simulateApiCall('POST', 'https://jsonplaceholder.typicode.com/users', newAlbum, () => {
      //  setAlbums((prevAlbums) =>
      //   prevAlbums.map((album) => (album.id === id ? { ...album, name, email } : album))
      // );
      // alert("UPDATED SUCCESSFULLY");
    });

    setAlbums((prevAlbums) => [...prevAlbums, newAlbum]);
      alert("New Album Added to the list");
  }

  // ==============================================Update the albums
  function updateAlbum(name, email, id) {
    const updatedAlbum = {
      email,
      name,
      id,
    };

  //======================================Dummy api call===================================================
    simulateApiCall('PUT', `https://jsonplaceholder.typicode.com/users/${id}`, updatedAlbum, () => {
  //     setAlbums((prevAlbums) =>
  //   prevAlbums.map((album) => (album.id === id ? { ...album, name, email } : album))
  // );
  // alert("UPDATED SUCCESSFULLY");
    });
    setAlbums((prevAlbums) =>
    prevAlbums.map((album) => (album.id === id ? { ...album, name, email } : album))
  );
  alert("UPDATED SUCCESSFULLY");
  }

  return (
    <ContactsContext.Provider
      value={{
        albums,
        removeAlbum,
        addNewAlbum,
        updateAlbum,
      }}
    >
      {children}
    </ContactsContext.Provider>
  );
};

export { useValue };
export default ContactContext;
