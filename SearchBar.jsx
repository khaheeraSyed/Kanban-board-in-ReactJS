import React from 'react';

const SearchBar = ({ setSearchTerm }) => {
    return (
        <input 
            type="text" 
            placeholder="Search tasks..." 
            onChange={(e) => setSearchTerm(e.target.value)} 
        />
    );
};

export default SearchBar;
