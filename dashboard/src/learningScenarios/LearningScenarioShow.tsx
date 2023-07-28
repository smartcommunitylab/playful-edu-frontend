import { EditButton, ReferenceArrayField, Show, SimpleShowLayout, TextField, TopToolbar, useGetRecordId, useRecordContext, useRedirect } from "react-admin"
import { ModuleList } from "../modules/ModuleList"
import { useSearchParams } from 'react-router-dom';
import { DOMAIN_URL_PARAM } from "../constants";
import { BackButton } from "@smartcommunitylab/ra-back-button";


const PostShowActions = () => {
    const recordId = useGetRecordId();
    const [searchParams, setSearchParams] = useSearchParams();
    const domainId = searchParams.get(DOMAIN_URL_PARAM);
    const to=`/scenarios/${recordId}/edit?${DOMAIN_URL_PARAM}=${domainId}`;
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
export const LearningScenarioShow = () => {
    return (
        <Show actions={<PostShowActions />}>
            <SimpleShowLayout>
            <TextField source="title"  />
            <TextField source="desc" />
            <TextField source="language" />
            <ReferenceArrayField label="Educators" reference="educators" source="educators" />
            <ReferenceArrayField label="Learners" reference="learners" source="learners" />

        </SimpleShowLayout>
        {/* <ModuleList scenarioId={record.id}/> */}
        </Show>
    )
}
