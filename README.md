<video src="https://github.com/MiladSadeghi/Jerskits/assets/28757191/473dd6f0-1eca-48c0-bd1c-f2ee5f3b4b1a" type="video/mov"></video>

<h1 align="center">Jerskits</h1>

<p align="center">A comprehensive MERN app delivering seamless sports jersey shopping with authentication, personalized bag and favorites, secure checkout, and user profiles for an all-inclusive experience.</p>

<h3 style="font-weight: bold;" align="center">
  <a  href="https://jerskits.miladsdgh.ir">DEMO</a>
</h3>

<div align="center">

![License](https://img.shields.io/github/license/miladsadeghi/jerskits.svg?style=for-the-badge)
[![Website](https://img.shields.io/website-up-down-green-red/http/jerskits.miladsdgh.ir.svg?style=for-the-badge)](https://jerskits.miladsdgh.ir)
![GitHub code size in bytes](https://img.shields.io/github/languages/code-size/miladsadeghi/jerskits?style=for-the-badge)
![GitHub language count](https://img.shields.io/github/languages/count/miladsadeghi/jerskits?style=for-the-badge)
![GitHub top language](https://img.shields.io/github/languages/top/miladsadeghi/jerskits?style=for-the-badge)
[![X (formerly Twitter) Follow](https://img.shields.io/twitter/follow/milsdgh?style=social)](https://twitter.com/milSdgh?ref_src=twsrc%5Etfw)
[![Netlify Status](https://api.netlify.com/api/v1/badges/bd1a1b74-6f73-446e-af17-42f7bad866ba/deploy-status)](https://app.netlify.com/sites/eclectic-gnome-18731d/deploys)

</div>

## Table of Contents

- [Introduction](#-introduction)
- [Features](#-features)
- [Inspiration](#-inspiration)
- [Folder Structure](#-folder-structure)
  - [Client](#client)
  - [Server](#server)
- [Tech Stack](#-tech-stack)
- [Getting Started](#-getting-started)
  - [Environment Variables](#environment-variables)
  - [Development](#development)
  - [Production](#production)
  - [Running Tests](#running-tests)
- [How to Contribute](#-how-to-contribute)
- [License](#-license)
- [Contact](#-contact)

## ⭐ Introduction

Welcome to jerskits! This application is built using the MERN stack with a TDD approach. It aims to provide users with an intuitive and seamless shopping experience for football and basketball team jerseys. You can explore the variety of jerseys using advanced filters, read cloth descriptions, and choose the specific size you want. Add your selected jerseys to your bag or save them to your favorite list for future purchase. The checkout steps are secure and easy, ensuring you can trust the payment process. Don't forget, once your orders arrive, submit a review for the received products!

<h6>**Please note:** Jerskits is a portfolio project and is not intended for actual commercial use; it simulates an e-commerce environment purely for demonstration and educational purposes.</h6>

## 💡 Inspiration

I'm always eager to learn something, and I always try to improve my skills. I connect my learning with my projects. I like challenges and enjoy solving any problem or, at least, trying. If I want to learn something, I will build a project with that specific thing. that specific thing can be a tool, package, etc.

For example, my goal with building Jerskits is to learn how to write tests with a TDD approach (my previous projects were made with the same purpose). Jerskits is my first application where I've implemented tests. However, it's not fully covered yet; as of 1/12, it's around 40-45%. I plan to improve it with additional features. My focus in Jerskits is on the front-end side. While I'm primarily a front-end developer, I also do some back-end coding, but it's not as efficient as that of a dedicated backend developer. I do it for my personal projects, so I don't really care if there are any problems or not :).

Another one of my goals is to work more with React, TypeScript, and any packages that can be used to enhance the development experience. For instance, I use a lot of packages, but I've realized that some of them are too heavy. This has led me to remove them and create my own solutions. It's been a valuable lesson for me. Some packages might make your life easier, but it's not always worth it.

I've also encountered challenges with animations. While Framer Motion is a good package for animation, it's hard to get used to. Just for the landing page header, it took me a month to implement.

The last lesson I've learned is about using Redux, Redux Toolkit, and Redux Toolkit Query. In my opinion, all of them are useless; they just make the project size bigger. Instead of Redux, I could use Zustand or Jotai, and for handling fetch requests, I could use React-Query (Tan Stack version). However, I'm in the middle of development, so I can't make these changes now.

There must be a lot of lessons, but due to ADHD, I don't remember anything else :)

## ✨ Features

- **User Authentication**: Jerskits employs secure JWT-based authentication, enabling users to create accounts, log in, and access their personalized profiles with ease. Access tokens and refresh tokens are utilized for authorization, ensuring seamless and secure user interactions.<br>
- **Product Catalog**: Jerskits offers a curated selection of sporting apparel for men, women, and kids, featuring everything from jerseys and shorts to team merchandise. Explore the latest trends and player designs, easily filtered by brand, size, color, price and more. Our intuitive filters help you find your perfect gear in seconds, putting the power of personalization in your hands..<br>
- **Product Details**: View detailed information about each product, including images and descriptions.<br>
- **Shopping Bag**: Easily add desired items to your shopping bag, conveniently manage quantities and sizes, and proceed to checkout with a streamlined process. A dedicated modal allows you to review your cart, make adjustments, and finalize your purchase.<br>
- **Checkout Experience**: Embark on a seamless checkout journey with Jerskits. Step through four distinct stages: Account Information, Delivery Details, Billing Information, and Payment. Each step undergoes rigorous client-side and server-side validation, ensuring a secure and reliable payment experience.<br>
- **Orders History**: Maintain complete control of your purchases with Jerskits' comprehensive order history. View your order details, track the status of your ongoing orders, and submit reviews for items you've already received.<br>
- **Code that shines**: Jerskits is built with TDD principles, employing Jest and Vitest to meticulously test each component, resulting in robust and reliable code.
- **Responsive Design**: Enjoy a consistent and visually appealing experience across various devices.<br>
- **User Experience**: You might notice initial load on opening new pages. This is intended for caching the page data for fast loads in the future.<br>
- **Performance**: Better performance and accessibility.<br>

## 📂 Folder Structure

Here's an overview of the project's folder structure:

<details>
  <summary>Server</summary>
  ```
  Server
  ├───images                # User avatars will upload here
  └───src
      ├───api
      │   ├───controller
      │   ├───errors        # API errors
      │   ├───middleware
      │   ├───models        # Database models
      |   └───routes
      ├───config            # App and router configurations
      ├───log               # Logs will be stored here
      └───utils             # Validation and functions
  ```
</details>

<details>
  <summary>Client</summary>
  ```
  Client
  ├───public
  │   ├───fonts
  │   └───images                            # Static svgs, images, etc.
  └───src
      ├───App                               # Redux store setup
      │   └───feature                       # Redux slices
      │       ├───auth
      │       └───profile
      ├───components                        # Reusable components
      │   ├───Accordion
      │   ├───Avatar
      │   ├───Button
      │   ├───Checkout
      │   ├───Dropdown
      │   ├───FilterBar
      │   │   └───components
      │   ├───Footer
      │   ├───Form
      │   ├───FullScreenLoader
      │   ├───Input
      │   ├───Navbar
      │   ├───Order
      │   ├───Popups
      │   ├───Products
      │   ├───ProfileLink
      │   └───Review
      ├───hooks                               # Custom hooks
      ├───icons                               # Custom icons
      ├───layouts
      │   ├───AuthLayout
      │   └───ProfileLayout
      ├───modals
      ├───pages
      │   ├───Checkout
      │   ├───Landing
      │   │   └───components
      │   │       ├───Header
      │   │       └───KidCollection
      │   ├───Product
      │   │   └───components
      │   ├───Profile
      │   │   ├───Edit
      │   │   └───Favorites
      │   ├───SignIn
      │   └───SignUp
      ├───services                            # API routes
      ├───shared
      │   └───types
      ├───test                                # Test setup
      │   └───mocks                           # API routes mock
      └───utils                               # Util functions
  ```

</details>

## 💻 Tech Stack

### Client

> ⚠️ I have used many packages, but due to their large sizes, I need to remove them and create my own solutions. The removed packages include react-select, swipperjs, hook packages, twin macro, styled components, and others.

<table>
  <tr>
    <th>Tech</th>
    <th>What for</th>
  </tr>
  <tr>
    <td><a href="https://www.typescriptlang.org/">typescript</a></td>
    <td>Make coding fun again.</td>
  </tr>
  <tr>
    <td><a href="https://reactjs.org/">react</a></td>
    <td>Build a component based user interface.</td>
  </tr>
  <tr>
    <td><a href="https://tailwindcss.com/">tailwindCSS</td>
    <td>Fast & powerful way to build a beautiful UI.</td>
  </tr>
  <tr>
  <tr>
    <td><a href="https://github.com/lukeed/clsx">clsx</td>
    <td>Creating conditional className strings</td>
  </tr>
  <tr>
    <td><a href="https://github.com/lukeed/clsx">tailwind-merge</td>
    <td>Merge tailwindCSS classes without style conflicts.</td>
  </tr>
  <tr>
    <td><a href="https://framer.com/motion">framer-motion</a></td>
    <td>Build animations with ease.</td>
  </tr>
  <tr>
    <td><a href="https://react-hot-toast.com">react-hot-toast</a></td>
    <td>Show notifications.</td>
  </tr>
  <tr>
    <td><a href="https://github.com/dvtng/react-loading-skeleton">react-loading-skeleton</a></td>
    <td>Make beautiful, animated loading skeletons.</td>
  </tr>
  <tr>
    <td><a href="https://github.com/tajo/react-range">react-range</a></td>
    <td>Range input with a slider.</td>
  </tr>
  <tr>
    <td><a href="https://redux-toolkit.js.org/">@reduxjs/toolkit</a></td>
    <td>Simplifies the Redux development process, also using rtk query for handle apis.</td>
  </tr>
  <tr>
    <td><a href="https://react-redux.js.org/">react-redux</a></td>
    <td>State container</td>
  </tr>
  <tr>
    <td><a href="https://reactrouter.com/en/main">react-router-dom</a></td>
    <td>Implement dynamic routing.</td>
  </tr>
  <tr>
    <td><a href="https://adexin.github.io/spinners/">spinners-react</a></td>
    <td>Loading spinners</td>
  </tr>
  <tr>
    <td><a href="https://github.com/jquense/yup">yup</a></td>
    <td>Build form schema for validation</td>
  </tr>
  <tr>
    <td><a href="https://mswjs.io/">msw</a></td>
    <td>Mock api routes for tests</td>
  </tr>
  <tr>
    <td><a href="https://vitest.dev/">vitest</a></td>
    <td>Testing fast much as possible</td>
  </tr>

</table>

### Server

<table>
  <tr>
    <th>Tech</th>
    <th>What for</th>
  </tr>

  <tr>
    <td><a href="https://nodejs.org/">Node JS</a></td>
    <td>Create server-side</td>
  </tr>
  <tr>
    <td><a href="https://expressjs.com/">Express JS</a></td>
    <td>Create RESTful API</td>
  </tr>
  <tr>
    <td><a href="https://github.com/andrewkeig/express-validation">express-validation
</a></td>
    <td>Handle routes errors</td>
  </tr>
  <tr>
    <td><a href="https://express-validator.github.io/">express-validator
</a></td>
    <td>Create validator for routes body</td>
  </tr>
  <tr>
    <td><a href="https://helmetjs.github.io/">helmet.js</a></td>
    <td>Handle routes security</td>
  </tr>
  <tr>
    <td><a href="https://github.com/auth0/node-jsonwebtoken">jsonwebtoken</a></td>
    <td>Use JWT in Node JS</td>
  </tr>
  <tr>
    <td><a href="https://mongoosejs.com/">mongoose</a></td>
    <td>Use MongoDB</td>
  </tr>
  <tr>
    <td><a href="https://github.com/expressjs/morgan">morgan</a></td>
    <td>HTTP request logger</td>
  </tr>
  <tr>
    <td><a href="https://github.com/expressjs/multer">multer</a></td>
    <td>Upload files</td>
  </tr>
  <tr>
    <td><a href="https://github.com/winstonjs/winston">winston</a></td>
    <td>Log requests</td>
  </tr>
  <tr>
    <td><a href="https://github.com/kelektiv/node.bcrypt.js">bcrypt</a></td>
    <td>Hash passwords</td>
  </tr>
  <tr>
    <td><a href="https://github.com/harpreetkhalsagtbit/country-state-city">country-state-city</a></td>
    <td>Handle location</td>
  </tr>
  </table>

## 🚀 Getting Started

To run this project, you will need to add the following environment variables to your .env's file.

### Environment Variables

### Server

  <table>
    <tr>
      <th>Variable</th>
      <th>Value example</th>
      <th>Description</th>
    </tr>
    <tr>
      <td>NODE_ENV</td>
      <td>development | production</td>
      <td>represents application's environment</td>
    </tr>
    <tr>
      <td>PORT</td>
      <td>3000</td>
      <td>express will run on that PORT</td>
    </tr>
    <tr>
      <td>MONGO_URI</td>
      <td>mongodb+srv://[username:password@]host[/[defaultauthdb]</td>
      <td>MongoDB connection string. its worked with local and cloud (atlas)</td>
    </tr>
    <tr>
      <td>DB_NAME</td>
      <td>jerskits</td>
      <td>MongoDB database name</td>
    </tr>
    <tr>
      <td>ACCESS_TOKEN_SECRET</td>
      <td>94f46a54b693641f562ce82db...</td>
      <td>You can use any random string or generate a new one
      (<a href="https://dev.to/tkirwa/generate-a-random-jwt-secret-key-39j4">article</a>)</td>
    </tr>
    <tr>
      <td>REFRESH_TOKEN_SECRET</td>
      <td>ebaebd23444d3a50f8eafa2ad...</td>
      <td>You can use any random string or generate a new one
      (<a href="https://dev.to/tkirwa/generate-a-random-jwt-secret-key-39j4">article</a>)</td>
    </tr>
    <tr>
      <td>SERVER_URL</td>
      <td>http://localhost:3001</td>
      <td>URL of the server. its could be different in dev or pred</td>
    </tr>
  </table>

### Client

  <table>
    <tr>
      <th>Variable</th>
      <th>Value example</th>
      <th>Description</th>
    </tr>
    <tr>
      <td>VITE_NODE_ENV</td>
      <td>development</td>
      <td>Represents application's environment</td>
    </tr>
    <tr>
      <td>VITE_SERVER_URL</td>
      <td>http://localhost:3001/api</td>
      <td>URL of the server. its could be different in dev or pred. but /api should be added ended of it (except if server deploy port is 80 or 443)</td>
    </tr>
  </table>

## Development

after add environment variables, you should install dependencies then run server and client.

```bash
cd server
npm install <----> yarn
npm run dev <----> yarn dev

cd ../client
npm install <----> yarn
npm run dev <----> yarn dev
```

## Production

if you want to deploy server and client to production, you need do similar steps as above.

```bash
cd server
npm install <----> yarn
npm run start <----> yarn start

cd ../client
npm install <----> yarn
npm run preview <----> yarn preview
```

## Running Tests

to run normal test

```bash
npm run test <---> yarn test
```

to run coverage test:

```bash
npm run test:coverage <---> yarn test:coverage
```

to run ui test:

```bash
npm run test:ui <---> yarn test:ui
```

## 👏 How to Contribute

Contributions are welcome as always, before submitting a new PR please make sure to open a new issue so community members can discuss.

Additionally you might find existing open issues which can helps with improvements.

## 📝 License

This project is licensed under the [MIT License](/LICENSE) . Feel free to use, modify, and distribute the code as per the terms of the license.

## 🤝 Contact

- [Telegram](https://t.me/wsxxsw)
- [Twitter](https://twitter.com/milSdgh)
- [Email](mailto:miladsadeghi2323@gmail.com)
- [Discord](https://discord.com/users/490580342785179678)
