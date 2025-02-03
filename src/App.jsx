import axios from "axios";
import { useEffect, useState } from "react";
import UpdateItem from "./components/UpdateItem";

// use the following link to get the data
// `/doors` will give you all the doors, to get a specific door use `/doors/1`.
const API_URI = `http://${import.meta.env.VITE_API_URI}/doors`;

function App() {
  // Get the existing item from the server
  // pass the item to UpdateItem as a prop
  const [item, setItem] = useState();
  const [items, setItems] = useState([]);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await axios.get(API_URI);
        setItems(response.data);

        if (response.length > 0) {
          setItem(response.data[0]);
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchItems();
  }, []);

  return <UpdateItem item={item} items={items} setItems={setItems} />;
}

export default App;
