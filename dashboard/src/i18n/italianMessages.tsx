import italianMessages from "@dslab/ra-language-italian";
import { importLibraryItalianMessages } from "./importLibraryItalianMessages";

const messages = {
  ...italianMessages,
  ...importLibraryItalianMessages,
  login: {
    basicMessage: "Autenticarsi per continuare",
    title: "Resource Manager",
    message: "Accedi con AAC",
  },
  titlePages: {
    dashboard: "Playful Education",
    domains: {
      list: "Domini",
      edit: "Modifica dominio",
      create: "Crea dominio",
      show: "Dominio",
      delete: "Rimuovi dominio",
    },
    educators: {
      list: "Educatori",
      edit: "Modifica educatore",
      create: "Crea educatore",
      show: "Educatore",
      delete: "Rimuovi educatore",
    },
    learners: {
      list: "Studenti",
      edit: "Modifica studente",
      create: "Crea studente",
      show: "Studente",
      delete: "Rimuovi studente",
    },
    concepts: {
      list: "Concetti",
      edit: "Modifica concetto",
      create: "Crea concetto",
      show: "Concetto",
      delete: "Rimuovi concetto",
    },
    competences: {
      list: "Competenze",
      edit: "Modifica competenza",
      create: "Crea competenza",
      show: "Competenza",
      delete: "Rimuovi competenza",
    },
    externalActivities: {
      list: "Attività esterne",
      edit: "Modifica attività esterna",
      create: "Crea attività esterna",
      show: "Attività esterna",
      delete: "Rimuovi attività esterna",
    },
    learningScenarios: {
      list: "Scenari",
      edit: "Modifica scenario",
      create: "Crea scenario",
      show: "Scenario",
      delete: "Rimuovi scenario",
      learners: {
        show: "Studenti dello scenario",
        edit: "Modifica gli studenti dello scenario",
      },
    },
    modules: {
      list: "Moduli",
      edit: "Modifica modulo",
      create: "Crea modulo",
      show: "Modulo",
      delete: "Rimuovi modulo",
    },
    learningFragments: {
      list: "Frammenti",
      edit: "Modifica frammento",
      create: "Crea frammento",
      show: "Frammento",
      delete: "Rimuovi frammento",
    },
    activities: {
      edit: "Modifica attività",
      create: "Crea attività",
      show: "Attività",
      delete: "Rimuovi attività",
    },
  },
  resources: {
    info: "Informazioni",
    dashboard: {
      welcome: "Benvenuto in Playful Education",
      button: "Lista dei domini",
    },
    domains: {
      title: "Titolo",
      empty: "Nessun dominio presente",
      menu: "Informazioni",
      back: "Domini",
      addOne: "Vuoi aggiungerne uno?",
      singular: "dominio",
      plural: "domini",
    },
    users: {
      menu: "Utenti",
    },
    educators: {
      menu: "Educatori",
      firstname: "Nome",
      lastname: "Cognome",
      nickname: "Nickname",
      email: "Email",
      empty: "Nessun educatore presente",
      addOne: "Vuoi aggiungerne uno?",
      singular: "educatore",
      plural: "educatori",
    },
    learners: {
      menu: "Studenti",
      firstname: "Nome",
      lastname: "Cognome",
      nickname: "Nickname",
      email: "Email",
      empty: "Nessuno studente presente",
      addOne: "Vuoi aggiungerne uno?",
      singular: "studente",
      plural: "studenti",
    },
    concepts: {
      menu: "Concetti",
      title: "Titolo",
      empty: "Nessun concetto presente",
      addOne: "Vuoi aggiungerne uno?",
      singular: "concetto",
      plural: "concetti",
    },
    competences: {
      title: "Titolo",
      description: "Descrizione",
      type: "Tipo",
      concepts: "Concetti",
      menu: "Competenze",
      knowledgeSelection: {
        knowledge: "Conoscenza",
      },
      empty: "Nessuna competenza presente",
      addOne: "Vuoi aggiungerne una?",
      singular: "competenza",
      plural: "competenze",
    },
    externalActivities: {
      menu: "Attività esterne",
      title: "Titolo",
      description: "Descrizione",
      url: "URL",
      type: "Tipo",
      language: "Lingua",
      tool: "Strumento",
      difficulty: "Difficoltà",
      groupCorrelator: "Correlatore di gruppo",
      preconditions: "Prerequisiti",
      effects: "Effetti",
      typeSelection: {
        individual: "Individuale",
      },
      toolSelection: {
        computer: "Computer",
      },
      difficultySelection: {
        low: "Bassa",
      },
      empty: "Nessuna attività esterna presente",
      addOne: "Vuoi aggiungerne una?",
      singular: "attività esterna",
      plural: "attività esterne",
    },
    learningScenarios: {
      back: "Scenari",
      menu: "Scenari",
      title: "Titolo",
      description: "Descrizione",
      language: "Lingua",
      publicScenario: "Scenario",
      publicScenarioOption: {
        public: "Pubblico",
        private: "Privato",
      },
      status: "Stato",
      statusOption: {
        inProgress: "In corso",
        toStart: "Da avviare",
      },
      start: "Avvia",
      statusNotification: {
        success: "Scenario avviato con successo",
        error: "Errore nell'avvio dello scenario",
      },
      educators: "Educatori",
      learners: {
        title: "Studenti",
      },
      empty: "Nessuno scenario presente",
      addOne: "Vuoi aggiungerne uno?",
      singular: "scenario",
      plural: "scenari",
      emptyLearners: "Non sono presenti studenti associati a questo scenario",
      addLearners: "Vuoi aggiungerne qualcuno?",
    },
    modules: {
      back: "Moduli",
      menu: "Moduli",
      title: "Titolo",
      description: "Descrizione",
      level: "Livello",
      dateFrom: "Data di inizio",
      dateTo: "Data di fine",
      empty: "Nessun modulo presente",
      addOne: "Vuoi aggiungerne uno?",
      singular: "modulo",
      plural: "moduli",
    },
    learningFragments: {
      menu: "Frammenti",
      back: "Modulo",
      title: "Titolo",
      type: "Tipo",
      rule: "Regola di completamento",
      minimumNumberOfActivities: "Numero minimo di attività",
      empty: "Nessun frammento presente",
      addOne: "Vuoi aggiungerne uno?",
      typeSelection: {
        singleton: "Singolo",
        set: "Insieme",
        list: "Lista",
      },
      ruleSelection: {
        all: "Tutte le attività",
        at_least: "Almeno un numero minimo",
        at_least_label: "Almeno %{number} attività",
      },
      singular: "frammento",
      plural: "frammenti",
      singletonFragmentError:
        "Modifica non riuscita. Un frammento di tipo singolo deve possedere una sola attività",
      activitiesNotYetLoaded: "Attività non ancora ottenute dal server",
    },
    activities: {
      menu: "Attività",
      back: "Modulo",
      title: "Titolo",
      description: "Descrizione",
      type: "Tipo",
      externalActivity: "Attività esterna",
      goals: "Obiettivi",
      groupCorrelator: "Correlatore di gruppo",
      empty: "Nessuna attività presente",
      addOne: "Vuoi aggiungerne una?",
      typeSelection: {
        concrete: "Concreta",
        abstr: "Astratta",
        group: "Gruppo",
      },
      singular: "attività",
      plural: "attività",
      viewFragmentActivities:
        "Seleziona un frammento per visualizzarne le attività",
    },
    validation: {
      minValue: "Il valore deve esere maggiore o uguale a %{min}",
    },
  },
};

export default messages;
