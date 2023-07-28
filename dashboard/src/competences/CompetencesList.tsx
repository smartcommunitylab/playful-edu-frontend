import { List, Datagrid, TextField, TopToolbar, CreateButton, ExportButton, EditButton,ShowButton, TextInput, useTranslate, useStore, Button, useRedirect, useRecordContext, ArrayField, ChipField, SingleFieldList, ReferenceArrayField } from "react-admin"
import { DOMAIN_URL_PARAM } from "../constants";
import { useSearchParams } from "react-router-dom";

const ListActions = () => (
    <TopToolbar>
        <CreateDomainButton/>
        <ExportButton/>
    </TopToolbar>
);
const CompetencesFilters = [
    <TextInput label="Search" source="title" alwaysOn />]
export const CompetencesList = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const domainId = searchParams.get(DOMAIN_URL_PARAM);
    
    return (
        <List actions={<ListActions/>} filters={CompetencesFilters} queryOptions={{ meta: { domainId } }}>
        <Datagrid>
        <TextField source="title"  label="resources.competence.title"  />
        <TextField source="desc"  label="resources.competence.description" />
        <ReferenceArrayField label="Concepts" reference="concepts" source="concepts" />
            <EditCompetenceButton />
            <ShowCompetenceButton />
        </Datagrid>
    </List>
    )
}

const EditCompetenceButton = () => {
    // const translate = useTranslate();
    const redirect = useRedirect();
    const record = useRecordContext();
    const [searchParams, setSearchParams] = useSearchParams();
    const domainId = searchParams.get(DOMAIN_URL_PARAM);
    const to=`/competences/${record.id}/edit?${DOMAIN_URL_PARAM}=${domainId}`;
    if (!record)
        return null;
    return (
        <>
                    <EditButton  to={to}></EditButton>
        </>
    );

};

const ShowCompetenceButton = () => {
    // const translate = useTranslate();
    const redirect = useRedirect();
    const record = useRecordContext();
    const [searchParams, setSearchParams] = useSearchParams();
    const domainId = searchParams.get(DOMAIN_URL_PARAM);
    const to=`/competences/${record.id}/show?${DOMAIN_URL_PARAM}=${domainId}`;
    if (!record)
        return null;
    return (
        <>
              <ShowButton to={to}></ShowButton>
        </>
    );
};
const CreateDomainButton = () => {
    const record = useRecordContext();
    const [searchParams, setSearchParams] = useSearchParams();
      const domainId = searchParams.get(DOMAIN_URL_PARAM);
    const to = `/competences/create?${DOMAIN_URL_PARAM}=${domainId}`;
    return (
      <>
        <CreateButton to={to}></CreateButton>
      </>
    );
  };