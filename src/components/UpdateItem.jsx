import axios from "axios";
import { useEffect } from "react";

const UpdateItem = ({ item, items, setItems }) => {
  // 1. Create a state for the form
  // 2. Create a function to handle the form submission
  // 3. Create a function to handle the form input changes

  // your code here
  const [form, setForm] = useState({
    id: "",
    name: "",
    status: "",
  });

  useEffect(() => {
    if (item) {
      setForm({
        id: item.id,
        name: item.name,
        status: item.status,
      });
    }
  }, [item]);

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const newItem = {
      id: form.id,
      name: form.name,
      status: form.status,
    };

    try {
      const response = axios.put(
        `http://${import.meta.env.VITE_API_URI}/doors/${newItem.id}`,
        newItem,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error(response.statusText);
      }

      setItems(items.map((i) => (i.id === newItem.id ? newItem : i)));
    } catch (error) {
      console.log(error);
    }
  };

  const handleFormInputChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div>
      <form onSubmit={handleFormSubmit}>
        <div>
          <label htmlFor="id">ID</label>
          <input
            type="text"
            id="id"
            name="id"
            value={form.id}
            onChange={handleFormInputChange}
          />
        </div>
        <div>
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={form.name}
            onChange={handleFormInputChange}
          />
        </div>
        <div>
          <label htmlFor="status">Status</label>
          <input
            type="text"
            id="status"
            name="status"
            value={form.status}
            onChange={handleFormInputChange}
          />
        </div>
        <button type="submit">Update Item</button>
      </form>
    </div>
  );
};

export default UpdateItem;
