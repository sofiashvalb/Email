# Email Web Application

**A single-page web application built using Django and front-end JavaScript. 
It simulates the functionality of a modern email client—complete with inbox, sent mail, archived messages, 
and the ability to compose and reply to emails—all without rerouting or reloading pages.**

This project highlights dynamic content rendering using JavaScript to create an intuitive and responsive user experience.
All views are handled on a single template using DOM manipulation and API interactions.

---

## Features

- **Inbox** – View received emails with sender, subject, and timestamp
- **Sent Mail** – See all emails you’ve sent
- **Archive** – Archive or unarchive messages to keep your inbox clean
- **Compose Email** – Send new messages to other users
- **Reply Functionality** – Easily respond to any message with pre-filled data
- **Dynamic Single-Page Behavior** – All content changes dynamically without page reloads or navigation

---

## Tech Stack

- **Backend:** Django (Python)
- **Frontend:** HTML, CSS, JavaScript
- **Database:** SQLite (via Django ORM)
- **API:** Django views exposing JSON endpoints

---

## Highlights

- **Single Page App (SPA) Experience:**  
  All interactions (switching views, sending emails, archiving, replying) are handled within **one template**. No full page reloads.

- **DOM Manipulation with JavaScript:**  
  Clicking "Inbox", "Sent", "Archived", or "Compose" toggles visibility of sections on the same page using JavaScript event listeners and element manipulation.

- **API Integration:**  
  JavaScript fetch requests interact with Django API endpoints to send, receive, and modify emails in real time.

- **Stateful UI Updates:**  
  Buttons change dynamically (e.g., archive/unarchive), and read status is reflected visually after clicking an email.


