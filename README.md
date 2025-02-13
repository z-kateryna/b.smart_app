# Micro learning app "b.smart"

## Overview

The app takes social media "scrolling" model that a lot of social media users hooked up on and allows them to substitute it with bite-size learning on choosen topics.

### Problem Space

Many people spend hours mindlessly consuming content that provides instant gratification but little long-term value. This constant dopamine-driven cycle can make it difficult for users to focus on meaningful learning and self-improvement.
b.smart app offers an alternative by leveraging the same engaging feed-based format but replacing mindless scrolling with micro-learning content. Instead of short-lived entertainment, users gain knowledge in small, digestible chunks that fit into their daily routines. This approach makes learning feel as effortless and rewarding as social media, but with a lasting impact.

### User Profile

App is designed for busy individuals who value productivity and self-improvement but struggle to find time for traditional learning. These users often find themselves caught in the habit of mindless scrolling and want a meaningful alternative that fits seamlessly into their daily lives. For example:
- young professionals who want to upskill efficiently.
- students looking for quick, engaging learning sessions.
- lifelong learners who enjoy bite-sized knowledge without the commitment of full courses.
- time-conscious individuals who prefer to make the most of small pockets of free time.

Special Considerations:
- Must be engaging: Content needs to be visually appealing and concise to compete with social media.
- Easy to consume: Lessons should be short (1-5 minutes) to fit into micro-moments.
- Low cognitive load: The interface should be intuitive and distraction-free.
- Offline accessibility: Some users may want to learn without an internet connection(something to think about in the future).

### Features

As a user, I want to set up my preferred learning topics,
So that I can replace mindless scrolling with content that interests me.
    Acceptance Criteria:
    Users can choose from predefined learning topics.
    Users can search for and select specific topics of interest.
    The app serves a randomized feed of bite-sized information based on selected topics.
    Personalized Learning Feed

As a user, I want to see a continuous feed of short learning snippets,
So that I can consume knowledge in an engaging and effortless way.
Acceptance Criteria:

The feed presents micro-learning content in a scrollable format.
Content is randomized within the user’s selected topics.
The app prevents repetition of recently viewed content.

## Implementation

Core Features & Components:

- Topic Selection Page
- Allows users to pick predefined topics or search for custom ones.
- Saves selected topics in local storage or a database.
- Feed Component
- Generates a scrollable feed based on user-selected topics.
- Displays randomized bite-sized learning content.

### Tech Stack

Frontend: React;
Backend: Node.js with Express (custom API);
Database: Mysql;

### APIs

Will create custom API, if have time try use ChatGPT API

### Sitemap

Homepage: step 1 - choose general topic/(topics in v2);
Homepage: step 2 - choose specific topic;
Feedpage: step 2 - get learning feed, that you can scrol;
Feedpage: step 3 - add functionality to like/dislike posts.

### Mockups

See included mock ups and user flows for visul reference (assets folder).

### Data

See the data relationships diagram for a visual reference in the assets folder. I will need to have:

General topics files and a route
Sorted specific topics files and a route
Sorted feed files and a route
An algorithm to handle user likes/dislikes.

### Endpoints

List endpoints that your server will implement, including HTTP methods, parameters, and example responses.
1.  Get General Topics: GET /api/topics
response: {
  "topics": [
    { "id": 1, "name": "Science", "icon": "🔬" },
    { "id": 2, "name": "History", "icon": "📜" },
    { "id": 3, "name": "Technology", "icon": "💻" }
  ]
}

2. Get Specific Topics: GET /api/topics/:id
response: {
  "id": 1,
  "topic": "Science",
  "subtopics": [
    { "id": 101, "name": "Physics" },
    { "id": 102, "name": "Biology" },
    { "id": 103, "name": "Astronomy" }
  ]
}

3. Get Feed Content: GET /api/feed/:id
response: {
  "id": 101,
  [
    { "id": 201, "title": "Newton's Laws Explained", "content": "Newton's first law states..." },
    { "id": 202, "title": "How Cells Work", "content": "Cells are the basic building blocks of life..." }
  ]
}

4. Handle Likes & Dislikes: POST /api/feedback
Object body:
{
  "userId": "user123",
  "contentId": 201,
  "action": "like" // or "dislike"
}

5. Save User Preferences POST /api/user/preferences
Object body:
{
  "userId": "user123",
  "selectedTopics": [1, 2, 3]
}

## Roadmap

See assets folder for visual reference.

---

## Future Implementations
For the next version I would like to implement progress bar at the top, so users can see their progress, auth, users profile, and see if I can leverage AI to generate learning content.

