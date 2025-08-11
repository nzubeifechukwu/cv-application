import { useState } from "react";

/**
 * ExperienceItem component: child of ExperienceList component
 *
 * @prop notSubmitted (Boolean) - to toggle disable status of Add Experience button
 *                             when there is editable form to add new experience item
 * @prop onAdd (function) - handles the notSubmitted prop. Triggered by Submit button
 * @prop notEdited (Boolean) - to toggle disable status of Add Experience button
 *                              when editing an experience item
 * @prop onEdit (function) - handles the notEdited prop. Triggered by Edit button
 */
function ExperienceItem({ notSubmitted, onAdd, notEdited, onEdit }) {
  // Use to show when you're editing a form or the results after editing
  const [edited, setEdited] = useState(false);
  const [experience, setExperience] = useState({
    organisation: "",
    role: "",
    responsibilities: "",
    startDate: "",
    endDate: "Now",
  });

  function handleSubmit() {
    if (
      experience.organisation.trim() &&
      experience.role.trim() &&
      experience.startDate.trim()
    ) {
      setEdited(!edited); // set edited to true, thus displaying result after editing
      onAdd(notSubmitted); // for Submit button
    } else {
      alert("Organisation or role or start date cannot be empty");
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
            <span className="first">{experience.organisation.trim()}</span>
            <span>
              {experience.startDate.trim()}–{experience.endDate.trim()}
            </span>
          </p>
          <dl>
            <dt>{experience.role.trim()}</dt>
            {experience.responsibilities.trim() &&
              experience.responsibilities
                .trim()
                .split(";")
                .map((responsibility) => (
                  <dd key={responsibility}>{responsibility}</dd>
                ))}
          </dl>
          <button onClick={handleEdit} className="edit-btn">
            Edit
          </button>
        </article>
      ) : (
        <form onSubmit={(e) => e.preventDefault()}>
          <p className="instruction">Enter your job details</p>
          <div className="label-input">
            <label htmlFor="organisation">Organisation</label>
            <input
              id="organisation"
              type="text"
              value={experience.organisation}
              onChange={(e) =>
                setExperience({ ...experience, organisation: e.target.value })
              }
            />
          </div>
          <div className="label-input">
            <label htmlFor="role">Role</label>
            <input
              id="role"
              type="text"
              value={experience.role}
              onChange={(e) =>
                setExperience({ ...experience, role: e.target.value })
              }
            />
          </div>
          <div className="label-input">
            <label htmlFor="responsibilities">
              Responsibilities (separate with semi-colons)
            </label>
            <input
              id="responsibilities"
              type="text"
              value={experience.responsibilities}
              onChange={(e) =>
                setExperience({
                  ...experience,
                  responsibilities: e.target.value,
                })
              }
            />
          </div>
          <div className="label-input">
            <label htmlFor="start_date">Start Date</label>
            <input
              id="start_date"
              type="text"
              value={experience.startDate}
              onChange={(e) =>
                setExperience({ ...experience, startDate: e.target.value })
              }
            />
          </div>
          <div className="label-input">
            <label htmlFor="end_date">End Date</label>
            <input
              id="end_date"
              type="text"
              value={experience.endDate}
              onChange={(e) =>
                setExperience({ ...experience, endDate: e.target.value })
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

export default function ExperienceList() {
  const [addedExperience, setAddedExperience] = useState(false);
  const [experienceItemCount, setExperienceItemCount] = useState(0);
  const [experienceItemList, setExperienceItemList] = useState([]);
  const [notSubmitted, setNotSubmitted] = useState(false);
  const [notEdited, setNotEdited] = useState(false);

  // for Submit button
  function handleOnAdd() {
    // Reset both states once you submit an experience item (new or edited).
    // This enables again the Add Experience button
    setNotSubmitted(false);
    setNotEdited(false);
  }

  // for Add Experience button
  function handleClick() {
    setExperienceItemCount(experienceItemCount + 1);
    setAddedExperience(true); // You're about to add new experience item
    setNotSubmitted(true); // Toggle NotSubmitted to true, thus disabling the Add Experience button
  }

  // Runs only when you click Add Experience button (which turns on addedExperience state)
  if (addedExperience) {
    for (let i = 0; i < experienceItemCount; i++) {
      setExperienceItemList([
        ...experienceItemList,
        <ExperienceItem
          key={i}
          notSubmitted={notSubmitted}
          editedProp={notEdited}
          onAdd={() => handleOnAdd()} // for Submit button
          onEdit={() => setNotEdited(true)} // for Edit button
        />,
      ]);
    }
    setAddedExperience(false); // reset addedExperience state after adding new experience item
  }

  return (
    <section>
      <hr />
      <h2>Experience</h2>
      {experienceItemList.map((item) => item)}
      <button
        onClick={handleClick}
        disabled={notSubmitted || notEdited}
        className="add-btn"
      >
        Add Experience
      </button>
    </section>
  );
}
