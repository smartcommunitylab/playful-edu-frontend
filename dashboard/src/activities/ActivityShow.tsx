import { EditButton, Show, SimpleShowLayout, TextField, TopToolbar, useGetRecordId } from "react-admin"
import { ACTIVITY_URL_PARAM, COMPOSED_ACTIVITY_URL_PARAM, DOMAIN_URL_PARAM, FRAGMENT_URL_PARAM, MODULO_URL_PARAM, SCENARIO_URL_PARAM } from "../constants";
import { useSearchParams } from 'react-router-dom';


const PostShowActions = () => {
    const recordId = useGetRecordId();
    const [searchParams, setSearchParams] = useSearchParams();
    const domainId = searchParams.get(DOMAIN_URL_PARAM);
    const learningScenarioId = searchParams.get(SCENARIO_URL_PARAM);
    const moduleId = searchParams.get(MODULO_URL_PARAM);
    const fragmentId = searchParams.get(FRAGMENT_URL_PARAM);
    const composedActivityId = searchParams.get(COMPOSED_ACTIVITY_URL_PARAM);
    const to=`/activities/${recordId}/edit?${DOMAIN_URL_PARAM}=${domainId}&${SCENARIO_URL_PARAM}=${learningScenarioId}&${MODULO_URL_PARAM}=${moduleId}&${FRAGMENT_URL_PARAM}=${fragmentId}}&${COMPOSED_ACTIVITY_URL_PARAM}=${composedActivityId}&${ACTIVITY_URL_PARAM}=${recordId}`;
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
