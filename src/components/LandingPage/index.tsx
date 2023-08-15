import { NavLink } from "react-router-dom";

import "./styles.css";

const LandingPage = () => {
  return (
    <main>
      <div className="main-container">
        <h1 className="title">Welcome!</h1>
        <div className="separator"></div>

        <div className="news">
          <h2>Latest tech news</h2>

          <article className="news">
            <h4>Robots - are they taking over?</h4>
            <NavLink to="https://www.brother.co.uk/business-solutions/insights-hub/blog/business/2014/the-rise-of-office-robotics">
              <img
                src="https://www.brother.eu/-/media/images/brother-uk/blog/header-images/the-rise-of-office-robotics-2x.jpg?rev=48cec2a937994601b94cd3a325498510&mw=1170&hash=A3F7CA65642356F497BA3EEDC950476ED3786C06"
                alt="collection of old toy robots"
              />
            </NavLink>
            <p>
              The rise of office robotics - it's no longer science fiction...
            </p>
          </article>
        </div>
        <div className="separator"></div>
        <div className="test-headers">
          <h2>These headings... (h2)</h2>
          <h3>...are here to enable... (h3)</h3>
          <h4>...screen reader and contrast checking (h4)</h4>
        </div>
      </div>
    </main>
  );
};

export default LandingPage;
