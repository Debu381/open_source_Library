import { useContext, useEffect, useState } from 'react';
import AsyncCreatableSelect from 'react-select/async-creatable';
import { UserContext } from '../../store/userContext';

export default function TagsMultiSelect({ selectedTags, setSelectedTags, setError, setSuccessMsg }) {

  const [formattedTags, setFormattedTags] = useState([]);
  const [tagsLoading, setTagsLoading] = useState(true);

  const { user } = useContext(UserContext);

  useEffect(() => {
    async function fetchTags() {
      try {
        const response = await fetch('https://iifsd.herokuapp.com/tags');
        const data = await response.json();

        if (data.error) {
          setError(data.message[0].messages[0].message);
          return;
        }

        // console.log('data', data);

        const formattedData = data.map((item) => ({ value: item.id, label: item.tag_name }))

        // console.log('formatted data', formattedData);

        setFormattedTags(formattedData);
        setTagsLoading(false);
      } catch (err) {
        setError(err.toString());
      }
    }

    fetchTags();
  }, [setError])

  const filterTags = (inputValue) => {
    return formattedTags.filter((i) =>
      i.label.toLowerCase().includes(inputValue.toLowerCase())
    );
  };

  const promiseOptions = (inputValue) => {
    console.log('inputValue ', inputValue);

    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(filterTags(inputValue));
      }, 0);
    })}

  async function createTag(value) {
    try {
      const respose = await fetch('https://iifsd.herokuapp.com/tags', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${user.jwt}`
        },
        body: JSON.stringify({
          "tag_name": value
        }),
      });

      if (!respose.ok) {
        console.log(respose);
        throw new Error("Server responds with error while creating tag!")
      }

      const data = await respose.json();
      return data;
    } catch (error) {
      setError(error);
    }
  }

  function handleTagChange(values) {
    setSelectedTags(values);
  }

  async function handleTagCreate(newValue) {
    setTagsLoading(true);
    const newTag = await createTag(newValue);
    if (newTag) {
      setSelectedTags([...selectedTags, { value: newTag.id, label: newTag.tag_name }]);
    }
    setTagsLoading(false);
  }

  return (
    <>
      <label htmlFor="tags">Tags:</label>
      <AsyncCreatableSelect
        value={selectedTags}
        id='tags'
        className='react-select-wrapper'
        isMulti
        defaultOptions={formattedTags}
        loadOptions={promiseOptions}
        onCreateOption={handleTagCreate}
        onChange={handleTagChange}
        isLoading={tagsLoading}
      />
    </>
  )
}