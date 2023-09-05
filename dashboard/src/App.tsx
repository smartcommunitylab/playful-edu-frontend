import {
  Admin,
  ButtonProps,
  Layout,
  Link,
  ListButton,
  Options,
  Resource,
  Title,
  fetchUtils,
  useTranslate,
} from "react-admin";
import { Route, BrowserRouter } from "react-router-dom";
import appDataProvider from "./dataProvider";
import { MyMenu } from "./MyMenu";
import { MyAppBar } from "./MyAppBar";
import { i18nProvider } from "./i18n/i18nProvider";
import Card from "@mui/material/Card";
import Box from "@mui/material/Box";
import { Button } from "@mui/material";
import { EducatorList } from "./educators/EducatorList";
import { DomainList } from "./domains/DomainList";
import { DomainEdit } from "./domains/DomainEdit";
import { DomainCreate } from "./domains/DomainCreate";
import { DomainShow } from "./domains/DomainShow";
import { EducatorShow } from "./educators/EducatorShow";
import { EducatorCreate } from "./educators/EducatorCreate";
import { EducatorEdit } from "./educators/EducatorEdit";
import { LearnerCreate } from "./learners/LearnerCreate";
import { LearnerEdit } from "./learners/LearnerEdit";
import { LearnerShow } from "./learners/LearnerShow";
import { ConceptCreate } from "./concepts/ConceptCreate";
import { ConceptEdit } from "./concepts/ConceptEdit";
import { ConceptShow } from "./concepts/ConceptShow";
import { ExternalActivityCreate } from "./externalActivities/ExternalActivityCreate";
import { ExternalActivityEdit } from "./externalActivities/ExternalActivityEdit";
import { ExternalActivityShow } from "./externalActivities/ExternalActivityShow";
import { LearningScenarioCreate } from "./learningScenarios/LearningScenarioCreate";
import { LearningScenarioEdit } from "./learningScenarios/LearningScenarioEdit";
import { LearningScenarioShow } from "./learningScenarios/LearningScenarioShow";
import { LearnerList } from "./learners/LearnerList";
import { ActivityCreate } from "./activities/ActivityCreate";
import { ActivityShow } from "./activities/ActivityShow";
import { CompetencesCreate } from "./competences/CompetencesCreate";
import { CompetencesList } from "./competences/CompetencesList";
import { ConceptList } from "./concepts/ConceptList";
import { ExternalActivityList } from "./externalActivities/ExternalActivityList";
import { LearningScenarioList } from "./learningScenarios/LearningScenarioList";
import { CompetencesEdit } from "./competences/CompetencesEdit";
import { CompetencesShow } from "./competences/CompetencesShow";
import { ModuleList } from "./modules/ModuleList";
import { ModuleCreate } from "./modules/ModuleCreate";
import { ModuleEdit } from "./modules/ModuleEdit";
import { ModuleShow } from "./modules/ModuleShow";
import { FragmentList } from "./fragments/FragmentList";
import { FragmentCreate } from "./fragments/FragmentCreate";
import { FragmentEdit } from "./fragments/FragmentEdit";
import { FragmentShow } from "./fragments/FragmentShow";
import { LearningScenarioLearnerShow } from "./learningScenarios/LearningScenarioLearnerShow";
import { LearningScenarioLearnerEdit } from "./learningScenarios/LearningScenarioLearnerEdit";
import { ActivityEdit } from "./activities/ActivityEdit";
import { useMediaQuery, Theme } from "@mui/material";
import { useLocation } from "react-router-dom";

const MyLayout = (props: any) => {
  const url = useLocation();
  let style = {};
  const isLarge = useMediaQuery<Theme>((theme) => theme.breakpoints.down("lg"));
  const isSmall = useMediaQuery<Theme>((theme) => theme.breakpoints.down("sm"));

  if (url.pathname === "/") {
    style = {
      position: "absolute",
      marginLeft: "auto",
      marginRight: "auto",
      left: !isLarge && !isSmall ? "30%" : isLarge && !isSmall ? "20%" : "5%",
      right: !isLarge && !isSmall ? "30%" : isLarge && !isSmall ? "20%" : "5%",
      top: "35%",
    };
  } else if (url.pathname === "/domains") {
    style = {
      position: "absolute",
      marginLeft: "auto",
      marginRight: "auto",
      left: "5%",
      right: "5%",
    };
  } else {
    style = {};
  }

  return (
    <Layout
      {...props}
      menu={MyMenu}
      appBar={MyAppBar}
      sx={{
        "& .RaLayout-content": style,
      }}
    />
  );
};

