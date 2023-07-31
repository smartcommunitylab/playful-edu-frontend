import { DateField, DateInput, EditButton, Show, SimpleShowLayout, TextField, TextInput, TopToolbar, useGetRecordId, useRecordContext, useRedirect } from "react-admin"
import { FragmentShow } from "../fragments/FragmentShow"
import { useSearchParams } from 'react-router-dom';
import { DOMAIN_URL_PARAM, SCENARIO_URL_PARAM } from "../constants";
import { BackButton } from "@smartcommunitylab/ra-back-button";


const PostShowActions = () => {
    const recordId = useGetRecordId();
    const [searchParams, setSearchParams] = useSearchParams();
    const domainId = searchParams.get(DOMAIN_URL_PARAM);
    const scenarioId = searchParams.get(SCENARIO_URL_PARAM);
    const to=`/modules/${recordId}/edit?${DOMAIN_URL_PARAM}=${domainId}&${SCENARIO_URL_PARAM}=${scenarioId}`;
    if (!recordId)
        return null;
    return (
        <>
            <TopToolbar>
                <EditButton  to={to}></EditButton>
            </TopToolbar>
            </>
        )
};
export const ModuleShow = () => {
    return (
        <Show actions={<PostShowActions />}>
        <SimpleShowLayout>
            <TextField source="title"  />
            <TextField source="desc" />
            <TextField source="level" />
            <DateField source="dateFrom" />
            <DateField source="dateTo" />
        </SimpleShowLayout>
        <FragmentShow />
        </Show>
    )
}
