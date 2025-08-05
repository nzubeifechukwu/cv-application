import { useState } from "react";

export default function General() {
  const [edited, setEdited] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  return (
    <>
      {edited ? (
        <section>
          <h1>{name}</h1>
          <h3>{email}</h3>
          <h3>{phone}</h3>
          <button onClick={() => setEdited(!edited)}>Edit</button>
        </section>
      ) : (
        <form onSubmit={(e) => e.preventDefault()}>
          <label htmlFor="">Name </label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <label htmlFor="">Email </label>
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <label htmlFor="">Phone </label>
          <input
            type="text"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
          <button onClick={() => setEdited(!edited)}>Submit</button>
        </form>
      )}
    </>
  );
}
