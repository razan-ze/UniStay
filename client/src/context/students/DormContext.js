import { createContext,useContext } from "react";
import { useState } from "react";

export const DormContext = createContext();


export const DormProviders= ({ children })=>{
 
  const [selectedDorm, setSelectedDorm] = useState(null);
  const [favorites, setFavorites] = useState([]);

   const toggleFavorite = (dorm) => {
    if (favorites.some((f) => f.id === dorm.id)) {
      setFavorites(favorites.filter((f) => f.id !== dorm.id));
    } else {
      setFavorites([...favorites, dorm]);
    }
  };
return(
 <DormContext.Provider value={{ selectedDorm, setSelectedDorm, favorites, toggleFavorite }}>
      {children}
    </DormContext.Provider>

);
};
export const useDormsStudents = () => useContext(DormContext);