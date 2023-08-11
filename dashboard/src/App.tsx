
import { Admin, Layout, ListButton, Options, Resource, fetchUtils } from 'react-admin';
import {Route, BrowserRouter} from 'react-router-dom';
import appDataProvider  from './dataProvider';
import { MyMenu } from './MyMenu';
import { MyAppBar } from './MyAppBar';
import concepts from './concepts'
import modules from './modules';
import { i18nProvider } from './i18n/i18nProvider';
import competences from './competences';
import fragments from './fragments';
import Card from '@mui/material/Card';
import composedActivities from './composedActivities';
import { EducatorList } from './educators/EducatorList';
import { DomainList } from './domains/DomainList';
import { DomainEdit } from './domains/DomainEdit';
import { DomainCreate } from './domains/DomainCreate';
import { DomainShow } from './domains/DomainShow';
import { EducatorShow } from './educators/EducatorShow';
import { EducatorCreate } from './educators/EducatorCreate';
import { EducatorEdit } from './educators/EducatorEdit';
import { LearnerCreate } from './learners/LearnerCreate';
import { LearnerEdit } from './learners/LearnerEdit';
import { LearnerShow } from './learners/LearnerShow';
import { ConceptCreate } from './concepts/ConceptCreate';
import { ConceptEdit } from './concepts/ConceptEdit';
import { ConceptShow } from './concepts/ConceptShow';
import { ExternalActivityCreate } from './externalActivities/ExternalActivityCreate';
import { ExternalActivityEdit } from './externalActivities/ExternalActivityEdit';
import { ExternalActivityShow } from './externalActivities/ExternalActivityShow';
import { LearningScenarioCreate } from './learningScenarios/LearningScenarioCreate';
import { LearningScenarioEdit } from './learningScenarios/LearningScenarioEdit';
import { LearningScenarioShow } from './learningScenarios/LearningScenarioShow';
import { LearnerList } from './learners/LearnerList';
import { ActivityList } from './activities/ActivityList';
import { ActivityCreate } from './activities/ActivityCreate';
import { ActivityShow } from './activities/ActivityShow';
import { CompetencesCreate } from './competences/CompetencesCreate';
import { CompetencesList } from './competences/CompetencesList';
import { ConceptList } from './concepts/ConceptList';
import { ExternalActivityList } from './externalActivities/ExternalActivityList';
import { ComposedActivityList } from './composedActivities/ComposedActivityList';
import { ComposedActivityCreate } from './composedActivities/ComposedActivityCreate';
import { ComposedActivityEdit } from './composedActivities/ComposedActivityEdit';
import { ComposedActivityShow } from './composedActivities/ComposedActivityShow';
import { LearningScenarioList } from './learningScenarios/LearningScenarioList';
import { CompetencesEdit } from './competences/CompetencesEdit';
import { CompetencesShow } from './competences/CompetencesShow';
import { ModuleList } from './modules/ModuleList';
import { ModuleCreate } from './modules/ModuleCreate';
import { ModuleEdit } from './modules/ModuleEdit';
import { ModuleShow } from './modules/ModuleShow';
import { FragmentList } from './fragments/FragmentList';
import { FragmentCreate } from './fragments/FragmentCreate';
import { FragmentEdit } from './fragments/FragmentEdit';
import { FragmentShow } from './fragments/FragmentShow';
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

