import { useEffect, useState } from 'react'
import Header from '../components/header'
import { User } from '../types/user'
import { getUser } from '../services/getUser'
import { useParams } from 'react-router-dom'

const UserPage = () => {
  const { id } = useParams()
  const [user, setUser] = useState<User | null>(null)

  useEffect(() => {
    if (id) {
      getUser(id)
        .then((data: User) => setUser(data))
    }
  }, [id])

  return (
    <div>
      <Header />
      <div className='container mx-auto'>
        <div className='flex justify-between'>
          <h2 className='text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight'>{user?.firstname} {user?.lastname}</h2>
          <button type='button' className='border rounded-xl px-4 bg-slate-500'>Test</button>
        </div>
      </div>
    </div>
  )
}

export default UserPage