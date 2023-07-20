import { List, Datagrid, TextField, TopToolbar, CreateButton, ExportButton, EditButton,ShowButton, TextInput, useTranslate, useStore, Button, useRedirect, useRecordContext, ArrayField, ChipField, SingleFieldList, ReferenceArrayField } from "react-admin"
import { DOMAIN_URL_PARAM } from "../constants";
import { useSearchParams } from "react-router-dom";

const ListActions = () => (
    <TopToolbar>
        <CreateButton/>
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

            {/* <ArrayField source="concepts">
                <SingleFieldList>
                    <ChipField source="title" size="small" />
                </SingleFieldList>
            </ArrayField> */}
            <EditButton />
            <ShowButton />
        </Datagrid>
    </List>
    )
}
