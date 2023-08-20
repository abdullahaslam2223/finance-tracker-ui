import { useState, useEffect } from "react";
import { Dropdown, FormControl } from 'react-bootstrap';
import { API_BASE_URL } from "../config";
import axios from "axios";
import { headers } from "../App";
import { toast } from "react-toastify";

function CategoryDropdown({ onCategorySelect }) {
    const [categories, setCategories] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [filteredCategories, setFilteredCategories] = useState(categories);
    const [selectedCategory, setSelectedCategory] = useState(null);

    useEffect(() => {
      getAllCategories();
    }, []);

    const getAllCategories = () => {
      // setLoading(true);
      axios.get(API_BASE_URL + 'category', { headers: headers }).then(response => {
          const res = response.data;
          // setLoading(false);
          console.log(categories);
          setCategories(res.data);
          setFilteredCategories(res.data);
      }).catch(error => {
          // const res = error.response.data;
          // setLoading(false);
          toast.error("Something went wrong!");
      });
    }

    const handleSearchChange = (e) => {
        const query = e.target.value;
        setSearchQuery(query);
        const filtered = categories.filter((category) =>
          category.name.toLowerCase().includes(query.toLowerCase())
        );
        setFilteredCategories(filtered);
    };

    const handleCategorySelect = (category) => {
        setSelectedCategory(category);
        onCategorySelect(category);
        setSearchQuery('');
        setFilteredCategories(categories);
    };

    return (
        <Dropdown style={{width: '100%'}}>
          <Dropdown.Toggle
          id="category-dropdown"
          variant="light"
          style={{width: '100%',
          textAlign: 'left',
          paddingLeft: '10px',
          backgroundColor: '#dae0e5',
          marginBottom: "8px",
          boxShadow: '0px 0px 2px rgba(0, 0, 0, 0.5)'}}
          >
          {selectedCategory ? selectedCategory.name : 'Select Category'}
          </Dropdown.Toggle>
          <Dropdown.Menu style={{width: '100%'}}>
            <FormControl
              autoFocus
              type="text"
              placeholder="Search Categories"
              onChange={handleSearchChange}
              value={searchQuery}
            />
            <Dropdown.Divider />
            {filteredCategories.map((category) => (
              <Dropdown.Item
                key={category.id}
                onClick={() => handleCategorySelect(category)}
              >
                {category.name}
              </Dropdown.Item>
            ))}
          </Dropdown.Menu>
        </Dropdown>
    );
}

export default CategoryDropdown;