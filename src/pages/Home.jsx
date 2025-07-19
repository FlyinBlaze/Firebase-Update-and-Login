import { Link } from 'react-router-dom'
import {getDocs, collection, deleteDoc, doc, onSnapshot} from 'firebase/firestore';
import {db} from '../firebase/config'
import { useEffect,useState } from 'react';
import DeleteIcon from '../assets/delete.svg'
import UpdateArticle from '../components/UpdateArticle'

// styles
import './Home.css'

export default function Home() {

  const [articles, setArticles] = useState(null);
  const [updatingArticle, setUpdatingArticle] = useState(null);

  // Fetch articles
  useEffect(() => {
    const ref = collection(db, 'articles');

    const unsubscribe = onSnapshot(ref, (snapshot)=>{
        let results = []
         snapshot.docs.forEach(doc => {
           results.push({id: doc.id, ...doc.data()});
         });
        setArticles(results);
      })

    // Initial fetch (optional, since onSnapshot covers it)
    getDocs(ref)
      .then((snapshot)=>{
        let results = []
        snapshot.docs.forEach(doc => {
          results.push({id: doc.id, ...doc.data()});
        });
        setArticles(results);
      })    
    return () => unsubscribe();
  },[])

  const handleDelete = async (id) => {
    const ref = doc(db, 'articles', id)
    deleteDoc(ref)
  }

  const handleUpdate = (article) => {
    setUpdatingArticle(article);
  }

  const handleUpdateComplete = () => {
    setUpdatingArticle(null);
  }

  return (
    <div className="home">
      <h2>Articles</h2>      
      {articles && articles.map(article => (
        <div key={article.id} className="card">
          <h3>{article.title}</h3>
          <p>Written by {article.author}</p>
          <Link to={`/articles/${article.id}`}>Read More...</Link>
          <div className="article-actions">
            <button 
              className="btn update-btn"
              onClick={() => handleUpdate(article)}
            >
              Update
            </button>
            <img 
              className="icon"
              onClick={() => handleDelete(article.id)}
              src={DeleteIcon} alt="delete icon" 
            />
          </div>
        </div>
      ))}
      {updatingArticle && (
        <UpdateArticle 
          article={updatingArticle}
          onUpdate={handleUpdateComplete}
          onCancel={handleUpdateComplete}
        />
      )}
    </div>
  )
}
