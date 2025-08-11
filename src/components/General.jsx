import { useState } from "react";

export default function General() {
  const [edited, setEdited] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  function handleSubmit() {
    if (name.trim() && email.trim() && phone.trim()) {
      setEdited(!edited);
    } else {
      alert("Name or email or phone cannot be empty");
    }
  }

  return (
    <>
      {edited ? (
        <section>
          <h1>{name.trim()}</h1>
          <p>
            {email.trim()}, {phone.trim()}
          </p>
          <button onClick={() => setEdited(!edited)}>Edit</button>
        </section>
      ) : (
        <form onSubmit={(e) => e.preventDefault()}>
          <p className="instruction">Enter your name, email and phone</p>
          <div className="label-input">
            <label htmlFor="name">Name </label>
            <input
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="label-input">
            <label htmlFor="email">Email </label>
            <input
              id="email"
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="label-input">
            <label htmlFor="phone">Phone </label>
            <input
              id="phone"
              type="text"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </div>
          <div>
            <button onClick={handleSubmit}>Submit</button>
          </div>
        </form>
      )}
    </>
  );
}
