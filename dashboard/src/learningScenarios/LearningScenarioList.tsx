import { List, Datagrid, TextField, TopToolbar, CreateButton, ExportButton, EditButton,ShowButton, TextInput, useTranslate, useStore, Button, useRedirect, useRecordContext } from "react-admin"
import { DOMAIN_URL_PARAM, SCENARIO_URL_PARAM } from "../constants";
import { useSearchParams } from 'react-router-dom';
import { Box, Typography } from '@mui/material';


const ListActions = () => (
    <TopToolbar>
        <CreateScenarioButton/>
        <ExportButton/>
    </TopToolbar>
);
const LearningScenarioFilters = [
    <TextInput label="Search" source="name" alwaysOn />]
export const LearningScenarioList = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const domainId = searchParams.get(DOMAIN_URL_PARAM);
    const translate = useTranslate();
    return (
        <List empty={<Empty />} actions={<ListActions/>} filters={LearningScenarioFilters} queryOptions={{ meta: { domainId } }}>
        <Datagrid>
            <LearningScenarioButton ></LearningScenarioButton>
            <EditScenarioButton/>
            <ShowScenarioButton />
        </Datagrid>
    </List>
    )
}

const EditScenarioButton = () => {
    // const translate = useTranslate();
    const redirect = useRedirect();
    const record = useRecordContext();
    const [searchParams, setSearchParams] = useSearchParams();
    const domainId = searchParams.get(DOMAIN_URL_PARAM);
    const to=`/scenarios/${record.id}/edit?${SCENARIO_URL_PARAM}=${record.id}&${DOMAIN_URL_PARAM}=${domainId}`;
    if (!record)
        return null;
    return (
        <>
            <EditButton  to={to}></EditButton>
        </>
    );

};

const LearningScenarioButton = () => {

    const redirect = useRedirect();
    const record = useRecordContext();
    const [searchParams, setSearchParams] = useSearchParams();
    const domainId = searchParams.get(DOMAIN_URL_PARAM);
    if (!record)
        return null;
    return (
        <>
            <Button  label={record.title} onClick={() => {
                redirect(`/scenarios/${record.id}/show?${SCENARIO_URL_PARAM}=${record.id}&${DOMAIN_URL_PARAM}=${domainId}`);
            }}></Button>
            <TextField source="desc" />
            <TextField source="language" />
        </>
    );

};

const ShowScenarioButton = () => {
    // const translate = useTranslate();
    const redirect = useRedirect();
    const record = useRecordContext();
    const [searchParams, setSearchParams] = useSearchParams();
    const domainId = searchParams.get(DOMAIN_URL_PARAM);
    const to=`/scenarios/${record.id}/show?${SCENARIO_URL_PARAM}=${record.id}&${DOMAIN_URL_PARAM}=${domainId}`;
    if (!record)
        return null;
    return (
        <>
              <ShowButton to={to}></ShowButton>
        </>
    );
};
const CreateScenarioButton = () => {
    const record = useRecordContext();
    const [searchParams, setSearchParams] = useSearchParams();
      const domainId = searchParams.get(DOMAIN_URL_PARAM);
    const to = `/scenarios/create?${DOMAIN_URL_PARAM}=${domainId}`;
    return (
      <>
        <CreateButton to={to}></CreateButton>
      </>
    );
  };
  const Empty = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const domainId = searchParams.get(DOMAIN_URL_PARAM);
    const translate = useTranslate();
  const to = `/scenarios/create?${DOMAIN_URL_PARAM}=${domainId}`;
    return (<Box textAlign="center" m={1}>
        <Typography variant="h4" paragraph>
        {translate('resources.scenario.empty')}
        </Typography>
        <Typography variant="body1">
        {translate('resources.scenario.addOne')}
        </Typography>
        <CreateButton to={to}/>
    </Box>)
};