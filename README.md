# WTWR (What to Wear?): Front End

The WTWR Front End is a React application bootstrapped with Vite that consumes the WTWR Back End API to provide an interactive user interface. It enables the following features:

### User authentication & profile

- **RegisterModal**: Sign up new users with `name`, `avatar` (URL), `email`, and `password`
- **LoginModal**: Sign in existing users and store JWT in `localStorage`
- **CurrentUserContext**: Global context for storing and accessing the current user’s data
- **ProtectedRoute**: Redirects unauthorized users away from protected pages (e.g. `/profile`)

### Clothing items UI

- **Main page**: Displays all clothing items fetched from `GET /items`
- **AddItemModal**: Create new items (protected; requires valid JWT) with `name`, `weather`, and `imageUrl`
- **ItemModal**: View item details, like/unlike items (`PUT`/`DELETE /items/:itemId/likes`), and delete your own items (`DELETE /items/:itemId`)
- **ClothesSection**: Shows the items added by the current user on their profile page alongside the default items

### State management & data flow

- **React Context API**: Manages `currentUser`, `isLoggedIn`
- **auth.js**: Helper functions for `/signup`, `/signin`, and `/users/me` API calls
- **api.js**: Wrapper for all other REST API requests, automatically attaches JWT when present

## Technologies & Techniques Used

- **React & Vite**: Fast dev server and modern build tooling
- **React Router**: Declarative routing for multi-page UX
- **Context API**: Lightweight state management for auth
- **Fetch API**: Native HTTP client for RESTful requests
- **ESLint & Prettier**: Code quality and formatting enforcement
- **CSS Modules / Plain CSS**: Component-scoped styling

---

## Links

The front end communicates with the back end API at:  
https://github.com/ExpiredSunshine/se_project_express

- [Figma Design](https://www.figma.com/file/DTojSwldenF9UPKQZd6RRb/Sprint-10%3A-WTWR)

- [Live Demo] (https://expiredsunshine.github.io/se_project_react/)
