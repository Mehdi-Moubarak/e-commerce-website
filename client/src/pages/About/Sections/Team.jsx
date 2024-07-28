import React from "react";
import { NavLink } from "react-router-dom";
function Team() {
  const team = [
    {
      name: "Lawson Arnold",
      position: "CEO, Founder, Atty.",
      image: "images/person_1.jpg",
      alt: "person",
      description:
        "Separated they live in. Separated they live in Bookmarksgrove right at the coast of the Semantics, a large language ocean.",
    },
    {
      name: "Jeremy Walker",
      position: "CEO, Founder, Atty.",
      image: "images/person_2.jpg",
      alt: "person",
      description:
        "Separated they live in. Separated they live in Bookmarksgrove right at the coast of the Semantics, a large language ocean.",
    },
    {
      name: "Patrik White",
      position: "CEO, Founder, Atty.",
      image: "images/person_3.jpg",
      alt: "person",
      description:
        "Separated they live in. Separated they live in Bookmarksgrove right at the coast of the Semantics, a large language ocean.",
    },
    {
      name: "Kathryn Ryan",
      position: "CEO, Founder, Atty.",
      image: "images/person_4.jpg",
      alt: "person",
      description:
        "Separated they live in. Separated they live in Bookmarksgrove right at the coast of the Semantics, a large language ocean.",
    },
  ];

  return (
    <div>
      {/* <!-- Start Team Section --> */}
      <div className="untree_co-section">
        <div className="container">
          <div className="row mb-5">
            <div className="col-lg-5 mx-auto text-center">
              <h2 className="section-title">Our Team</h2>
            </div>
          </div>

          <div className="row">
            {team.map((member, index) => (
              <TeamMember key={index} member={member} />
            ))}
          </div>
        </div>
      </div>
      {/* <!-- End Team Section --> */}
    </div>
  );
}

const TeamMember = ({ member }) => {
  return (
    <div className="col-12 col-md-6 col-lg-3 mb-5 mb-md-0">
      <img src={member.image} className="img-fluid mb-5" alt={member.alt} />

      <h3 clas>
        <NavLink to="#">
          <span className="">{member.name}</span>
        </NavLink>
      </h3>
      <span className="d-block position mb-4">{member.position}</span>
      <p>{member.description}</p>
      <p className="mb-0">
        <NavLink to="#" className="more dark">
          Learn More <span className="icon-arrow_forward"></span>
        </NavLink>
      </p>
    </div>
  );
};

export default Team;
