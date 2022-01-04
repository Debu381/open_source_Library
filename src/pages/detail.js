import { Fragment, useContext } from 'react';
import { useEffect, useState } from 'react';
import BookDetail from '../components/bookDetail/bookDetail';
import SectionHeading from '../components/sectionHeading/sectionHeading';
import { UserContext } from '../store/userContext';

function Detail(props) {
  const id = props.match.params?.id || 1;

  const [book, setBook] = useState({});
  const [loading, setLoading] = useState(true);
  const { user } = useContext(UserContext);

  useEffect(() => {
    const fetchBook = async () => {
      try {
        const response = await fetch(`https://iifsd.herokuapp.com/books/${id}`);

        if (!response.ok) {
          throw new Error('Server responds with error!');
        }

        const data = await response.json();
        setLoading(false);
        setBook(data);
      } catch {
        setLoading(false);
      }
    };
    fetchBook();
  }, [id, loading]);

  const handleEdit = () => {
    props.history.push(`/book/${id}/edit`)
  }

  const handleDelete = async () => {
    setLoading(true);

    if (!id) {
      throw new Error('No valid id to delete!');
    }

    if (!user) {
      throw new Error('You need to be logged in to perform this request');
    }

    try {
      const response = await fetch(`https://iifsd.herokuapp.com/books/${id}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${user.jwt}`,
        },
      });

      if (!response.ok) {
        console.log(response);
        throw new Error('Server responds with error!');
      }

      const data = await response.json();
      console.log(data);
      setLoading(false);
      props.history.push({
        pathname: '/list',
        state: {
          alert_message: `${data.book_title}, id:${data.id} : deleted from the library.`,
          alert_type: 'error',
        },
      });
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  };

  return (
    <div className="page-detail">
      {loading && <p>Loading book from the server....</p>}

      {!loading && (
        <>
          {book.id && (
            <>
              <SectionHeading section_title={book.book_title} />
              <BookDetail {...book} />

              {user && (
                <div className="page-detail__admin-buttons container">
                  <button onClick={handleDelete} className="page-detail__delete-post button-danger">
                    Delete this book
                  </button>

                  <button onClick={handleEdit} className="page-detail__delete-post button-primary">
                    Edit this book
                  </button>
                </div>
              )}
            </>
          )}

          {!book.id && <p>Something went wrong....</p>}
        </>
      )}
    </div>
  );
}

export default Detail;
