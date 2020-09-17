## Hacker News

Hacker News is a social news website focusing on computer science and entrepreneurship. this a clone implementing some of its features with graphql.

**_Live Demo: [https://maa-hackernews.netlify.app/](https://maa-hackernews.netlify.app/)_**

**_Hacker News GraphQL Api Repository: [https://github.com/maaelattar/hackernews-server](https://github.com/maaelattar/hackernews-server)_**

```
email = foo@email.com
password = foofoo
```

---

## Table of Contents

- [Technologies](#technologies)
- [Installation and Setup Instructions](#installation-and-setup-instructions)
- [GraphQL Querires](#graphQL-querires)
- [GraphQL Mutations](#graphQL-mutations)
- [GraphQL Subscriptions](#graphQL-subscriptions)
- [Project Screen Shots](#project-screen-shots)

## Technologies

- React
- React Router Dom
- Apollo Client
- BootStrap
- React BootStrap

## Installation and Setup Instructions

Installation:

`yarn install`

To Start Server:

`yarn start`

To Visit App:

`localhost:3000`

## GraphQL Querires

**Feed Query**

```graphql
query FeedQuery($take: Int, $skip: Int, $orderBy: LinkOrderByInput) {
  feed(take: $take, skip: $skip, orderBy: $orderBy) {
    links {
      id
      createdAt
      url
      description
      postedBy {
        id
        name
      }
      votes {
        id
        user {
          id
        }
      }
    }
    count
  }
}
```

---

**Search Query**

```graphql
query FeedSearchQuery($filter: String!) {
  feed(filter: $filter) {
    links {
      id
      url
      description
      createdAt
      postedBy {
        id
        name
      }
      votes {
        id
        user {
          id
        }
      }
    }
  }
}
```

## GraphQL Mutations

**Signup Mutation**

```graphql
mutation SignupMutation($email: String!, $password: String!, $name: String!) {
  signup(email: $email, password: $password, name: $name) {
    token
  }
}
```

---

**Login Mutation**

```graphql
mutation LoginMutation($email: String!, $password: String!) {
  login(email: $email, password: $password) {
    token
  }
}
```

---

**Post Mutation**

```graphql
mutation PostMutation($description: String!, $url: String!) {
  post(description: $description, url: $url) {
    id
    createdAt
    url
    description
  }
}
```

---

**Vote Mutation**

```graphql
mutation VoteMutation($linkId: ID!) {
  vote(linkId: $linkId) {
    id
    link {
      id
      votes {
        id
        user {
          id
        }
      }
    }
    user {
      id
    }
  }
}
```

---

## GraphQL Subscriptions

**New Link Subscription**

```graphql
subscription {
  newLink {
    id
    url
    description
    createdAt
    postedBy {
      id
      name
    }
    votes {
      id
      user {
        id
      }
    }
  }
}
```

---

**New Vote Subscription**

```graphql
subscription {
  newVote {
    id
    link {
      id
      url
      description
      createdAt
      postedBy {
        id
        name
      }
      votes {
        id
        user {
          id
        }
      }
    }
    user {
      id
    }
  }
}
```

## Project Screen Shots

- New Links Page

  - Home page redirects to new page
  - ![ New Links Page ](https://res.cloudinary.com/m-a-a/image/upload/v1600311472/hackernews-new_qhxjkp.png)

- Top Page

  - ![ Top Page ](https://res.cloudinary.com/m-a-a/image/upload/v1600311474/hackernews-top_ydvoki.png)

- Search Page

  - ![ Search Page ](https://res.cloudinary.com/m-a-a/image/upload/v1600311472/hackernews-search_ii6vyv.png)

- Submit Page

  - ![ Submit Page ](https://res.cloudinary.com/m-a-a/image/upload/v1600311472/hackernews-submit_emjisc.png)

- Login / Sign Up Page
  - ![ Login Page ](https://res.cloudinary.com/m-a-a/image/upload/v1600311471/hackernews-login_fhcsyh.png)
  - ![ Sign Up Page ](https://res.cloudinary.com/m-a-a/image/upload/v1600311473/hackernews-signup_kxvlft.png)
