# Authorization Demo

This demo project shows how to conditionally run an authorization process based
on whether a context is injected into the browser. When no context is injected,
clicking the "Click Me!" button performs a normal action. When context is
injected (via the console), clicking the button triggers an authorization
process that requires terminal-based human approval on the backend.

See the demo [here](https://youtu.be/jbOWS2KHTGk)

## Overview

### Front-End (HTML + JavaScript)

- **Context Injection:**  
  A helper function (`injectContext()`) is available in the browser console.
  Running this function injects a global context (`window.myAppContext`) with
  details like user ID, session token, and requested scope.

- **Button Behavior:**  
  The page dynamically creates a "Click Me!" button.  
  - **Without injected context:** Clicking the button executes a normal action
    (e.g., displaying an alert).
  - **With injected context:** Clicking the button sends a POST request to a
    backend endpoint (`/authorize`) with the context. The backend then requires
    human (terminal) approval before proceeding with the secure action.

### Back-End (Node.js with Express & Terminal Approval)

- **Server Functionality:**  
  The Node.js backend listens on port 3005 and exposes an `/authorize` endpoint.
  
- **Terminal-Based Approval:**  
  When an authorization request is received, the backend prints the request details to the terminal and uses the Node `readline` module to prompt the operator for approval.  
  - Typing `yes` approves the request.
  - Typing `no` denies the request.

- **Response:**  
  The backend responds with a JSON object indicating whether the request was
  authorized (`{ authorized: true }` or `{ authorized: false }`).

## Getting Started

### Prerequisites

- **Node.js:** Ensure Node.js is installed on your system.
- **Browser:** Any modern browser (Chrome, Firefox, etc.) to open the front-end
  HTML page.

### Back-End Setup

1. **Create and Initialize the Project:**

   ```bash mkdir authorization-backend cd authorization-backend npm init -y npm
   install express body-parser

## What's Next:

This is a super simple proof of context. There's a lot of work to do to build the context layer and to provide tooling for services to integrate it with their website.
