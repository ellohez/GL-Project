# GL Project
## Introduction
** Key Takeaways - User Registration and Login page website that places the User at the centre by prioritising accessibility, useability and responsiveness.
 
This user-centred project breaks down the registration process into smaller, more manageable steps to reduce congitive load. This can be particularly helpful for users with memory or cognition difficulties and is also a [recommended UX principle](https://growth.design/psychology#cognitive-load) as it eases the user’s perception of how difficult a process is to complete. 

Ensures accessibility by following Web Content Accessibility Guidelines (WCAG), which ask us to consider cognitive adaptations to help users with epilepsy, dyslexia, learning disability and neurodiversity. The small manageable steps combined with the ability to save and continue the process at a later time, can also help users with memory loss. 

Prioritising website accessibility is not only the right thing to do but it also builds customer trust and loyalty. By creating inclusive online experiences, businesses can better serve a wider range of customers and reap the benefits of a more engaged and satisfied customer base.

### Table of Contents
#### [Introduction](https://github.com/ellohez/GL-Project/blob/main/README.md#introduction)
#### [Overall Project Design](https://github.com/ellohez/GL-Project/blob/main/README.md#overall-project-design-1)
#### [Details](https://github.com/ellohez/GL-Project/blob/main/README.md#details-1)
#### [Technologies Used](https://github.com/ellohez/GL-Project/blob/main/README.md#technologies-used-1)
#### [Web Fundamentals](https://github.com/ellohez/GL-Project/blob/main/README.md#web-fundamentals-1)
#### [Installation](https://github.com/ellohez/GL-Project/blob/main/README.md#installation-1)
#### [Future Work](https://github.com/ellohez/GL-Project/blob/main/README.md#future-work-1)

## Overall Project Design
* Multi-step process, indicates steps completed and number steps to complete.
* Allows the user to save and complete the process at a later date.
* Gives the user time to think, isn’t overwhelming and helps the user to pick up where they left off if distracted or forgetful.
* Clear and simple UI - with a colour scheme that can be easily changed.
* Contrast - text and focused elements passes at least AA or AAA standard
* Many users use browser settings to enlarge text - these pages allow this, rather than hinder it. (no fixed sizes)

### Details
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

###  Technologies Used
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

## Web Fundamentals

-   Responsive styling
-   CSS styling - without Tailwind etc.
-   Semantic HTML
-   Accessibility - Aims to comply to WC3 WCAG 2.1 level AA or above

## Installation

### Prerequisites

-   Ensure you have installed latest versions of:
    -   Node.js (18.16.0 onwards)
    -   npm (9.5.1 onwards)

### Clone the repository

-   use git to clone this repo to your local environment
#### Install dependencies
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
npm run dev
```

## Future work

- Refactor, split into smaller components 
- Make more use of TypeScript
- Remove branding
