# User Registration and Login page web pages that put the User First by focusing on accessibility, useability and responsiveness.
 
This user-centered project aims to reduce the cognitive load on the user by splitting the process into small manageable steps. This should help memory or cognition but also follows general UX guidance which states that this eases any user’s perception of how difficult a process is to complete.

 These adaptations are driven by the Web Content Accessibility Guidelines (WCAG), which ask us to consider cognitive adaptations to help users with epilepsy, dyslexia, learning disability, autism and ADHD. The small manageable steps combined with the ability to save and continue the process at a later time, can also help users with memory loss. 

As well as being the morally correct thing to do, prioritising website accessibility, can build customer trust and loyalty, failing to do so is essentially saying to customers with disabilities that their business is not welcome here!

### Table of Contents
#### [Overall Project Design](https://github.com/ellohez/GL-Project#design)
#### [Details](https://github.com/ellohez/GL-Project#details)
#### [Technologies Used](https://github.com/ellohez/GL-Project#technologies)
#### [Web Fundamentals](https://github.com/ellohez/GL-Project#webfundamentals)
#### [Installation](https://github.com/ellohez/GL-Project#installation)
#### [Future Work](https://github.com/ellohez/GL-Project#future)

## [Overall Project Design](https://github.com/ellohez/GL-Project#design)
* Multi-step process, indicates steps completed and number steps to complete.
* Allows the user to save and complete the process at a later date.
* Gives the user time to think, isn’t overwhelming and helps the user to pick up where they left off if distracted or forgetful.
* Clear and simple UI - with a colour scheme that can be easily changed.
* Contrast - text and focused elements passes at least AA or AAA standard
* Many users use browser settings to enlarge text - these pages allow this, rather than hinder it. (no fixed sizes)

### [Details](https://github.com/ellohez/GL-Project#details)
* Keyboard navigation - for users who cannot use a mouse/trackball.
* Contrast which meets at least WC3 WCAG 2.1 AA for text, graphical objects and user interface components.
-- https://webaim.org/resources/contrastchecker/
* Password visibility toggles help users with dyslexia.
* Validation checklist is a custom made component, can be used by each page.
* Uses shape to indicate pass or fail, rather than just relying on colour to assist users with red/green colorblindness.
* Short sentences and paragraphs - 25 words per sentence (sentences people can read in one breath) and max 5 lines per paragraph.
* Tick/cross icons are hidden from a screen reader but the messages are accessible to the reader and will read out as “Error - password must contain at least 8 characters or Success.
* Modals are accessible as they don’t cause keyboard navigation to be trapped in the screen behind.
* Easily extendable, adding more pages to this framework is simple.
* Alt-text where appropriate

### [Technologies Used](https://github.com/ellohez/GL-Project#technologies)
- Vite  
- React
-   Redux Toolkit
-   Javascript
-   TypeScript
- HTML
- CSS
- react-router-dom
- Axios
- Jest
- ESLint
- UuidV4
- Git (feature-branch model)
- JSON-server - The backend REST API is currently JSON-server but can be swapped for a different DB/API
-- Run Json-server using npx json-server -p PORTNUM - w data/db.json
-- https://github.com/typicode/json-server

## [Web Fundamentals](https://github.com/ellohez/GL-Project#webfundamentals)

-   Responsive styling
-   CSS styling - without Tailwind etc.
-   Semantic HTML
-   Accessibility - Aims to comply to WC3 WCAG 2.1 level AA or above

## [Installation](https://github.com/ellohez/GL-Project#installation)

### [Prerequisites](https://github.com/ellohez/GL-Project#prerequisites)

-   Ensure you have installed latest versions of:
    -   Node.js (18.16.0 onwards)
    -   npm (9.5.1 onwards)

### [Clone the repository](https://github.com/ellohez/GL-Project#clone-the-repository)

-   use git to clone this repo to your local environment
#### [Install dependencies](https://github.com/ellohez/GL-Project#install-dependencies)

```
npm install

```

Run tests

```
npm test

```

Run tests with coverage repot

```
npm run coverage

```

Start the server

```
npm start
```

## [Future work](https://github.com/ellohez/GL-Project#future)

- Refactor, split into smaller components 
- Make more use of TypeScript


