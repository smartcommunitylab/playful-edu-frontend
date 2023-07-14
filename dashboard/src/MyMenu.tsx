import {
    Button,
  Menu,
  useCreatePath,
  useGetResourceLabel,
  useRedirect,
  useRemoveFromStore,
  useResourceDefinitions,
  useStore,
  useTranslate,
} from "react-admin";
import { DOMAIN_KEY, MODULO_KEY, SCENARIO_KEY } from "./constants";
import { useNavigate } from "react-router-dom";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import UsersIcon from '@mui/icons-material/People';
const BackButtonMenu = (props:{name:string, label:string, redirect:string}) => {
    const translate = useTranslate();
    const redirect = useRedirect();

  const removeFromStore = useRemoveFromStore();
  const navigate = useNavigate();
  function back(KEY: string) {
    removeFromStore(KEY);
    redirect('/' + props.redirect);
  }

  return <Button color="primary" onClick={() => back(props.name)} label={translate(props.label)} startIcon={<ArrowBackIcon />}></Button>;
};
export const MyMenu = () => {
  const resources = useResourceDefinitions();
  const getResourceLabel = useGetResourceLabel();
  const createPath = useCreatePath();
  const listHiddenMenu = ["domains"];
  const [domainId] = useStore(DOMAIN_KEY);
  const [scenarioId] = useStore(SCENARIO_KEY);
  const [moduloId] = useStore(MODULO_KEY);
  // se il dominio non e' selezionato, mostro nulla, se e' selezionato mostro tasto back e sottomenu di dominio
  //e poi in funzione di cosa e' settato (learning scenario, modulo) mostro altri back e sottomenu
  return (
    <>
      {!domainId && (
        <Menu>
          <Menu.Item to="/domains" />
        </Menu>
      )}
      {domainId && !scenarioId && (
        <Menu>
           <BackButtonMenu name={DOMAIN_KEY} label="resources.domain.back" redirect="domains"/>
          <Menu.Item to="/educators" primaryText="resources.educator.menu" leftIcon={<UsersIcon />}/>
          <Menu.Item to="/learners" primaryText="resources.learner.menu" leftIcon={<UsersIcon />}/>
          <Menu.Item to="/concepts"  primaryText="resources.concept.menu" leftIcon={<UsersIcon />}/>
          <Menu.Item to="/competences" primaryText="resources.competence.menu" leftIcon={<UsersIcon />}/>
          <Menu.Item to="/externalActivities" primaryText="resources.activity.menu" leftIcon={<UsersIcon />}/>
          <Menu.Item to="/scenarios" primaryText="resources.scenario.menu" leftIcon={<UsersIcon />}/>
        </Menu>
      )}
      {scenarioId && !moduloId && (
        <Menu>
           <BackButtonMenu name={SCENARIO_KEY} label="resources.scenario.back" redirect="scenarios"/>
          <Menu.Item to="/modules" primaryText="resources.modulo.menu" leftIcon={<UsersIcon />}/>

        </Menu>
      )}
      {moduloId && (
        <Menu>
           <BackButtonMenu name={MODULO_KEY} label="resources.modulo.back" redirect="modules"/>
          <Menu.Item to="/fragments" primaryText="resources.fragments.menu" leftIcon={<UsersIcon />}/>
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
