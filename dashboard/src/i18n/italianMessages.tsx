import italianMessages from "@smartcommunitylab/ra-language-italian";

const messages = {
  ...italianMessages,
  login: {
    basicMessage: "Autenticarsi per continuare",
    title: "Resource Manager",
    message: "Accedi con AAC",
  },
  resources: {
    info:{
      menu:"Informazioni"
    },
    domain: {
      search: "Ricerca dominio",
      title: "Titolo",
      back: "Domini",
    },
    user: {
      menu: "Utenti",
    },
    educator: {
      menu: "Educatori",
      firstname: "Nome",
      lastname: "Cognome",
      nickname: "Nickname",
      email: "Email",
      empty:"Nessun educatore presente",
      addOne:"Vuoi aggiungerne uno?"
    },
    learner: {
      menu: "Studenti",
      firstname: "Nome",
      lastname: "Cognome",
      nickname: "Nickname",
      email: "Email",
      empty:"Nessuno studente presente",
      addOne:"Vuoi aggiungerne uno?"
    },
    concept: {
      menu: "Concetti",
    },

    competence: {
      title: "Titolo",
      description: "Descrizione",
      type:"Tipo",
      menu: "Competenze",
      knowledgeSelection:{
        knowledge:"Conoscenza"
      },
      empty:"Nessuna competenza presente",
      addOne:"Vuoi aggiungerne una?"
    },
    externalActivity: {
      back: "Attivitá esterna",
      menu: "Attivitá esterna",
      typeSelection:{
        individual: "Individuale"
      },
      toolSelection:{
        computer: "Computer"
      },
      difficultySelection: {
        low:"Bassa"
      },
      empty:"Nessuna attivitá esternapresente",
      addOne:"Vuoi aggiungerne una?"
    },
    scenario: {
      back: "Scenari",
      menu: "Scenari",
      empty:"Nessuno scenario presente",
      addOne:"Vuoi aggiungerne uno?"
    },
    modulo: {
      back: "Moduli",
      menu: "Moduli",
      empty:"Nessun modulo presente",
      addOne:"Vuoi aggiungerne uno?"
    },
    fragment: {
      menu: "Fragment",
      back: "Fragment",
      empty:"Nessun frammento presente",
      addOne:"Vuoi aggiungerne uno?"
    },
    composedActivity: {
      menu: "Attivitá composta",
      back: "Attivitá composta",
      title:"Titolo",
      description:"Descrizione",
      empty:"Nessuna attivitá composta presente",
      addOne:"Vuoi aggiungerne una?"
    },
    activity: {
      menu: "Attivitá",
      back: "Attivitá",
      empty:"Nessuna attivitá  presente",
      addOne:"Vuoi aggiungerne una?"
    },
  },

};

export default messages;
