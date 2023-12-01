import { ChangeEvent, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { User } from '../types/user'
import { getUsers } from '../services/getUsers'
import Table from '../components/base/table/table'
import TableHead from '../components/base/table/tableHead'
import TableBody from '../components/base/table/tableBody'
import TableCell from '../components/base/table/tableCell'
import Header from '../components/header'
import UserDialog from '../components/userDialog'
import Typography from '../components/base/typography'
import Button from '../components/base/button'
import Input from '../components/base/input'

const DashboardPage = () => {
  const navigate = useNavigate()
  const [users, setUsers] = useState<User[]>([])
  const [searchTerm, setSearchTerm] = useState<string | undefined>(undefined)

  useEffect(() => {
    getUsers(searchTerm)
      .then((result) => setUsers(result) ) 
  }, [searchTerm])

  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    const searchTerm = e.target.value.toLowerCase()
    setSearchTerm(searchTerm)
  }

  return (
    <>
      <Header />
      <div className='container mx-auto'>
        <div className='flex justify-between pb-2'>
          <Typography variant='header'>User</Typography>
          <div className='flex space-x-2'>
            <Input type='text' placeholder='Suche ...' onChange={handleSearch}/>
            <Button variant='outlined'>Filter</Button>
            <UserDialog type='insert' />
          </div>
        </div>
        <Table>
          <TableHead>
            <tr>
              <TableCell>Vorname</TableCell>
              <TableCell>Nachname</TableCell>
            </tr>
          </TableHead>
          <TableBody>
            {users.map((user) => (
              <tr key={user.id} className='bg-white border-b dark:bg-zinc-800 dark:border-zinc-700 hover:bg-zinc-200 dark:hover:bg-zinc-600' onClick={() => navigate(`/user/${user.id}`)}>
                <TableCell>{user.firstname}</TableCell>
                <TableCell>{user.lastname}</TableCell>
              </tr> 
            ))}
          </TableBody>
        </Table>
      </div>
    </>
  )
}

export default DashboardPage