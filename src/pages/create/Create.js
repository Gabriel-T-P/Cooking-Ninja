import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useFetch } from '../../hooks/useFetch'

// Style
import './Create.css'

export default function Create() {

  const [title, setTitle] = useState('')
  const [method, setMethod] = useState('')
  const [cookingTime, setCookingTime] = useState('')
  const [newIngredient, setNewIngredient] = useState('')
  const [ingredients, setIngredients] = useState([])
  const navigate = useNavigate()

  const { postData, data, error } = useFetch('http://localhost:3000/recipes', 'POST')

  const handleAdd = (e) => {
    e.preventDefault()
    const ing = newIngredient.trim()

    if (ing && !ingredients.includes(ing)) { /*essa função recebe o array e olha se existe nele o ing, retornando true se sim*/
      setIngredients((prevIngredients) => [...prevIngredients, ing])
    }

    setNewIngredient('')
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    postData({ title, ingredients, method, cookingTime: cookingTime + ' minutos' })
  }

  // Redireciona usuário quando fixer o POST da receita
  useEffect(() => {
    if (data) {
      setTimeout(() => {
        navigate('/')
      }, 1000)
    }
  }, [data, navigate])


  return (
    <div className='create'>
      <h2 className='page-title'> Adicione uma Nova Receita </h2>

      <form onSubmit={handleSubmit}>

        <label>
          <span>Título da receita:</span>
          <input
            type="text"
            onChange={(e) => setTitle(e.target.value)}
            value={title}
            required
          />
        </label>

        <label>
          <span>Ingredientes da recita:</span>
          <div className='ingredients'>
            <input
              type="text"
              onChange={(e) => setNewIngredient(e.target.value)}
              value={newIngredient}
            />
            <button className='btn' onClick={handleAdd}>Adicionar</button>
          </div>
        </label>
        <p>Ingredientes adicionados: {ingredients.map(i => <em key={i}> {i}, </em>)} </p>

        <label>
          <span>Método da receita:</span>
          <textarea
            onChange={(e) => setMethod(e.target.value)}
            value={method}
            required
          />
        </label>

        <label>
          <span>Tempo de preparo (minutos):</span>
          <input
            type="number"
            onChange={(e) => setCookingTime(e.target.value)}
            value={cookingTime}
            required
          />
        </label>

        <button className='btn'>Confirmar</button>

      </form>

    </div>
  )
}
