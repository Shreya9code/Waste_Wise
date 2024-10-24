const UserProfile = () => {
    // Dummy user data
    const user = {
      name: 'John Doe',
      email: 'john.doe@example.com',
      goal: 'Reduce 50kg waste in 3 months'
    }
  
    return (
      <div>
        <h2>{user.name}</h2>
        <p>{user.email}</p>
        <p>Goal: {user.goal}</p>
      </div>
    )
  }
  
  export default UserProfile
  