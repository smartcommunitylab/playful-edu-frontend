import italianMessages from "@dslab/ra-language-italian";

const messages = {
  ...italianMessages,
  login: {
    basicMessage: "Autenticarsi per continuare",
    title: "Resource Manager",
    message: "Accedi con AAC",
  },
  titlePages:{
    domains:{
      list:"Domini",
      edit:"Modifica Dominio",
      create:"Crea Dominio",
      show:"Dettaglio Dominio",
      empty:"Nessun dominio presente",

    },
    educators:{
      list:"Educatori",
      edit:"Modifica Dominio",
      create:"Crea Dominio",
      show:"Dettaglio Dominio",
      empty:"Nessun educatore presente",

    },
    learners:{
      list:"Domini",
      edit:"Modifica Dominio",
      create:"Crea Dominio",
      show:"Dettaglio Dominio",
      empty:"Nessuno studente presente",

    },
    concepts:{
      list:"Domini",
      edit:"Modifica Dominio",
      create:"Crea Dominio",
      show:"Dettaglio Dominio"
    },
    competences:{
      list:"Domini",
      edit:"Modifica Dominio",
      create:"Crea Dominio",
      show:"Dettaglio Dominio"
    },
    externalActivities:{
      list:"Domini",
      edit:"Modifica Dominio",
      create:"Crea Dominio",
      show:"Dettaglio Dominio"
    },
    learningScenarios:{
      list:"Domini",
      edit:"Modifica Dominio",
      create:"Crea Dominio",
      show:"Dettaglio Dominio"
    },
    modules:{
      list:"Domini",
      edit:"Modifica Dominio",
      create:"Crea Dominio",
      show:"Dettaglio Dominio"
    },
    learningFragments:{
      list:"Domini",
      edit:"Modifica Dominio",
      create:"Crea Dominio",
      show:"Dettaglio Dominio"
    },
    activities:{
      list:"Domini",
      edit:"Modifica Dominio",
      create:"Crea Dominio",
      show:"Dettaglio Dominio"
    }

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
      addOne:"Vuoi aggiungerne uno?",
      typeSelection: {
        singleton: "Singola",
        set: "Insieme",
        list: "Lista"
      }
    },
    
    activity: {
      menu: "Attivitá",
      back: "Attivitá",
      empty:"Nessuna attivitá  presente",
      addOne:"Vuoi aggiungerne una?",
      typeSelection: {
        concrete:"Concreta",
        abstract:"Astratta",
        group:"Gruppo"
      }
    },
  },

};

export default messages;
