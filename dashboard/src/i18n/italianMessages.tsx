import italianMessages from '@smartcommunitylab/ra-language-italian';

const messages = {
    ...italianMessages,
    login: {
        basicMessage: 'Autenticarsi per continuare',
        title: 'Resource Manager',
        message: 'Accedi con AAC',
    },
    resources: {
        domain:{
            search: "Ricerca dominio",
            title: "Titolo",
            back:"Domini"
        },
        user:{
            menu:"Utenti"
          },
        educator:{
            menu:"Educatori",
            firstname:"Nome",
            lastname:"Cognome",
            email:"Email"
        },
        learner:{
            menu:"Studenti",
            firstname:"Nome",
            lastname:"Cognome",
            email:"Email"
        },
          concept: {
            menu:"Concetti"
          },
          
        competence: {
            title: "Titolo",
            description: "Descrizione",
            menu:"Competenze"

          },
          activity: {
            menu: "Attivitá"
        },
        scenario:{
            back:"Scenari",
            menu: "Scenari"

        },
        modulo:{
            back:"Moduli",
            menu: "Moduli"

        },
        fragments: {
            menu:"Fragment",
            back: "Fragment",
          },
          composedActivity: {
            menu:"Attivitá composta",
            back: "Attivitá composta",
          },
          },
          activity: {
            menu:"Attivitá",
            back: "Attivitá",
          }

};

export default messages;