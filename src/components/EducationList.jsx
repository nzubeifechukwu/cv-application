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
function EducationItem({ notSubmitted, onAdd, notEdited, onEdit }) {
  // Use to show when you're editing a form or the results after editing
  const [edited, setEdited] = useState(false);
  const [education, setEducation] = useState({
    school: "",
    course: "",
    startDate: "",
    endDate: "",
  });

  function handleSubmit() {
    if (
      education.school.trim() &&
      education.course.trim() &&
      education.startDate.trim() &&
      education.endDate.trim()
    ) {
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

  return (
    <>
      {edited ? (
        <article>
          <p className="p-with-spans">
            <span className="first">{education.school.trim()}</span>
            <span>
              {education.startDate.trim()}–{education.endDate.trim()}
            </span>
          </p>
          <p>{education.course.trim()}</p>
          <button onClick={handleEdit} className="edit-btn">
            Edit
          </button>
        </article>
      ) : (
        <form onSubmit={(e) => e.preventDefault()}>
          <p className="instruction">Enter your education details</p>
          <div className="label-input">
            <label htmlFor="school">School</label>
            <input
              id="school"
              type="text"
              value={education.school}
              onChange={(e) =>
                setEducation({ ...education, school: e.target.value })
              }
            />
          </div>
          <div className="label-input">
            <label htmlFor="course">Course</label>
            <input
              id="course"
              type="text"
              value={education.course}
              onChange={(e) =>
                setEducation({ ...education, course: e.target.value })
              }
            />
          </div>
          <div className="label-input">
            <label htmlFor="start_date">Start Date</label>
            <input
              id="start_date"
              type="text"
              value={education.startDate}
              onChange={(e) =>
                setEducation({ ...education, startDate: e.target.value })
              }
            />
          </div>
          <div className="label-input">
            <label htmlFor="end_date">End Date</label>
            <input
              id="end_date"
              type="text"
              value={education.endDate}
              onChange={(e) =>
                setEducation({ ...education, endDate: e.target.value })
              }
            />
          </div>
          <div>
            <button onClick={handleSubmit} className="submit-btn">
              Submit
            </button>
          </div>
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

  // Runs only when you click Add Education button (which turns on addedEducation state)
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
      <hr />
      <h2>Education</h2>
      {educationItemList.map((item) => item)}
      <button
        onClick={handleClick}
        disabled={notSubmitted || notEdited}
        className="add-btn"
      >
        Add Education
      </button>
    </section>
  );
}
