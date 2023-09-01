import {
  Button,
  Menu,
  useRedirect,
  useRemoveFromStore,
  useResourceDefinitions,
  useSidebarState,
  useTranslate,
} from "react-admin";
import { useSearchParams } from "react-router-dom";
import {
  ACTIVITY_URL_PARAM,
  COMPOSED_ACTIVITY_URL_PARAM,
  DOMAIN_URL_PARAM,
  FRAGMENT_URL_PARAM,
  MODULO_URL_PARAM,
  SCENARIO_URL_PARAM,
} from "./constants";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import UsersIcon from "@mui/icons-material/People";
import InfoIcon from "@mui/icons-material/Info";
import SchoolIcon from "@mui/icons-material/School";
import { CompetenceIcon } from "./icons/CompetenceIcon";
import { StudentIcon } from "./icons/StudentIcon";
import { EducatorIcon } from "./icons/EducatorIcon";
import { ConceptIcon } from "./icons/ConceptIconIcon";
import { ActivityIcon } from "./icons/ActivityIcon";
import { ScenarioIcon } from "./icons/ScenarioIcon";
import { ModuleIcon } from "./icons/ModuleIcon";
import { FragmentIcon } from "./icons/FragmentIcon";

const BackButtonMenu = (props: {
  name: string;
  label: string;
  redirect: string;
}) => {
  const translate = useTranslate();
  const redirect = useRedirect();
  const [sidebarState] = useSidebarState();
  const label = sidebarState ? translate(props.label) : "";

  function back(KEY: string) {
    // removeFromStore(KEY);
    redirect("/" + props.redirect);
  }

  return (
    <Button
      color="primary"
      onClick={() => back(props.name)}
      label={label}
      startIcon={<ArrowBackIcon />}
      sx={{
        fontSize: "0.95rem",
        "& .MuiButton-startIcon": {
          marginRight: sidebarState ? "8px" : "0",
          marginLeft: sidebarState ? "-2px" : "0",
        },
        "& .MuiSvgIcon-root": {
          width: "1.3em",
          height: "1.3em",
        },
      }}
    ></Button>
  );
};

