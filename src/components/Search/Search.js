import React, { useState } from 'react';
import { AsyncPaginate } from 'react-select-async-paginate';
import { fetchCities } from '../../api/OpenWeatherService';

const Search = ({ onSearchChange }) => {
  const [searchValue, setSearchValue] = useState(null);

  const loadOptions = async (inputValue) => {
    if (!inputValue || inputValue.trim().length < 2) {
      return {
        options: [],
      };
    }

    const citiesList = await fetchCities(inputValue);

    if (!citiesList || !citiesList.data) {
      return {
        options: [],
      };
    }

    return {
      options: citiesList.data.map((city) => ({
        value: `${city.latitude} ${city.longitude}`,
        label: `${city.name}, ${city.countryCode}`,
      })),
    };
  };

  const onChangeHandler = (enteredData) => {
    if (!enteredData) {
      setSearchValue(null);
      return;
    }

    onSearchChange(enteredData);

    // Clear search after selecting a city
    setSearchValue(null);
  };

  const customStyles = {
    control: (provided, state) => ({
      ...provided,

      minHeight: '48px',

      background: 'rgba(255, 255, 255, 0.08)',

      border: state.isFocused
        ? '1px solid rgba(4, 196, 224, 0.8)'
        : '1px solid rgba(255, 255, 255, 0.12)',

      borderRadius: '12px',

      boxShadow: state.isFocused
        ? '0 0 0 3px rgba(4, 196, 224, 0.1)'
        : '0 6px 20px rgba(0, 0, 0, 0.08)',

      backdropFilter: 'blur(12px)',

      cursor: 'text',

      transition: 'all 0.2s ease',

      '&:hover': {
        border: '1px solid rgba(4, 196, 224, 0.6)',
      },
    }),

    valueContainer: (provided) => ({
      ...provided,
      padding: '4px 16px',
    }),

    input: (provided) => ({
      ...provided,
      color: '#ffffff',
      fontFamily: 'Poppins',
      fontSize: '13px',
    }),

    placeholder: (provided) => ({
      ...provided,
      color: 'rgba(255, 255, 255, 0.55)',
      fontFamily: 'Poppins',
      fontSize: '13px',
    }),

    singleValue: (provided) => ({
      ...provided,
      color: '#ffffff',
      fontFamily: 'Poppins',
      fontSize: '13px',
    }),

    menu: (provided) => ({
      ...provided,

      background: 'rgba(3, 24, 52, 0.98)',

      border: '1px solid rgba(255, 255, 255, 0.1)',

      borderRadius: '12px',

      overflow: 'hidden',

      boxShadow: '0 12px 35px rgba(0, 0, 0, 0.35)',

      zIndex: 100,
    }),

    menuList: (provided) => ({
      ...provided,
      padding: '6px',
    }),

    option: (provided, state) => ({
      ...provided,

      padding: '10px 12px',

      borderRadius: '8px',

      background: state.isSelected
        ? 'rgba(4, 196, 224, 0.25)'
        : state.isFocused
        ? 'rgba(255, 255, 255, 0.08)'
        : 'transparent',

      color: state.isSelected
        ? '#04c4e0'
        : 'rgba(255, 255, 255, 0.85)',

      fontFamily: 'Poppins',

      fontSize: '13px',

      cursor: 'pointer',

      transition: 'all 0.15s ease',

      '&:active': {
        background: 'rgba(4, 196, 224, 0.2)',
      },
    }),

    noOptionsMessage: (provided) => ({
      ...provided,

      color: 'rgba(255, 255, 255, 0.5)',

      fontFamily: 'Poppins',

      fontSize: '12px',

      padding: '14px',
    }),

    loadingMessage: (provided) => ({
      ...provided,

      color: 'rgba(255, 255, 255, 0.6)',

      fontFamily: 'Poppins',

      fontSize: '12px',
    }),

    dropdownIndicator: (provided, state) => ({
      ...provided,

      color: state.isFocused
        ? '#04c4e0'
        : 'rgba(255, 255, 255, 0.5)',

      transition: 'all 0.2s ease',

      '&:hover': {
        color: '#04c4e0',
      },
    }),

    indicatorSeparator: () => ({
      display: 'none',
    }),

    clearIndicator: (provided) => ({
      ...provided,

      color: 'rgba(255, 255, 255, 0.5)',

      '&:hover': {
        color: '#ffffff',
      },
    }),
  };

  return (
    <AsyncPaginate
      placeholder="Search for another city..."
      debounceTimeout={1000}
      value={searchValue}
      onChange={onChangeHandler}
      loadOptions={loadOptions}
      styles={customStyles}
      isClearable
      noOptionsMessage={({ inputValue }) =>
        inputValue.trim().length < 2
          ? 'Type at least 2 characters to search'
          : 'No cities found'
      }
      loadingMessage={() => 'Searching cities...'}
    />
  );
};

export default Search;