const Dashboard = () => (

    <Card>
        <ListButton to='/domains' label="domains"/>
    </Card>
);
export const App = () => (
    <BrowserRouter>
    <Admin
    layout={MyLayout}
    i18nProvider={i18nProvider}
    // authProvider={authProvider}
    dataProvider={dataProvider}
    dashboard={Dashboard}>
        {/* <Resource name="domain" {...domains}></Resource> */}
        <Resource name="domains" >
            <Route path="*" element={<DomainList />} />
            <Route path="create/*" element={<DomainCreate />} />
            <Route path=":id/edit/*" element={<DomainEdit />} />
            <Route path=":id/*" element={<DomainShow />} />
        </Resource>
        {/* <Resource name="domains" {...domains}></Resource> */}
        <Resource name="educators" recordRepresentation="firstname">
            <Route path="/d/:domainId/*" element={<EducatorList />} />
            <Route path="/d/:domainId/create/*" element={<EducatorCreate />} />
            <Route path="/d/:domainId/:id/edit/*" element={<EducatorEdit />} />
            <Route path="/d/:domainId/:id/*" element={<EducatorShow />} />
        </Resource>
        <Resource name="learners" recordRepresentation="firstname">
             <Route path="/d/:domainId/*" element={<LearnerList />} />
            <Route path="/d/:domainId/create/*" element={<LearnerCreate />} />
            <Route path="/d/:domainId/:id/edit/*" element={<LearnerEdit />} />
            <Route path="/d/:domainId/:id/*" element={<LearnerShow />} />
        </Resource>
        <Resource name="concepts" >
            <Route path="/d/:domainId/*" element={<ConceptList />} />
            <Route path="/d/:domainId/create/*" element={<ConceptCreate />} />
            <Route path="/d/:domainId/:id/edit/*" element={<ConceptEdit />} />
            <Route path="/d/:domainId/:id/*" element={<ConceptShow />} />
        </Resource>
        <Resource name="external-activities"  recordRepresentation="title">
            <Route path="/d/:domainId/*" element={<ExternalActivityList />} />
            <Route path="/d/:domainId/create/*" element={<ExternalActivityCreate />} />
            <Route path="/d/:domainId/:id/edit/*" element={<ExternalActivityEdit />} />
            <Route path="/d/:domainId/:id/*" element={<ExternalActivityShow />} />
        </Resource>
        <Resource name="scenarios" >
            <Route path="/d/:domainId/*" element={<LearningScenarioList />} />
            <Route path="/d/:domainId/create/*" element={<LearningScenarioCreate />} />
            <Route path="/d/:domainId/s/:id/edit/*" element={<LearningScenarioEdit />} />
            <Route path="/d/:domainId/s/:id/*" element={<LearningScenarioShow />} />
        </Resource>
        <Resource name="competences"  >
            <Route path="/d/:domainId/*" element={<CompetencesList />} />
            <Route path="/d/:domainId/create/*" element={<CompetencesCreate />} />
            <Route path="/d/:domainId/:id/edit/*" element={<CompetencesEdit />} />
            <Route path="/d/:domainId/:id/*" element={<CompetencesShow />} />
        </Resource>
        <Resource name="concepts"  recordRepresentation="title">
            <Route path="/d/:domainId/*" element={<CompetencesList />} />
            <Route path="/d/:domainId/create/*" element={<CompetencesCreate />} />
            <Route path="/d/:domainId/:id/edit/*" element={<ConceptEdit />} />
            <Route path="/d/:domainId/:id/*" element={<ConceptShow />} />
        </Resource>
        <Resource name="modules"  recordRepresentation="title">
            <Route path="/d/:domainId/s/:learningScenarioId/*" element={<ModuleList />} />
            <Route path="/d/:domainId/s/:learningScenarioId/create/*" element={<ModuleCreate />} />
            <Route path="/d/:domainId/s/:learningScenarioId/m/:id/edit/*" element={<ModuleEdit />} />
            <Route path="/d/:domainId/s/:learningScenarioId/m/:id/*" element={<ModuleShow />} />
        </Resource>
        <Resource name="fragments" recordRepresentation="title">
            <Route path="/d/:domainId/s/:learningScenarioId/m/:moduleId/*" element={<FragmentList />} />
            <Route path="/d/:domainId/s/:learningScenarioId/m/:moduleId/create/*" element={<FragmentCreate />} />
            <Route path="/d/:domainId/s/:learningScenarioId/m/:moduleId/f/:id/edit/*" element={<FragmentEdit />} />
            <Route path="/d/:domainId/s/:learningScenarioId/m/:moduleId/f/:id/*" element={<FragmentShow />} />
        </Resource>
        <Resource name="composed-activities" recordRepresentation="title">
             <Route path="/d/:domainId/s/:learningScenarioId/m/:moduleId/f/:fragmentId/*" element={<ComposedActivityList />} />
            <Route path="/d/:domainId/s/:learningScenarioId/m/:moduleId/f/:fragmentId/create/*" element={<ComposedActivityCreate />} />
            <Route path="/d/:domainId/s/:learningScenarioId/m/:moduleId/f/:fragmentId/ca/:id/edit/*" element={<ComposedActivityEdit />} />
            <Route path="/d/:domainId/s/:learningScenarioId/m/:moduleId/f/:fragmentId/ca/:id/*" element={<ComposedActivityShow />} />
        </Resource>
        <Resource name="activities" recordRepresentation="title">
            <Route path="/d/:domainId/s/:learningScenarioId/m/:moduleId/f/:fragmentId/ca/:composedActivityId/*" element={<ActivityList />} />
            <Route path="/d/:domainId/s/:learningScenarioId/m/:moduleId/f/:fragmentId/ca/:composedActivityId/create/*" element={<ActivityCreate />} />
            <Route path="/d/:domainId/s/:learningScenarioId/m/:moduleId/f/:fragmentId/ca/:composedActivityId/a/:id/edit/*" element={<ActivityCreate />} />
            <Route path="/d/:domainId/s/:learningScenarioId/m/:moduleId/f/:fragmentId/ca/:composedActivityId/a/:id/*" element={<ActivityShow />} />
        </Resource>
    </Admin>
    </BrowserRouter>

);

    