import { EditButton, Show, SimpleShowLayout, TextField, TopToolbar, useGetRecordId } from "react-admin"
import { ACTIVITY_URL_PARAM, COMPOSED_ACTIVITY_URL_PARAM, DOMAIN_URL_PARAM, FRAGMENT_URL_PARAM, MODULO_URL_PARAM, SCENARIO_URL_PARAM } from "../constants";
import { useParams } from 'react-router-dom';


const PostShowActions = () => {
    const recordId = useGetRecordId();
    const params = useParams();
    const domainId =params.domainId;
    const learningScenarioId = params.learningScenarioId;
    const moduleId = params.moduleId;
    const fragmentId = params.fragmentId;
    const composedActivityId = params.composedActivityId;
    const to=`/activities/d/${domainId}/s/${learningScenarioId}/m/${moduleId}/f/${fragmentId}/ca/${composedActivityId}/a/${recordId}/edit`;
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
export const ActivityShow = () => {
    return (
        <Show actions={<PostShowActions />}>
            <SimpleShowLayout>
            <TextField source="title" />
            <TextField source="desc" />
        </SimpleShowLayout>
        </Show>
    )
}
