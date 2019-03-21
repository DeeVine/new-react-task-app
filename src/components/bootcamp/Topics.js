import React from "react";
import { Link, Route } from "react-router-dom";

//Match is a prop that React router passes to the componenet
function Topic({ match }) {
  console.log("match in topic", match);
  return <h3>{match.params.topicId}</h3>;
}

export default function Topics({ match }) {
  //dynamic match.url is helpful as we further nest links
  console.log("match.url", match.url);
  return (
    <div>
      <h2>Topcis</h2>
      <ul>
        <li>
          <Link to={`${match.url}/rendering`}>Rendering with React</Link>
        </li>
        <li>
          <Link to={`${match.url}/components`}>Components</Link>
        </li>
        <li>
          <Link to={`${match.url}/props-v-state`}>Props vs State</Link>
        </li>
      </ul>

      <hr />

      {/* <Route path={`${match.path}/:topicId`} component={Topic}/> */}

      {/* use render to pass a prop to component with react router */}
      <Route
        path={`${match.path}/:topicId`}
        render={props => {
          return <Topic {...props} name={"tyler"} />;
        }}
      />
      <Route
        exact
        path={match.path}
        render={() => {
          return <h3> Please select a topic</h3>;
        }}
      />
    </div>
  );
}
