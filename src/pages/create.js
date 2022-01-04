import { useContext, useEffect, useRef, useState } from 'react';
import { UserContext } from '../store/userContext';
import PageTitle from '../components/pageTitle/pageTitle';
import Alert from '../components/alert/alert';
import TagsMultiSelect from '../components/tagsMultiSelect/tagsMultiSelect';
import AuthorsMultiSelect from '../components/authorsMulitSelect/authorsMultiSelect';

function Create(props) {
  const [editBook, setEditBook] = useState(false);

  const [selectedTags, setSelectedTags] = useState([]);
  const [selectedAuthors, setSelectedAuthors] = useState([]);

  const [bookTitle, setBookTitle] = useState((editBook && editBook.book_title) ? editBook.book_title : '');
  const [shortDescription, setShortDescription] = useState('');
  const [description, setDescription] = useState('');
  const [coverURL, setCoverURL] = useState('https://www.linkpicture.com/q/book-na-1.jpg');

  const [err, setError] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  const { user } = useContext(UserContext);
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    if (props.match?.params?.id && props.match?.url?.endsWith('/edit')) {
      const fetchBook = async () => {
        try {
          const response = await fetch(`https://iifsd.herokuapp.com/books/${props.match?.params?.id}`);

          console.log(response);
          const data = await response.json();

          if (data.error) {
            setError('Error fetching the book')
          }

          console.log(data);

          setLoading(false);
          setEditBook(data);
          setSuccessMsg('Edit mode: ON')

          setBookTitle(data.book_title);
          setShortDescription(data.book_short_description);
          setDescription(data.book_description);
          setCoverURL(data.cover_url);
          setSelectedAuthors(data.authors.map((item) => ({ value: item.id, label: item.author_name })));
          setSelectedTags(data.tags.map((item) => ({ value: item.id, label: item.tag_name })));
        } catch (err) {
          setLoading(false);
          setError(err.toString())
        }
      };

      fetchBook();
    }
  }, [])

  const titleInputEl = useRef();

  function resetStates() {
    setSelectedTags([]);
    setSelectedAuthors([]);
    setBookTitle('');
    setShortDescription('');
    setDescription('');
    setCoverURL('https://www.linkpicture.com/q/book-na-1.jpg')
    titleInputEl.current.focus();
  }

  function resetAlerts() {
    setError('');
    setSuccessMsg('');
  }

  async function handleSubmit(e) {
    e.preventDefault();

    if (!user) {
      setError('You need to be logged in.')
      // props.history.push('/login');
      return;
    }

    if (!bookTitle) {
      setError('Book title is required.')
      return;
    }

    const selectedAuthorsArray = selectedAuthors.map((item) => item.value);
    const selectedTagsArray = selectedTags.map((item) => item.value);


    if (editBook) {
      // sending a post request to create a book
      try {
        const respose = await fetch(`https://iifsd.herokuapp.com/books/${editBook.id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${user.jwt}`
          },
          body: JSON.stringify({
            "book_title": bookTitle,
            "book_short_description": shortDescription,
            "book_description": description,
            "cover_url": coverURL,
            "authors": selectedAuthorsArray,
            "tags": selectedTagsArray
          }),
        });

        console.log(respose);

        if (!respose.ok) {
          throw new Error("Server responds with error!")
        }

        const data = await respose.json();

        if (data.error) {
          throw new Error(`ERROR: ${data.error}`);
        }

        // success
        console.log(data);
        setSuccessMsg(`New book: ${data.book_title} with ID: ${data.id} updated.`)
        props.history.push(`/book/${data.id}`);
      } catch (error) {
        console.log(error);
        setError(error);
      }
    } else {
      // sending a post request to create a book
      try {
        const respose = await fetch('https://iifsd.herokuapp.com/books', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${user.jwt}`
          },
          body: JSON.stringify({
            "book_title": bookTitle,
            "book_short_description": shortDescription,
            "book_description": description,
            "cover_url": coverURL,
            "authors": selectedAuthorsArray,
            "tags": selectedTagsArray
          }),
        });

        if (!respose.ok) {
          throw new Error("Server responds with error!")
        }

        const data = await respose.json();

        if (data.error) {
          throw new Error(`ERROR: ${data.error}`);
        }

        // success
        console.log(data);
        setSuccessMsg(`New book: ${data.book_title} with ID: ${data.id} created.`)
        resetStates(); // empty all text boxes and focus to the book title
      } catch (error) {
        console.log(error);
        setError(error);
      }
    }












  }

  return (
    <div className="page__create container--no-flex">

      <PageTitle title="Create A Book" subTitle="in the Open Library" />

      {err && <Alert err msg={err.toString()} />}
      {successMsg && <Alert msg={successMsg.toString()} />}
      {!user && <Alert err msg='Anonymous users are not allowed to create a book. Please log in.' />}

      <form onSubmit={handleSubmit}>

        <label htmlFor="book-title">Book Title:</label>
        <input ref={titleInputEl} type="text" id="book-title" placeholder="book title" value={bookTitle} onChange={(e) => { resetAlerts(); setBookTitle(e.target.value) }} />

        <label htmlFor="book-short-description">Short Description:</label>
        <input type="text" id="book-short-description" placeholder="short description" value={shortDescription} onChange={(e) => { resetAlerts(); setShortDescription(e.target.value) }} />

        <label htmlFor="book-description">Description:</label>
        <textarea
          id="book-description"
          placeholder="description" value={description} onChange={(e) => { resetAlerts(); setDescription(e.target.value) }} />

        <label htmlFor="book-cover-url">Book cover URL:</label>
        <input type="text" id="book-cover-url" placeholder="URL of the cover" value={coverURL} onChange={(e) => { resetAlerts(); setCoverURL(e.target.value) }} />

        <AuthorsMultiSelect selectedAuthors={selectedAuthors} setSelectedAuthors={setSelectedAuthors} setError={setError} setSuccessMsg={setSuccessMsg} />

        <TagsMultiSelect selectedTags={selectedTags} setSelectedTags={setSelectedTags} setError={setError} setSuccessMsg={setSuccessMsg} />

        <button className="button button-primary" type="submit">Submit</button>
      </form>
    </div>
  )
}

export default Create;
