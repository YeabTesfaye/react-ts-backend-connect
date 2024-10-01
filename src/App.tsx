import userService from "./services/user-service";
import useUsers from "./hooks/useUsers";
import { User } from "./hooks/utils";
function App() {
  

  const { users, error, isLoading, setUsers, setError } = useUsers();

  const addUser = () => {
    const newUser = { id: 0, name: "Mosh Hamadani" };

    userService
      .create(newUser)
      .then(({ data: savedUser }) => setUsers([savedUser, ...users]))
      .catch((err) => setError(err.message));
  };
  const removeUser = (id: number) => {
    const originalUsers = [...users];
    const filterdUser = users.filter((user) => user.id !== id);
    setUsers(filterdUser);

    userService.delete(id).catch((err) => {
      setError(err.message);
      setUsers(originalUsers);
    });
  };
  const updateUser = (userToUpdate: User) => {
    // Create the updated user object
    const updatedData = { ...userToUpdate, name: userToUpdate.name + "!" };

    // Update the state
    setUsers((prevUsers) =>
      prevUsers.map((u) => (u.id === userToUpdate.id ? updatedData : u))
    );

    // Send the PATCH request to update the user on the server
    userService.update(userToUpdate).catch((err) => {
      setError(err.message);
    });
  };

  return (
    <>
      {error && <p className="text-danger">{error}</p>}
      {isLoading && <div className="spinner-border"></div>}
      <button className="btn btn-primary mb-3" onClick={addUser}>
        Add
      </button>
      <ul className="list-group">
        {users.map((user) => (
          <li
            key={user.id}
            className="list-group-item d-flex justify-content-between"
          >
            {user.name}
            <div>
              <button
                className="btn btn-outline-secondary mx-2"
                onClick={() => updateUser(user)}
              >
                Update
              </button>

              <button
                className="btn btn-danger mr-3"
                onClick={() => removeUser(user.id)}
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </>
  );
}

export default App;
