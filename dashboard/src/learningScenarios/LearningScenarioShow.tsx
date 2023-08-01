import { BooleanField, EditButton, ReferenceArrayField, Show, SimpleShowLayout, TextField, TopToolbar, useGetRecordId } from "react-admin"
import { useSearchParams } from 'react-router-dom';
import { DOMAIN_URL_PARAM, SCENARIO_URL_PARAM } from "../constants";


const PostShowActions = () => {
    const recordId = useGetRecordId();
    const [searchParams, setSearchParams] = useSearchParams();
    const domainId = searchParams.get(DOMAIN_URL_PARAM);
    const to=`/scenarios/${recordId}/edit?${DOMAIN_URL_PARAM}=${domainId}&${SCENARIO_URL_PARAM}=${recordId}`;
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
            <BooleanField source="publicScenario" />
            <ReferenceArrayField label="Educators" reference="educators" source="educators" />
            <ReferenceArrayField label="Learners" reference="learners" source="learners" />
        </SimpleShowLayout>
        {/* <ModuleList scenarioId={record.id}/> */}
        </Show>
    )
}
