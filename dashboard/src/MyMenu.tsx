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
import { useNavigate, useParams,useLocation } from "react-router-dom";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import UsersIcon from '@mui/icons-material/People';
const BackButtonMenu = (props:{name:string, label:string, redirect:string}) => {
  const translate = useTranslate();
  const redirect = useRedirect();
function back(KEY: string) {
  // removeFromStore(KEY);
  redirect('/' + props.redirect);
}

return <Button color="primary" onClick={() => back(props.name)} label={translate(props.label)} startIcon={<ArrowBackIcon />}></Button>;
};
export const MyMenu = () => {
  let url = useLocation();
const regDomain = new RegExp('(?<=(/d/|/domains/))([^/]+)');
const regScenario = new RegExp('(?<=/s/)([^/]+)');
const regModulo = new RegExp('(?<=/m/)([^/]+)');
const regFragment= new RegExp('(?<=/f/)([^/]+)');
const regActivity= new RegExp('(?<=/a/)([^/]+)');
const domainId = regDomain.test(url?.pathname)? (url?.pathname?.match(regDomain)![0]!=='create'?url?.pathname?.match(regDomain)![0]:''):''
 const learningScenarioId = regScenario.test(url?.pathname)? url?.pathname?.match(regScenario)![0]:''
const learningModuleId = regModulo.test(url?.pathname)? url?.pathname?.match(regModulo)![0]:''
 const learningFragmentId = regFragment.test(url?.pathname)? url?.pathname?.match(regFragment)![0]:''
//  const composedActivityId = regComposedActivity.test(url?.pathname)? url?.pathname?.match(regComposedActivity)![0]:''
const activityId = regActivity.test(url?.pathname)? (url?.pathname?.match(regActivity)![0]!=='create'?url?.pathname?.match(regActivity)![0]:''):''
// const activityId = regActivity.test(url?.pathname)? url?.pathname?.match(regActivity)![0]:''


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
        <Menu.Item to={`/domains/${domainId}`} primaryText="resources.info.menu" leftIcon={<UsersIcon />}/>
        <Menu.Item to={`/educators/d/${domainId}`} primaryText="resources.educator.menu" leftIcon={<UsersIcon />}/>
        <Menu.Item to={`/learners/d/${domainId}`} primaryText="resources.learner.menu" leftIcon={<UsersIcon />}/>
        <Menu.Item to={`/concepts/d/${domainId}`}  primaryText="resources.concept.menu" leftIcon={<UsersIcon />}/>
        <Menu.Item to={`/competences/d/${domainId}`} primaryText="resources.competence.menu" leftIcon={<UsersIcon />}/>
        <Menu.Item to={`/external-activities/d/${domainId}`} primaryText="resources.externalActivity.menu" leftIcon={<UsersIcon />}/>
        <Menu.Item to={`/scenarios/d/${domainId}`} primaryText="resources.scenario.menu" leftIcon={<UsersIcon />}/>
      </Menu>
    )}
    {learningScenarioId && !learningModuleId && (
      <Menu>
         <BackButtonMenu name={SCENARIO_URL_PARAM} label="resources.scenario.back" redirect={`scenarios/d/${domainId}`}/>
        <Menu.Item to={`/scenarios/d/${domainId}/s/${learningScenarioId}`} primaryText="resources.info.menu" leftIcon={<UsersIcon />}/>
        <Menu.Item to={`/modules/d/${domainId}/s/${learningScenarioId}`} primaryText="resources.modulo.menu" leftIcon={<UsersIcon />}/>
        <Menu.Item to={`/scenarios/d/${domainId}/s/${learningScenarioId}/learners/view`} primaryText="resources.learner.menu" leftIcon={<UsersIcon />}/>
      </Menu>
    )}
    {learningModuleId && !learningFragmentId && (
      <Menu>
         <BackButtonMenu name={MODULO_URL_PARAM} label="resources.modulo.back" redirect={`modules/d/${domainId}/s/${learningScenarioId}`}/>
        <Menu.Item to={`/modules/d/${domainId}/s/${learningScenarioId}/m/${learningModuleId}`} primaryText="resources.info.menu" leftIcon={<UsersIcon />}/>
        <Menu.Item to={`/fragments/d/${domainId}/s/${learningScenarioId}/m/${learningModuleId}`} primaryText="resources.fragment.menu" leftIcon={<UsersIcon />}/>
      </Menu>
    )}
    
    {learningFragmentId && !activityId &&(
      <Menu>
        <BackButtonMenu name={FRAGMENT_URL_PARAM} label="resources.fragment.back" redirect={`fragments/d/${domainId}/s/${learningScenarioId}/m/${learningModuleId}`}/>
        <Menu.Item to={`/fragments/d/${domainId}/s/${learningScenarioId}/m/${learningModuleId}/f/${learningFragmentId}`} primaryText="resources.info.menu" leftIcon={<UsersIcon />}/>
       </Menu>
    )} 
        {activityId  &&(
      <Menu>
         <BackButtonMenu name={COMPOSED_ACTIVITY_URL_PARAM} label="resources.activity.back" redirect={`activities/d/${domainId}/s/${learningScenarioId}/m/${learningModuleId}/f/${learningFragmentId}}`}/>
        <Menu.Item to={`/activities/d/${domainId}/s/${learningScenarioId}/m/${learningModuleId}/f/${learningFragmentId}/a/${activityId}`} primaryText="resources.info.menu" leftIcon={<UsersIcon />}/>
      </Menu>
    )}
  </>
);
};


