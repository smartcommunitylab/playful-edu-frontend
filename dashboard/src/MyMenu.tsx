import {
  Button,
Menu,
useRedirect,
useRemoveFromStore,
useResourceDefinitions,
useTranslate,

} from "react-admin";
import { useSearchParams } from 'react-router-dom';
import { ACTIVITY_URL_PARAM, COMPOSED_ACTIVITY_URL_PARAM, DOMAIN_URL_PARAM, FRAGMENT_URL_PARAM, MODULO_URL_PARAM, SCENARIO_URL_PARAM } from "./constants";
import { useNavigate } from "react-router-dom";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import UsersIcon from '@mui/icons-material/People';
const BackButtonMenu = (props:{name:string, label:string, redirect:string}) => {
  const translate = useTranslate();
  const redirect = useRedirect();

const removeFromStore = useRemoveFromStore();
const navigate = useNavigate();
function back(KEY: string) {
  // removeFromStore(KEY);
  redirect('/' + props.redirect);
}

return <Button color="primary" onClick={() => back(props.name)} label={translate(props.label)} startIcon={<ArrowBackIcon />}></Button>;
};
export const MyMenu = () => {
const resources = useResourceDefinitions();
// const getResourceLabel = useGetResourceLabel();
// const createPath = useCreatePath();
const [searchParams, setSearchParams] = useSearchParams();
const domainId = searchParams.get(DOMAIN_URL_PARAM);
const learningScenarioId = searchParams.get(SCENARIO_URL_PARAM);
const moduloId = searchParams.get(MODULO_URL_PARAM);
const fragmentId = searchParams.get(FRAGMENT_URL_PARAM);
const composedActivityId = searchParams.get(COMPOSED_ACTIVITY_URL_PARAM);
const activityId = searchParams.get(ACTIVITY_URL_PARAM);

  function attachDomain():string {
    return `${DOMAIN_URL_PARAM}=${domainId}`;
  }

  function attachScenario() {
    return `${SCENARIO_URL_PARAM}=${learningScenarioId}`;
  }

  function attachFragment() {
    return `${FRAGMENT_URL_PARAM}=${fragmentId}`;
  }
  function attachModule() {
    return `${MODULO_URL_PARAM}=${moduloId}`;
  }

  function attachComposedActivities() {
    return `${COMPOSED_ACTIVITY_URL_PARAM}=${composedActivityId}`;
  }

  function attachActivities() {
    return `${ACTIVITY_URL_PARAM}=${activityId}`;
  }


return (
  <>
    {!domainId && (
      <Menu>
        <Menu.Item to="/domains" />
      </Menu>
    )}
    {domainId && !learningScenarioId && (
      <Menu>
         <BackButtonMenu name={DOMAIN_URL_PARAM} label="resources.domain.back" redirect="domains"/>
        <Menu.Item to={`/educators?${attachDomain()}`} primaryText="resources.educator.menu" leftIcon={<UsersIcon />}/>
        <Menu.Item to={`/learners?${attachDomain()}`} primaryText="resources.learner.menu" leftIcon={<UsersIcon />}/>
        <Menu.Item to={`/concepts?${attachDomain()}`}  primaryText="resources.concept.menu" leftIcon={<UsersIcon />}/>
        <Menu.Item to={`/competences?${attachDomain()}`} primaryText="resources.competence.menu" leftIcon={<UsersIcon />}/>
        <Menu.Item to={`/external-activities?${attachDomain()}`} primaryText="resources.externalActivity.menu" leftIcon={<UsersIcon />}/>
        <Menu.Item to={`/scenarios?${attachDomain()}`} primaryText="resources.scenario.menu" leftIcon={<UsersIcon />}/>
      </Menu>
    )}
    {learningScenarioId && !moduloId && (
      <Menu>
         <BackButtonMenu name={SCENARIO_URL_PARAM} label="resources.scenario.back" redirect={`scenarios?${attachDomain()}`}/>
        <Menu.Item to={`/modules?${attachDomain()}&${attachScenario()}`} primaryText="resources.modulo.menu" leftIcon={<UsersIcon />}/>

      </Menu>
    )}
    {moduloId && !fragmentId && (
      <Menu>
         <BackButtonMenu name={MODULO_URL_PARAM} label="resources.modulo.back" redirect={`modules?${attachDomain()}&${attachScenario()}`}/>
        <Menu.Item to={`/fragments?${attachDomain()}&${attachScenario()}&${attachModule()}`} primaryText="resources.fragment.menu" leftIcon={<UsersIcon />}/>
      </Menu>
    )}
    {fragmentId && !composedActivityId &&(
      <Menu>
         <BackButtonMenu name={FRAGMENT_URL_PARAM} label="resources.fragment.back" redirect={`fragments?${attachDomain()}&${attachScenario()}&${attachModule()}`}/>
        <Menu.Item to={`/composed-activities?${attachDomain()}&${attachScenario()}&${attachFragment()}&${attachModule()}`} primaryText="resources.composedActivity.menu" leftIcon={<UsersIcon />}/>
      </Menu>
    )}
    {composedActivityId && !activityId &&(
      <Menu>
         <BackButtonMenu name={COMPOSED_ACTIVITY_URL_PARAM} label="resources.composedActivity.back" redirect={`composed-activities?${attachDomain()}&${attachScenario()}&${attachModule()}&${attachFragment()}`}/>
        <Menu.Item to={`/activities?${attachDomain()}&${attachScenario()}&${attachModule()}&${attachFragment()}&${attachComposedActivities()}}`} primaryText="resources.activity.menu" leftIcon={<UsersIcon />}/>
      </Menu>
    )}
        {activityId  &&(
      <Menu>
         <BackButtonMenu name={COMPOSED_ACTIVITY_URL_PARAM} label="resources.activity.back" redirect={`activities?${attachDomain()}&${attachScenario()}&${attachModule()}&${attachComposedActivities()}&${attachFragment()}`}/>
      </Menu>
    )}
  </>
);
};

const styles = {
align50: {
  padding: "5px 60px",
},
align: {
  padding: "5px 5px",
},
icon: {
  minWidth: "0px",
},
};
