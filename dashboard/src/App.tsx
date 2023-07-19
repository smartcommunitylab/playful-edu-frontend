
import { Admin, Layout, Options, Resource, fetchUtils } from 'react-admin';
import appDataProvider  from './dataProvider';
import { MyMenu } from './MyMenu';
import { MyAppBar } from './MyAppBar';
import domains from './domains'
import concepts from './concepts'
import externalActivities from './externalActivities';
import modules from './modules';
import scenarios from './learningScenarios'
import { i18nProvider } from './i18n/i18nProvider';
import competences from './competences';
import learners from './learners';
import educators from './educators';
import fragments from './fragments';
import activities from './activities';
import composedActivities from './composedActivities';
const MyLayout = (props:any) => <Layout {...props} menu={MyMenu}  appBar={MyAppBar} />;
const API_URL: string = process.env.REACT_APP_API_URL as string;
const httpClient = async (url: string, options: Options = {}) => {
    if (!options.headers) {
        options.headers = new Headers({ Accept: 'application/json' }) as Headers;
    } else {
        options.headers = new Headers(options.headers) as Headers;
    }

    // if (authType === AUTH_TYPE_OAUTH) {
    //     const user = await manager.getUser();
    //     if (!user) {
    //         return Promise.reject('OAuth: No user found in store');
    //     }
    //     options.headers.set('Authorization', 'Bearer ' + user.access_token);
    // } else if (authType === AUTH_TYPE_BASIC) {
    //     const basicAuth = sessionStorage.getItem('basic-auth');
    //     if (!basicAuth) {
    //         return Promise.reject('Basic: No user found in store');
    //     }
    //     options.headers.set('Authorization', 'Basic ' + basicAuth);
    // }

    if (!options.headers.has('Accept')) {
        options.headers.set('Accept', 'application/json');
    }

    return fetchUtils.fetchJson(url, options);
};
const dataProvider = appDataProvider("http://localhost:8445/playfuledu/api", httpClient);

export const App = () => (
    <Admin
    layout={MyLayout}
    i18nProvider={i18nProvider}

    // authProvider={authProvider}
    dataProvider={dataProvider}>
        {/* <Resource name="domain" {...domains}></Resource> */}
        <Resource name="domains" {...domains}></Resource>
        <Resource name="educators" {...educators} recordRepresentation="firstname"></Resource>
        <Resource name="learners" {...learners} recordRepresentation="firstname"></Resource>
        <Resource name="concepts" {...concepts}></Resource>
        <Resource name="external-activities" {...externalActivities} recordRepresentation="title"></Resource>
        <Resource name="scenarios" {...scenarios}></Resource>
        <Resource name="competences" {...competences}></Resource>
        <Resource name="concepts" {...concepts} recordRepresentation="title"></Resource>
        <Resource name="modules" {...modules} recordRepresentation="title"></Resource>
        <Resource name="fragments" {...fragments} recordRepresentation="title"></Resource>
        <Resource name="composed-activities" {...composedActivities} recordRepresentation="title"></Resource>
        <Resource name="activities" {...activities} recordRepresentation="title"></Resource>
    </Admin>
);

    