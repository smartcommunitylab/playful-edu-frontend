import { Edit, ReferenceArrayInput, ShowButton, SimpleForm, TextInput, TopToolbar, required, useGetRecordId } from "react-admin"
import { DOMAIN_URL_PARAM, MODULO_URL_PARAM, SCENARIO_URL_PARAM } from "../constants";
import { useSearchParams } from 'react-router-dom';

const PostEditActions = () => {
    const recordId = useGetRecordId();
    const [searchParams, setSearchParams] = useSearchParams();
    const domainId = searchParams.get(DOMAIN_URL_PARAM);
    const scenarioId = searchParams.get(SCENARIO_URL_PARAM);
    const moduleId = searchParams.get(MODULO_URL_PARAM);
    const to=`/fragments/${recordId}/show?${DOMAIN_URL_PARAM}=${domainId}&${SCENARIO_URL_PARAM}=${scenarioId}&${MODULO_URL_PARAM}=${moduleId}`;
    if (!recordId)
        return null;
    return (
        <>
            <TopToolbar>
                <ShowButton  to={to}></ShowButton>
            </TopToolbar>
            </>
        )
};
export const FragmentEdit = () => {
    return (
        <Edit actions={<PostEditActions />}>
            <SimpleForm>
            <TextInput source="title" validate={[required()]} fullWidth />
            <ReferenceArrayInput label="ComposedActivity" reference="composedActivity" source="composedActivity" />
        </SimpleForm>
        </Edit>
    )
}
