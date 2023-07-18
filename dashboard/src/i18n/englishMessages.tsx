import englishMessages from "ra-language-english";

const messages = {
  ...englishMessages,
  login: {
    basicMessage: "Authenticate to continue",
    title: "Resource Manager",
    message: "Access with AAC",
  },
  resources: {
    domain: {
      search: "Search domain",
      title: "Title",
      back: "Domains",
    },
    user:{
      menu:"Users"
    },
    educator:{
      menu:"Educators",
      firstname:"Name",
      lastname:"Surname",
      email:"Email"
  },
  learner:{
      menu:"Learners",
      firstname:"Name",
      lastname:"Surname",
      email:"Email"
  },
    concept: {
      menu:"Concepts"
    },
    competence: {
      title: "Title",
      description: "Description",
      menu: "Competences"
    },
    activity: {
        menu: "Activities"
    },
    scenario: {
      back: "Scenarios",
      menu:"Scenarios",
    },
    modulo: {
      menu:"Modules",
      back: "Modules",
    },
    fragment: {
      menu:"Fragment",
      back: "Fragment",
    },
    composedActivity: {
      menu:"Attivitá composta",
      back: "Attivitá composta",
    },
    activitie: {
      menu:"Attivitá",
      back: "Attivitá",
    }
  },
};

export default messages;
