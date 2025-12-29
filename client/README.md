# UniStay – Student Dorm Finder

UniStay is a full-stack dorm management platform for students and dorm owners. It allows users to browse, search, and favorite dorms, while owners can add, manage, and delete dorm listings. The platform is responsive and mobile-friendly.

---

## Table of Contents

1. [Roles](#roles)
2. [Features](#features)
3. [Tech Stack](#tech-stack)
4. [Getting Started](#getting-started)
5. [API Endpoints](#api-endpoints)
6. [Student Functionality](#student-functionality)
7. [Owner Functionality](#owner-functionality)
8. [Image Handling](#image-handling)
9. [Security & Data Integrity](#security--data-integrity)
10. [Available Scripts](#available-scripts)

---

## Roles

UniStay supports two main types of users:

* **Student** – Can browse dorms, search by name/city/university, add dorms to favorites, and update profile.
* **Owner** – Can add, view, and delete their own dorms, in addition to all student functionality.

Each user is assigned a role (`student` or `owner`) stored in the database. Role-based routing ensures access to specific pages.

---

## Features

### Student Features

* Browse all dorms with images and details
* Search dorms by name, city, or university
* Add dorms to favorites
* View and manage favorites
* Update personal profile

### Owner Features

* Add new dorms with multiple images
* View only dorms they own
* Delete their dorms
* All student functionality is also available

---

## Tech Stack

* **Frontend:** React, React Router, Axios, CSS
* **Backend:** Node.js, Express, MySQL, Multer
* **Database:** MySQL
* **Other:** Base64 encoding for images

---
## API Endpoints

## Authentication

POST /signup – Create a new user

POST /login – Login user

## Dorms

POST /addDorm – Add dorm (requires owner_id)

GET /dorms – Get all dorms

GET /dorm/:id – Get dorm details

DELETE /dorms/:id – Delete dorm

GET /dorms/owner/:owner_id – Get dorms owned by a specific user

## Favorites

POST /addFavorite – Add dorm to favorites

GET /favorites/:userId – Get all favorites for a user

## Search

GET /dorms/search?q=QUERY – Search dorms

## User Profile

PUT /users/:id – Update user info
####

## Student Functionality

Students can:

Browse and view all dorms

Search dorms using keywords for name, city, or university

Add dorms to favorites

View their favorite dorms (first image shown)

Update personal information (address, phone)

Access profile pages (/studentprofile, /edit-profile)

## Frontend routes:

Dashboard: /student-dashboard

Favorites: /favorites

Search results: /search?query=...

Dorm details: /dorm-details/:id

## Owner Functionality

Owners can:

Add new dorms using the “Add Dorm” form

Supports multiple images uploaded via Multer

owner_id is included with dorm submission

View only their own dorms using GET /dorms/owner/:owner_id

Delete dorms they own

Students see all dorms globally, but owners see only their own dorms in their dashboard

