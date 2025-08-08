import { useState } from "react";

/**
 * EducationItem component: child of EducationList component
 *
 * @prop notSubmitted (Boolean) - to toggle disable status of Add Education button
 *                             when there is editable form to add new education item
 * @prop onAdd (function) - handles the notSubmitted prop. Triggered by Submit button
 * @prop notEdited (Boolean) - to toggle disable status of Add Education button
 *                              when editing an education item
 * @prop onEdit (function) - handles the notEdited prop. Triggered by Edit button
 */
function EducationItem({
  notSubmitted,
  onAdd,
  notEdited,
  onEdit,
  // deleted,
  // onDelete,
}) {
  // Use to show when you're editing a form or the results after editing
  const [edited, setEdited] = useState(false);
  // const [deleted, setDeleted] = useState(false);
  const [education, setEducation] = useState({
    school: "",
    course: "",
  });

  function handleSubmit() {
    if (education.school.trim() && education.course.trim()) {
      setEdited(!edited); // set edited to true, thus displaying result after editing
      onAdd(notSubmitted); // for Submit button
    } else {
      alert("School or course cannot be empty");
    }
  }

  function handleEdit() {
    setEdited(!edited); // set edited to false, thus displaying form to add (or edit) education item
    onEdit(notEdited); // for Edit button
  }

  // function handleDelete() {
  //   onDelete(deleted); // for Delete button
  //   setEducation({});
  // }

  return (
    <>
      {edited && education.school.trim() && education.course.trim() ? (
        <article>
          <h3>{`${education.school.trim()}: ${education.course.trim()}`}</h3>
          <button onClick={handleEdit}>Edit</button>
          {/* <button onClick={handleDelete}>Delete</button> */}
        </article>
      ) : (
        // ) : deleted ? (
        //   console.log("Print true")
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
  // const [deleted, setDeleted] = useState(false);

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
    // setDeleted(false);
  }

  // Runs only when you click Add Education button (which turns on addedEducation state)
  if (addedEducation) {
    for (let i = 0; i < educationItemCount; i++) {
      setEducationItemList([
        ...educationItemList,
        <EducationItem
          key={i}
          notSubmitted={notSubmitted}
          editedProp={notEdited}
          // deleted={deleted}
          onAdd={() => handleOnAdd()} // for Submit button
          onEdit={() => setNotEdited(true)} // for Edit button
          // onDelete={() => setDeleted(true)}
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
