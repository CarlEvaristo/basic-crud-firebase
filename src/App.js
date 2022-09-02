import React from "react"
import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc } from "firebase/firestore"
import {db} from "./firebase"    

function App() {
  const [users, setUsers] = React.useState([])
  const [newUser, setNewUser] = React.useState({name:"", age:""})
  //=> collection method:  GET A COLLECTION (TABLE) from db
  const usersCollectionRef = collection(db, "users")   

  async function readUsers() {
    //=> getDocs method: CRUD: READ ALL DOCUMENTS (records) in collection
    const data = await getDocs(usersCollectionRef)
    setUsers(data.docs.map(doc => ({...doc.data(), id:doc.id})))  //.data() method return fields from document (name/age) 
  }

  React.useEffect(()=> {
    readUsers()
  },[])   // only runs initially

  function handleCreateChange(event) {
    const {name, value} = event.target
    setNewUser(prevUser => ({...prevUser, [name]:value}))  //promiss (but I don't use the response here (.then/.catch)
      .then(readUsers())
  }

  function handleCreateClick(event) {
  //=> addDoc method: CRUD: CREATE NEW DOCUMENT (record) in collection
    addDoc(usersCollectionRef, newUser)  //promiss (but I don't use the response here (.then/.catch)
      .then(readUsers())
  }

  function updateUser(id, age){
  //=> updateDoc method: CRUD: UPDATE DOCUMENT  => LET OP UPDATE HEEFT "DOC" NODIG
    const userDoc = doc(db, "users", id)  // doc() METHOD GET A DOCUMENT (ARGS: DB, COLLECTION, DOC ID)
    updateDoc(userDoc, {age: Number(age) + 1})    //promiss (but I don't use the response here (.then/.catch)
      .then(readUsers())
  }

  function deleteUser(id){     
  //=> deleteDoc method: CRUD: DELETE DOCUMENT  => LET OP DELETE HEEFT OOK "DOC" NODIG
    const userDoc = doc(db, "users", id)  // doc() METHOD GET A DOCUMENT (ARGS: DB, COLLECTION, DOC ID)
    deleteDoc(userDoc)                    //promiss (but I don't use the response here (.then/.catch)
      .then(readUsers())
  }

  return(
    <main>
      <div className="inputBox">
        <h2>Please enter a new User</h2>
        <input type="text" name="name" placeholder="Name..." onChange={handleCreateChange} value={newUser.name} />
        <input type="number" name="age" placeholder="Age..." onChange={handleCreateChange} value={newUser.age} />
        <button onClick={handleCreateClick}>Create User</button>
      </div>
      {users.length !== 0 && <h2>All users:</h2>}
      {users.map(user => (
        <div className="userBox" key={user.id}>
          <h1>Name: {user.name}</h1>
          <h2>Age: {user.age}</h2>
          <button onClick={() => updateUser(user.id, user.age)}>Increase Age</button>
          <button onClick={() => deleteUser(user.id)}>Delete User</button>
        </div>
        )) 
      }
    </main>
  )
}

export default App