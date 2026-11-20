# Requirements — To-Do List Dashboard

## Requirements

### 1. Greeting & Clock

**User Story:** As a user, I want to see the current time, date, and a personalized greeting, so that I always know what time it is when I open the dashboard.

#### Acceptance Criteria

1. WHEN the page loads
   THE SYSTEM SHALL display the current time in HH:MM:SS format, updating every second

2. WHEN the page loads
   THE SYSTEM SHALL display the full current date (weekday, month, day, year)

3. WHEN the current hour is between 05:00 and 11:59
   THE SYSTEM SHALL display "Good morning"

4. WHEN the current hour is between 12:00 and 16:59
   THE SYSTEM SHALL display "Good afternoon"

5. WHEN the current hour is between 17:00 and 20:59
   THE SYSTEM SHALL display "Good evening"

6. WHEN the current hour is between 21:00 and 04:59
   THE SYSTEM SHALL display "Good night"

---

### 2. Focus Timer

**User Story:** As a user, I want a 25-minute focus timer with Start, Stop, and Reset controls, so that I can manage my work sessions using the Pomodoro technique.

#### Acceptance Criteria

1. WHEN the page loads
   THE SYSTEM SHALL display a timer set to 25:00

2. WHEN the user clicks Start
   THE SYSTEM SHALL begin counting down from the current remaining time

3. WHEN the user clicks Stop
   THE SYSTEM SHALL pause the countdown without resetting it

4. WHEN the user clicks Reset
   THE SYSTEM SHALL restore the timer to 25:00 and stop any active countdown

5. WHEN the timer reaches 00:00
   THE SYSTEM SHALL stop the countdown and display a completion message

6. WHEN the timer reaches 00:00
   THE SYSTEM SHALL send a browser notification if permission has been granted

---

### 3. To-Do List

**User Story:** As a user, I want to add, edit, complete, and delete tasks, so that I can track what I need to do and what I have finished.

#### Acceptance Criteria

1. WHEN the user submits a non-empty task via the form
   THE SYSTEM SHALL add the task to the top of the list

2. WHEN the user checks a task's checkbox
   THE SYSTEM SHALL mark the task as done with a strikethrough style

3. WHEN the user clicks the edit button on a task
   THE SYSTEM SHALL open a modal pre-filled with the task's current text

4. WHEN the user saves the modal
   THE SYSTEM SHALL update the task text in the list

5. WHEN the user clicks the delete button on a task
   THE SYSTEM SHALL remove that task from the list

6. WHEN the user clicks "Clear done"
   THE SYSTEM SHALL remove all completed tasks from the list

7. WHEN the task list changes
   THE SYSTEM SHALL update the remaining vs total task count

8. WHEN the page loads
   THE SYSTEM SHALL restore all tasks from Local Storage

9. WHEN any task is added, edited, completed, or deleted
   THE SYSTEM SHALL save the updated list to Local Storage

---

### 4. Quick Links

**User Story:** As a user, I want to save and access my favorite website links from the dashboard, so that I can open them quickly without searching.

#### Acceptance Criteria

1. WHEN the user submits a name and URL via the link form
   THE SYSTEM SHALL add a new link button to the grid

2. WHEN a link button is clicked
   THE SYSTEM SHALL open the URL in a new browser tab

3. WHEN a link is added
   THE SYSTEM SHALL attempt to display the site's favicon next to the link name

4. WHEN the user clicks the delete button on a link
   THE SYSTEM SHALL remove that link from the grid

5. WHEN the page loads for the first time with no saved links
   THE SYSTEM SHALL pre-load four default links: Google, GitHub, YouTube, MDN Docs

6. WHEN the page loads
   THE SYSTEM SHALL restore all links from Local Storage

7. WHEN any link is added or deleted
   THE SYSTEM SHALL save the updated list to Local Storage

---

### 5. Technical Constraints

**User Story:** As a developer, I want the app built with plain HTML, CSS, and vanilla JavaScript, so that it runs in any modern browser without a build step or server.

#### Acceptance Criteria

1. WHEN the project is built
   THE SYSTEM SHALL use only HTML, CSS, and vanilla JavaScript — no frameworks or libraries

2. WHEN the project is built
   THE SYSTEM SHALL contain exactly one CSS file inside `css/` and one JS file inside `js/`

3. WHEN the app is opened
   THE SYSTEM SHALL work correctly in Chrome, Firefox, Edge, and Safari

4. WHEN data is stored
   THE SYSTEM SHALL use only the browser Local Storage API — no backend required
