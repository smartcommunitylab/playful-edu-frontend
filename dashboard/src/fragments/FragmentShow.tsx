import { EditButton, ReferenceArrayField, Show, SimpleShowLayout, TextField, TopToolbar, useGetRecordId } from "react-admin"
import { useSearchParams } from 'react-router-dom';
import { DOMAIN_URL_PARAM, MODULO_URL_PARAM, SCENARIO_URL_PARAM } from "../constants";


const PostShowActions = () => {
    const recordId = useGetRecordId();
    const [searchParams, setSearchParams] = useSearchParams();
    const domainId = searchParams.get(DOMAIN_URL_PARAM);
    const learningScenarioId = searchParams.get(SCENARIO_URL_PARAM);
    const moduleId = searchParams.get(MODULO_URL_PARAM);
    const to=`/fragments/${recordId}/edit?${DOMAIN_URL_PARAM}=${domainId}&${SCENARIO_URL_PARAM}=${learningScenarioId}&${MODULO_URL_PARAM}=${moduleId}`;

    if (!recordId)
        return null;
    return (
        <>
            <TopToolbar>
            </TopToolbar>
            </>
        )
};
export const FragmentShow = () => {
    return (
        <Show actions={<PostShowActions />}>
            <SimpleShowLayout>
            <TextField source="title"  />
            {/* <ReferenceArrayField label="ComposedActivity" reference="composed-activity" source="composed-activity" /> */}
        </SimpleShowLayout>
        </Show>
    )
}