const API_URL: string = process.env.REACT_APP_API_URL as string;
const httpClient = async (url: string, options: Options = {}) => {
  if (!options.headers) {
    options.headers = new Headers({ Accept: "application/json" }) as Headers;
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

  if (!options.headers.has("Accept")) {
    options.headers.set("Accept", "application/json");
  }

  return fetchUtils.fetchJson(url, options);
};
const dataProvider = appDataProvider(
    API_URL,
  httpClient
);

const Dashboard = () => {
  const translate = useTranslate();

  const isLarge = useMediaQuery<Theme>((theme) => theme.breakpoints.down("lg"));
  const isSmall = useMediaQuery<Theme>((theme) => theme.breakpoints.down("sm"));

  return (
    <>
      <Title title={translate("titlePages.dashboard")} />

      <Box>
        <Card style={{ padding: 20 }}>
          <Box textAlign="center" mb={4}>
            <h1>{translate("resources.dashboard.welcome")}</h1>
          </Box>

          <Box display="flex" justifyContent="center">
            <Link to="/domains">
              <Button color="primary" variant="contained">
                {translate("resources.dashboard.button")}
              </Button>
            </Link>
          </Box>
        </Card>
      </Box>
    </>
  );
};

const theme = {
  sidebar: {
    width: 200,
    closedWidth: 64,
  },
};

export const App = () => (
  <BrowserRouter>
    <Admin
      layout={MyLayout}
      i18nProvider={i18nProvider}
      // authProvider={authProvider}
      dataProvider={dataProvider}
      dashboard={Dashboard}
      theme={theme}
    >
      {/* <Resource name="domain" {...domains}></Resource> */}
      <Resource name="domains">
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
      <Resource name="concepts">
        <Route path="/d/:domainId/*" element={<ConceptList />} />
        <Route path="/d/:domainId/create/*" element={<ConceptCreate />} />
        <Route path="/d/:domainId/:id/edit/*" element={<ConceptEdit />} />
        <Route path="/d/:domainId/:id/*" element={<ConceptShow />} />
      </Resource>
      <Resource name="external-activities" recordRepresentation="title">
        <Route path="/d/:domainId/*" element={<ExternalActivityList />} />
        <Route
          path="/d/:domainId/create/*"
          element={<ExternalActivityCreate />}
        />
        <Route
          path="/d/:domainId/:id/edit/*"
          element={<ExternalActivityEdit />}
        />
        <Route path="/d/:domainId/:id/*" element={<ExternalActivityShow />} />
      </Resource>
      <Resource name="scenarios">
        <Route path="/d/:domainId/*" element={<LearningScenarioList />} />
        <Route
          path="/d/:domainId/create/*"
          element={<LearningScenarioCreate />}
        />
        <Route
          path="/d/:domainId/s/:id/edit/*"
          element={<LearningScenarioEdit />}
        />
        <Route path="/d/:domainId/s/:id/*" element={<LearningScenarioShow />} />
        <Route
          path="/d/:domainId/s/:id/learners/view/*"
          element={<LearningScenarioLearnerShow />}
        />
        <Route
          path="/d/:domainId/s/:id/learners/edit/*"
          element={<LearningScenarioLearnerEdit />}
        />
      </Resource>
      <Resource name="competences">
        <Route path="/d/:domainId/*" element={<CompetencesList />} />
        <Route path="/d/:domainId/create/*" element={<CompetencesCreate />} />
        <Route path="/d/:domainId/:id/edit/*" element={<CompetencesEdit />} />
        <Route path="/d/:domainId/:id/*" element={<CompetencesShow />} />
      </Resource>
      <Resource name="concepts" recordRepresentation="title">
        <Route path="/d/:domainId/*" element={<CompetencesList />} />
        <Route path="/d/:domainId/create/*" element={<CompetencesCreate />} />
        <Route path="/d/:domainId/:id/edit/*" element={<ConceptEdit />} />
        <Route path="/d/:domainId/:id/*" element={<ConceptShow />} />
      </Resource>
      <Resource name="modules" recordRepresentation="title">
        <Route
          path="/d/:domainId/s/:learningScenarioId/*"
          element={<ModuleList />}
        />
        <Route
          path="/d/:domainId/s/:learningScenarioId/create/*"
          element={<ModuleCreate />}
        />
        <Route
          path="/d/:domainId/s/:learningScenarioId/m/:id/edit/*"
          element={<ModuleEdit />}
        />
        <Route
          path="/d/:domainId/s/:learningScenarioId/m/:id/*"
          element={<ModuleShow />}
        />
      </Resource>
      <Resource name="fragments" recordRepresentation="title">
        <Route
          path="/d/:domainId/s/:learningScenarioId/m/:learningModuleId/*"
          element={<FragmentList />}
        />
        <Route
          path="/d/:domainId/s/:learningScenarioId/m/:learningModuleId/create/*"
          element={<FragmentCreate />}
        />
        <Route
          path="/d/:domainId/s/:learningScenarioId/m/:learningModuleId/f/:id/edit/*"
          element={<FragmentEdit />}
        />
        <Route
          path="/d/:domainId/s/:learningScenarioId/m/:learningModuleId/f/:id/*"
          element={<FragmentShow />}
        />
      </Resource>
      <Resource name="activities" recordRepresentation="title">
        <Route
          path="/d/:domainId/s/:learningScenarioId/m/:learningModuleId/f/:learningFragmentId/a/create/*"
          element={<ActivityCreate />}
        />
        <Route
          path="/d/:domainId/s/:learningScenarioId/m/:learningModuleId/f/:learningFragmentId/a/:id/edit/*"
          element={<ActivityEdit />}
        />
        <Route
          path="/d/:domainId/s/:learningScenarioId/m/:learningModuleId/f/:learningFragmentId/a/:id/*"
          element={<ActivityShow />}
        />
      </Resource>
      {/* <Resource name="course-students" recordRepresentation="name">
            <Route path="/d/:domainId/s/:learningScenarioId/m/:learningModuleId/*" element={<FragmentList />} />
            <Route path="/d/:domainId/s/:learningScenarioId/m/:learningModuleId/create/*" element={<FragmentCreate />} />
            <Route path="/d/:domainId/s/:learningScenarioId/m/:learningModuleId/f/:id/edit/*" element={<FragmentEdit />} />
            <Route path="/d/:domainId/s/:learningScenarioId/m/:learningModuleId/f/:id/*" element={<FragmentShow />} />
        </Resource> */}
    </Admin>
  </BrowserRouter>
);
