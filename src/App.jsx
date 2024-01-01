import "./App.css";
import contacts from "./contacts.json";
import { useState } from "react";

function App() {
  const [newContact, setContact] = useState(contacts.splice(0,5));
  const [remainingContacts, setRemainingContacts] = useState(contacts.slice(5));

  console.log(newContact);
  console.log(remainingContacts);

  const handleClick = () => {
    if (remainingContacts.length > 0) {
      let randomNum = Math.floor(Math.random() * remainingContacts.length);
      const randomContact = remainingContacts[randomNum];

      const updatedContact = [randomContact, ...newContact];
      setContact(updatedContact);

      const updatedRemainingContacts = remainingContacts.filter(contact => contact.id !== randomContact.id);
      setRemainingContacts(updatedRemainingContacts);
    }
  }

  const handlePopularity = () => {
    const sortedContacts = [...newContact].sort((a, b) => b.popularity - a.popularity);
    setContact(sortedContacts);
  }

  const handleName = () => {
    const sortedContacts = [...newContact].sort((a, b) => a.name.localeCompare(b.name));
    setContact(sortedContacts);
  }

  const handleDelete = (id) => {
    const updatedContacts = newContact.filter(contact => contact.id !== id);

    setContact(updatedContacts);
  }

  return (
    <div className="App">
      <h1>LAB | React IronContacts</h1>

      <button onClick={handleClick}>Add Random Contact</button>

      <button onClick={handlePopularity}>Sort by popularity</button>
      
      <button onClick={handleName}>Sort by name</button>

      <table>
      <thead>
          <tr>
            <th>Picture</th>
            <th>Name</th>
            <th>Popularity</th>
            <th>Won Oscar</th>
            <th>Won Emmy</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {newContact.map(contact => (
            <tr key={contact.id}>
              <td>
                <img className='image' src={contact.pictureUrl} alt={contact.name} />
              </td>
              <td>{contact.name}</td>
              <td>{contact.popularity.toFixed(2)}</td>
              <td>{contact.wonOscar === true ? '🏆' : ''}</td>
              <td>{contact.wonEmmy === true ? '🌟' : ''}</td>
              <td>{<button onClick={() => handleDelete(contact.id)}>Delete</button>}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;
