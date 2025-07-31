import { useState } from "react";
// import { educationDetails } from "../utils/data";

function EducationItem() {
  const [education, setEducation] = useState({
    // id: initId,
    school: "",
    course: "",
  });
  const [edited, setEdited] = useState(false);

  function handleSchoolInput(e) {
    setEducation({ ...education, school: e.target.value });
    // educationDetails[education.id] = education; // Update educationDetails after editing
    // educationDetails.splice(education.id, 1, education);
  }

  function handleCourseInput(e) {
    setEducation({ ...education, course: e.target.value });
    // educationDetails[education.id] = education; // Update educationDetails after editing
    // educationDetails.splice(education.id, 1, education);
  }

  return (
    <>
      {edited ? (
        <article>
          <h3>{`${education.school}: ${education.course}`}</h3>
          <button onClick={() => setEdited(!edited)}>Edit</button>
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
          <button onClick={() => setEdited(!edited)}>Submit</button>
        </form>
      )}
    </>
  );
}

export default function EducationList() {
  const [addedEducation, setAddedEducation] = useState(false);
  const [educationItemCount, setEducationItemCount] = useState(0);
  const educationItemList = [];

  if (addedEducation) {
    for (let i = 0; i < educationItemCount; i++) {
      educationItemList.push(<EducationItem />);
    }
    setAddedEducation(!addedEducation);
  }

  function handleClick() {
    setEducationItemCount(educationItemCount + 1);
    setAddedEducation(!addedEducation);
  }

  return (
    <section>
      {educationItemList.map((item) => item)}
      <button onClick={handleClick}>Add Education</button>
    </section>
  );
}