export const MyMenu = () => {
  let url = useLocation();
  const regDomain = new RegExp("(?<=(/d/|/domains/))([^/]+)");
  const regScenario = new RegExp("(?<=/s/)([^/]+)");
  const regModulo = new RegExp("(?<=/m/)([^/]+)");
  const regFragment = new RegExp("(?<=/f/)([^/]+)");
  const regActivity = new RegExp("(?<=/a/)([^/]+)");
  const domainId = regDomain.test(url?.pathname)
    ? url?.pathname?.match(regDomain)![0] !== "create"
      ? url?.pathname?.match(regDomain)![0]
      : ""
    : "";
  const learningScenarioId = regScenario.test(url?.pathname)
    ? url?.pathname?.match(regScenario)![0]
    : "";
  const learningModuleId = regModulo.test(url?.pathname)
    ? url?.pathname?.match(regModulo)![0]
    : "";
  const learningFragmentId = regFragment.test(url?.pathname)
    ? url?.pathname?.match(regFragment)![0]
    : "";
  //  const composedActivityId = regComposedActivity.test(url?.pathname)? url?.pathname?.match(regComposedActivity)![0]:''
  const activityId = regActivity.test(url?.pathname)
    ? url?.pathname?.match(regActivity)![0] !== "create"
      ? url?.pathname?.match(regActivity)![0]
      : ""
    : "";
  // const activityId = regActivity.test(url?.pathname)? url?.pathname?.match(regActivity)![0]:''

  return (
    <>
      {!domainId && (
        <Menu label="menu">
          <Menu.Item to="/domains" />
        </Menu>
      )}

      {domainId && !learningScenarioId && (
        <Menu
          sx={{
            "& .MuiListItemIcon-root": {
              paddingRight: "1rem",
            },
          }}
        >
          
          <BackButtonMenu
            name={DOMAIN_URL_PARAM}
            label="resources.domain.back"
            redirect="domains"
          />
          <Menu.Item
            to={`/domains/${domainId}`}
            primaryText="resources.info.menu"
            leftIcon={<InfoIcon sx={{ width: "1.4em", height: "1.4em" }} />}
          />
          <Menu.Item
            to={`/educators/d/${domainId}`}
            primaryText="resources.educator.menu"
            leftIcon={<EducatorIcon />}
          />
          <Menu.Item
            to={`/learners/d/${domainId}`}
            primaryText="resources.learner.menu"
            leftIcon={<StudentIcon />}
          />
          <Menu.Item
            to={`/concepts/d/${domainId}`}
            primaryText="resources.concept.menu"
            leftIcon={<ConceptIcon />}
          />
          <Menu.Item
            to={`/competences/d/${domainId}`}
            primaryText="resources.competence.menu"
            leftIcon={<CompetenceIcon />}
          />
          <Menu.Item
            to={`/external-activities/d/${domainId}`}
            primaryText="resources.externalActivity.menu"
            leftIcon={<ActivityIcon />}
          />
          <Menu.Item
            to={`/scenarios/d/${domainId}`}
            primaryText="resources.scenario.menu"
            leftIcon={<ScenarioIcon />}
          />
        </Menu>
      )}

      {learningScenarioId && !learningModuleId && (
        <Menu
          sx={{
            "& .MuiListItemIcon-root": {
              paddingRight: "1rem",
            },
          }}
        >
          
          <BackButtonMenu
            name={SCENARIO_URL_PARAM}
            label="resources.scenario.back"
            redirect={`scenarios/d/${domainId}`}
          />
          <Menu.Item
            to={`/scenarios/d/${domainId}/s/${learningScenarioId}`}
            primaryText="resources.info.menu"
            leftIcon={<InfoIcon sx={{ width: "1.4em", height: "1.4em" }} />}
          />
          <Menu.Item
            to={`/modules/d/${domainId}/s/${learningScenarioId}`}
            primaryText="resources.modulo.menu"
            leftIcon={<ModuleIcon />}
          />
          <Menu.Item
            to={`/scenarios/d/${domainId}/s/${learningScenarioId}/learners/view`}
            primaryText="resources.learner.menu"
            leftIcon={<StudentIcon />}
          />
        </Menu>
      )}

      {learningModuleId && !learningFragmentId && (
        <Menu
          sx={{
            "& .MuiListItemIcon-root": {
              paddingRight: "1rem",
            },
          }}
        >
          
          <BackButtonMenu
            name={MODULO_URL_PARAM}
            label="resources.modulo.back"
            redirect={`modules/d/${domainId}/s/${learningScenarioId}`}
          />
          <Menu.Item
            to={`/modules/d/${domainId}/s/${learningScenarioId}/m/${learningModuleId}`}
            primaryText="resources.info.menu"
            leftIcon={<InfoIcon sx={{ width: "1.4em", height: "1.4em" }} />}
          />
          <Menu.Item
            to={`/fragments/d/${domainId}/s/${learningScenarioId}/m/${learningModuleId}`}
            primaryText="resources.fragment.menu"
            leftIcon={<FragmentIcon />}
          />
        </Menu>
      )}

      {learningFragmentId && !activityId && (
        <Menu
          sx={{
            "& .MuiListItemIcon-root": {
              paddingRight: "1rem",
            },
          }}
        >
          
          <BackButtonMenu
            name={FRAGMENT_URL_PARAM}
            label="resources.fragment.back"
            redirect={`fragments/d/${domainId}/s/${learningScenarioId}/m/${learningModuleId}`}
          />
          <Menu.Item
            to={`/fragments/d/${domainId}/s/${learningScenarioId}/m/${learningModuleId}/f/${learningFragmentId}`}
            primaryText="resources.info.menu"
            leftIcon={<InfoIcon sx={{ width: "1.4em", height: "1.4em" }} />}
          />
        </Menu>
      )}

      {activityId && (
        <Menu
          sx={{
            "& .MuiListItemIcon-root": {
              paddingRight: "1rem",
            },
          }}
        >
          
          <BackButtonMenu
            name={COMPOSED_ACTIVITY_URL_PARAM}
            label="resources.activity.back"
            redirect={`fragments/d/${domainId}/s/${learningScenarioId}/m/${learningModuleId}/f/${learningFragmentId}`}
          />
          <Menu.Item
            to={`/activities/d/${domainId}/s/${learningScenarioId}/m/${learningModuleId}/f/${learningFragmentId}/a/${activityId}`}
            primaryText="resources.info.menu"
            leftIcon={<InfoIcon sx={{ width: "1.4em", height: "1.4em" }} />}
          />
        </Menu>
      )}
    </>
  );
};
