import { useState, useEffect } from 'react'
import { doc, updateDoc } from 'firebase/firestore'
import { db } from '../firebase/config'
import './UpdateArticle.css'

export default function UpdateArticle({ article, onUpdate, onCancel }) {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [description, setDescription] = useState('')
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (article) {
      setTitle(article.title || '')
      setAuthor(article.author || '')
      setDescription(article.description || '')
    }
  }, [article])

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      const articleRef = doc(db, 'articles', article.id)
      await updateDoc(articleRef, {
        title,
        author,
        description
      })
      onUpdate()
    } catch (error) {
      console.error('Error updating article:', error)
    }
    setLoading(false)
  }

  return (
    <div className="update-overlay">
      <div className="update-modal">
        <h2>Update Article</h2>
        <form onSubmit={handleSubmit}>
          <label>
            <span>Title:</span>
            <input type="text" value={title} onChange={e => setTitle(e.target.value)} required />
          </label>
          <label>
            <span>Author:</span>
            <input type="text" value={author} onChange={e => setAuthor(e.target.value)} required />
          </label>
          <label>
            <span>Description:</span>
            <textarea value={description} onChange={e => setDescription(e.target.value)} required />
          </label>
          <div className="button-group">
            <button type="button" className="btn cancel" onClick={onCancel}>Cancel</button>
            <button type="submit" className="btn update" disabled={loading}>{loading ? 'Updating...' : 'Update Article'}</button>
          </div>
        </form>
      </div>
    </div>
  )
} 