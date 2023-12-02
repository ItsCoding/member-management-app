import { useEffect, useState } from 'react'
import { User } from '../types/user'
import { useNavigate, useParams } from 'react-router-dom'
import Header from '../components/header'
import { getUser, deleteUser } from '../services/user'
import Button from '../components/base/button'
import UserDialog from '../components/userDialog'
import Typography from '../components/base/typography'

const UserPage = () => {
  const navigate = useNavigate()
  const { id } = useParams()
  const [user, setUser] = useState<User | null>(null)

  useEffect(() => {
    if (id) {
      getUser(id)
        .then((data: User) => setUser(data))
    }
  }, [id])

  const handleClick = () => {
    if (id) {
      deleteUser(id)
        .then(() => navigate('/'))
        .catch((error) => alert(error))
    }
  }

  return (
    <>
      <Header />
      <div className='container mx-auto'>
        <div className='flex justify-between'>
          <Typography variant='header'>{user?.firstname} {user?.lastname}</Typography>
          <div className='grid gap-2 grid-cols-2'>
            <UserDialog type='update' userId={user?.id} />
            <Button onClick={handleClick} variant='outlined'>Löschen</Button>
          </div>
        </div>

        <div className='border rounded-lg border-zinc-600 mt-2 p-4'>
          <Typography variant='text'>Geburstdatum: {user?.birthdate?.toLocaleString()}</Typography>
          <Typography variant='text'>Addresse: {user?.address}</Typography>
          <Typography variant='text'>Email: {user?.email}</Typography>
          <Typography variant='text'>Telefon: {user?.phone}</Typography>
        </div>

      </div>
    </>
  )
}

export default UserPage