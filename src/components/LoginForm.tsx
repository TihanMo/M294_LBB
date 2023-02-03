import React from 'react'

export default function LoginForm() {
  return (
    <div>
      <form>
        <label>Email: </label>
        <input type="email" /><br />
        <label>Password: </label>
        <input type="password" /><br />
        <input type="submit" value="Submit" />
      </form>
    </div>
  )
}
