import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { setUser } from './../redux/auth/actions'
import axios from './../plugins/axios'
import {
  useParams,
  useHistory
} from 'react-router-dom'
import {
  Button,
  Box,
  TextField,
  Typography
} from '@material-ui/core'

function Login() {
  const params = useParams()
  const history = useHistory()
  const dispatch = useDispatch()
  const [loading, setLoading] = useState(false)
  const [errors, setErrors] = useState({})
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const signin = async e => {
    e.preventDefault()

    setLoading(true)

    try {
      const {
        user,
        access_token
      } = await axios.post(`${params.user}/login`, {
        email,
        password
      })

      dispatch(
        setUser(
          user,
          access_token
        )
      )

      history.replace('/app')
    } catch ({ response }) {
      if (response.status === 422) {
        setLoading(false)
        setErrors(response.data.errors)
      }
    }
  }

  return (
    <>
      <Box mb={2}>
        <Typography
          variant="h5"
          align="center"
        >Системд нэвтрэх</Typography>
      </Box>
      <form
        onSubmit={signin}
        autoComplete="off"
        noValidate
      >
        <TextField
          error={!!errors.email}
          helperText={errors.email}
          value={email}
          onChange={e => setEmail(e.target.value)}
          label="Email"
          type="email"
          variant="outlined"
          margin="normal"
          fullWidth
        />
        <TextField
          error={!!errors.password}
          helperText={errors.password}
          value={password}
          onChange={e => setPassword(e.target.value)}
          label="Password"
          type="password"
          variant="outlined"
          margin="normal"
          fullWidth
        />
        <Box mt={3}>
          <Button
            disabled={loading}
            variant="contained"
            color="primary"
            size="large"
            type="submit"
            fullWidth
          >Нэвтрэх</Button>
        </Box>
      </form>
    </>
  )
}

export default Login