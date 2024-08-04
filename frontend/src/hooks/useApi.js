import { useState } from 'react';
import axios from '../utils/axios';

const useApi = (initialValues, validate, url, method = 'post') => {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState(null);
  const [response, setResponse] = useState(null); // To hold API response data

  // Handle input changes
  const handleChange = (event) => {
    const { name, value } = event.target;
    setValues({
      ...values,
      [name]: value,
    });
  };

  // Validate form values
  const validateForm = () => {
    const validationErrors = validate(values);
    setErrors(validationErrors);
    return Object.keys(validationErrors).length === 0;
  };

  // Handle form submission or other API requests
  const handleRequest = async (event) => {
    if (event) event.preventDefault(); // Prevent default form submission

    if (!validateForm()) {
      return;
    }

    setLoading(true);
    setSubmitted(false);

    try {
      let apiResponse;
      switch (method) {
        case 'get':
          apiResponse = await axios.get(url); // For GET requests
          break;
        case 'put':
          apiResponse = await axios.put(url, values); // For PUT requests
          break;
        case 'delete':
          apiResponse = await axios.delete(url, { data: values }); // For DELETE requests
          break;
        default:
          apiResponse = await axios.post(url, values); // Default to POST
          break;
      }
      setResponse(apiResponse.data); // Set response data
      setSubmitted(true); // Set submitted status on successful request
    } catch (error) {
      setError(error); // Set error state if request fails
    } finally {
      setLoading(false); // Reset loading state
    }
  };

  return {
    values,
    errors,
    loading,
    submitted,
    error,
    response,
    handleChange,
    handleRequest, // Renamed for clarity
  };
};

export default useApi;
