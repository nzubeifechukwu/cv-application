import { useState } from "react";

/**
 * EducationItem component: child of EducationList component
 * @prop notSubmitted (Boolean) - to toggle disable status of Add Education button
 *                             when there is editable form to add new education item
 * @prop onAdd (function) - handles the notSubmitted prop. Will be triggered by Submit button
 * @prop notEdited (Boolean) - to toggle disable status of Add Education button
 *                              when editing an education item
 * @prop onEdit (function) - handles the notEdited prop. Will be triggered by Edit button
 */
function EducationItem({ notSubmitted, onAdd, notEdited, onEdit }) {
  // Use to show when you're editing a form or the results after editing
  const [edited, setEdited] = useState(false);
  const [education, setEducation] = useState({
    school: "",
    course: "",
  });

  function handleSubmit() {
    setEdited(!edited); // set edited to true, thus displaying result after editing
    onAdd(notSubmitted); // for Submit button
  }

  function handleEdit() {
    setEdited(!edited); // set edited to false, thus displaying form to add (or edit) education item
    onEdit(notEdited); // for Edit button
  }

  return (
    <>
      {edited ? (
        <article>
          <h3>{`${education.school}: ${education.course}`}</h3>
          <button onClick={handleEdit}>Edit</button>
        </article>
      ) : (
        <form onSubmit={(e) => e.preventDefault()}>
          <label htmlFor="">School</label>
          <input
            type="text"
            value={education.school}
            onChange={(e) =>
              setEducation({ ...education, school: e.target.value })
            }
          />
          <label htmlFor="">Course</label>
          <input
            type="text"
            value={education.course}
            onChange={(e) =>
              setEducation({ ...education, course: e.target.value })
            }
          />
          <button onClick={handleSubmit}>Submit</button>
        </form>
      )}
    </>
  );
}

export default function EducationList() {
  const [addedEducation, setAddedEducation] = useState(false);
  const [educationItemCount, setEducationItemCount] = useState(0);
  const [educationItemList, setEducationItemList] = useState([]);
  const [notSubmitted, setNotSubmitted] = useState(false);
  const [notEdited, setNotEdited] = useState(false);

  // for Submit button
  function handleOnAdd() {
    // Reset both states once you submit an education item (new or edited).
    // This enables again the Add Education button
    setNotSubmitted(false);
    setNotEdited(false);
  }

  // for Add Education button
  function handleClick() {
    setEducationItemCount(educationItemCount + 1);
    setAddedEducation(true); // You're about to add new education item
    setNotSubmitted(true); // Toggle NotSubmitted to true, thus disabling the Add Education button
  }

  // Runs only when you have clicked Add Education button (which turns on addedEducation state)
  if (addedEducation) {
    for (let i = 0; i < educationItemCount; i++) {
      setEducationItemList([
        ...educationItemList,
        <EducationItem
          key={i}
          notSubmitted={notSubmitted}
          editedProp={notEdited}
          onAdd={() => handleOnAdd()} // for Submit button
          onEdit={() => setNotEdited(true)} // for Edit button
        />,
      ]);
    }
    setAddedEducation(false); // reset addedEducation state after adding new education item
  }

  return (
    <section>
      {educationItemList.map((item) => item)}
      <button onClick={handleClick} disabled={notSubmitted || notEdited}>
        Add Education
      </button>
    </section>
  );
}
