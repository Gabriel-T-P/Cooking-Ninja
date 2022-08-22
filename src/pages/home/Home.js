import { useFetch } from '../../hooks/useFetch'

// Components
import RecipeList from '../../components/RecipeList'

// Style
import './Home.css'

export default function Home() {
  const { data, isPending, error } = useFetch('http://localhost:3000/recipes')

  return (
    <div className='home'>
      {error && <p className='error'> {error} </p>}
      {isPending && <p className='loading'>Carregando...</p>}
      {data && <RecipeList recipes={data} />}
    </div>
  )
}
