import { useContext, useEffect, useState } from 'react';
import AsyncCreatableSelect from 'react-select/async-creatable';
import { UserContext } from '../../store/userContext';

export default function AuthorsMultiSelect({ selectedAuthors, setSelectedAuthors, setError, setSuccessMsg }) {

  const [formattedAuthors, setFormattedAuthors] = useState([]);
  const [authorsLoading, setAuthorsLoading] = useState(true);
  const { user } = useContext(UserContext);

  useEffect(() => {
    async function fetchAuthors() {
      try {
        const response = await fetch('https://iifsd.herokuapp.com/authors');
        const data = await response.json();
  
        if (data.error) {
          setError(data.message[0].messages[0].message);
          return;
        }
  
        const formattedData = data.map((item) => ({ value: item.id, label: item.author_name }))
        setFormattedAuthors(formattedData);
        setAuthorsLoading(false);
      } catch (err) {
        setError(err.toString());
      }
    }

    fetchAuthors();
  }, [setError])

  const filterAuthors = (inputValue) => {
    return formattedAuthors.filter((i) =>
      i.label.toLowerCase().includes(inputValue.toLowerCase())
    );
  };

  const promiseOptions = (inputValue) =>
    new Promise((resolve) => {
      setTimeout(() => {
        resolve(filterAuthors(inputValue));
      }, 0);
    });



  async function createAuthor(value) {
    try {
      const respose = await fetch('https://iifsd.herokuapp.com/authors', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${user.jwt}`
        },
        body: JSON.stringify({
          "author_name": value
        }),
      });

      if (!respose.ok) {
        throw new Error("Server responds with error while creating the author!")
      }

      const data = await respose.json();

      return data;
    } catch (error) {
      setError(error);
    }
  }

  function handleAuthorChange(values) {
    setSelectedAuthors(values);
  }

  async function handleAuthorCreate(newValue) {
    setAuthorsLoading(true);
    const newAuthor = await createAuthor(newValue);
    if (newAuthor) {
      setSelectedAuthors([...selectedAuthors, { value: newAuthor.id, label: newAuthor.author_name }]);
    }
    setAuthorsLoading(false);
  }

  return (
    <>
      <label htmlFor="authors">Authors:</label>
      <AsyncCreatableSelect
        value={selectedAuthors}
        id='authors'
        className='react-select-wrapper'
        isMulti
        defaultOptions={formattedAuthors}
        loadOptions={promiseOptions}
        onCreateOption={handleAuthorCreate}
        onChange={handleAuthorChange}
        isLoading={authorsLoading}
      />
    </>
  )
}