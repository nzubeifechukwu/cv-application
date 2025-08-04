import { useState } from "react";

function EducationItem({ submitted, onAdd, editedProp, onEdit }) {
  const [education, setEducation] = useState({
    school: "",
    course: "",
  });
  const [edited, setEdited] = useState(false);

  function handleSchoolInput(e) {
    setEducation({ ...education, school: e.target.value });
  }

  function handleCourseInput(e) {
    setEducation({ ...education, course: e.target.value });
  }

  function handleSubmit() {
    setEdited(!edited);
    onAdd(submitted);
  }

  function handleEdit() {
    setEdited(!edited);
    onEdit(editedProp);
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
            onChange={(e) => handleSchoolInput(e)}
          />
          <label htmlFor="">Course</label>
          <input
            type="text"
            value={education.course}
            onChange={(e) => handleCourseInput(e)}
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
  const [submitted, setSubmitted] = useState(false);
  const [edited, setEdited] = useState(false);

  function handleOnAdd() {
    setSubmitted(false);
    setEdited(false);
  }

  if (addedEducation) {
    for (let i = 0; i < educationItemCount; i++) {
      setEducationItemList([
        ...educationItemList,
        <EducationItem
          key={i}
          submitted={submitted}
          editedProp={edited}
          onAdd={() => handleOnAdd()}
          onEdit={() => setEdited(true)}
        />,
      ]);
    }
    setAddedEducation(!addedEducation);
  }

  function handleClick() {
    setEducationItemCount(educationItemCount + 1);
    setAddedEducation(!addedEducation);
    setSubmitted(true);
  }

  return (
    <section>
      {educationItemList.map((item) => item)}
      <button onClick={handleClick} disabled={submitted || edited}>
        Add Education
      </button>
    </section>
  );
}
