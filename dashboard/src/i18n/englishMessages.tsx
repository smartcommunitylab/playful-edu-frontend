import englishMessages from "ra-language-english";

const messages = {
  ...englishMessages,
  login: {
    basicMessage: "Authenticate to continue",
    title: "Resource Manager",
    message: "Access with AAC",
  },
  resources: {
    info: {
      menu: "Information",
    },
    domain: {
      search: "Search domain",
      title: "Title",
      back: "Domains",
    },
    user: {
      menu: "Users",
    },
    educator: {
      menu: "Educators",
      firstname: "Name",
      lastname: "Lastname",
      nickname: "Nickname",

      email: "Email",
      empty: "No Educators yet",
      addOne: "Do you want to add one?",
    },
    learner: {
      menu: "Learners",
      firstname: "Name",
      lastname: "Lastname",
      nickname: "Nickname",

      email: "Email",
      empty: "No Learner yet",
      addOne: "Do you want to add one?",
    },
    concept: {
      menu: "Concepts",
    },
    competence: {
      title: "Title",
      description: "Description",
      type: "Type",
      menu: "Competences",
      empty: "No Competences yet",
      addOne: "Do you want to add one?",
      knowledgeSelection:{
        knowledge:"Knowledge"
      },
    },
    
    externalActivity: {
      menu: "External Activities",
      back: "External Activities",
      empty: "No External Activities yet",
      addOne: "Do you want to add one?",
      typeSelection:{
        individual: "Individual"
      },
      toolSelection:{
        computer: "Computer"
      },
      difficultySelection: {
        low:"Low"
      },
    },
    scenario: {
      back: "Scenarios",
      menu: "Scenarios",
      empty: "No Learning Scenario yet",
      addOne: "Do you want to add one?",
    },
    modulo: {
      menu: "Modules",
      back: "Modules",
      empty: "No Module yet",
      addOne: "Do you want to add one?",
    },
    fragment: {
      menu: "Fragment",
      back: "Fragment",
      empty: "No Fragment yet",
      addOne: "Do you want to add one?",
      typeSelection: {
        singleton: "Singleton",
        set: "Set",
        list: "List"
      }
    },
    activity: {
      menu: "Activities",
      back: "Activities",
      empty: "No Activities yet",
      addOne: "Do you want to add one?",
      typeSelection: {
        concrete:"Concrete",
        abstract:"Abstract",
        group:"Group"
      }
    },
  },
};

export default messages;
