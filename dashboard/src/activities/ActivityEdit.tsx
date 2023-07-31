import { BooleanInput, Edit, EditButton, FormDataConsumer, ReferenceArrayInput, SelectInput, ShowButton, SimpleForm, TextInput, TopToolbar, required, useGetRecordId, useRedirect } from "react-admin"
import { useSearchParams } from "react-router-dom";
import { COMPOSED_ACTIVITY_URL_PARAM, DOMAIN_URL_PARAM, FRAGMENT_URL_PARAM, MODULO_URL_PARAM, SCENARIO_URL_PARAM } from "../constants";

const PostEditActions = () => {
    const recordId = useGetRecordId();
    const [searchParams, setSearchParams] = useSearchParams();
    const domainId = searchParams.get(DOMAIN_URL_PARAM);
    const learningScenarioId = searchParams.get(SCENARIO_URL_PARAM);
    const moduleId = searchParams.get(MODULO_URL_PARAM);
    const fragmentId = searchParams.get(FRAGMENT_URL_PARAM);
    const composedActivityId = searchParams.get(COMPOSED_ACTIVITY_URL_PARAM);

    const to=`/activities/${recordId}/show?${DOMAIN_URL_PARAM}=${domainId}&${SCENARIO_URL_PARAM}=${learningScenarioId}&${MODULO_URL_PARAM}=${moduleId}&${FRAGMENT_URL_PARAM}=${fragmentId}}&${COMPOSED_ACTIVITY_URL_PARAM}=${composedActivityId}`;
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
export const ActivityEdit = () => {
    const redirect = useRedirect();
    const [searchParams, setSearchParams] = useSearchParams();
    const domainId = searchParams.get(DOMAIN_URL_PARAM);
    const learningScenarioId = searchParams.get(SCENARIO_URL_PARAM);
    const moduleId = searchParams.get(MODULO_URL_PARAM);
    const fragmentId = searchParams.get(FRAGMENT_URL_PARAM);
    const composedActivityId = searchParams.get(COMPOSED_ACTIVITY_URL_PARAM);    const onSuccess = () => {
        redirect(`/activities?${DOMAIN_URL_PARAM}=${domainId}&${SCENARIO_URL_PARAM}=${learningScenarioId}&${MODULO_URL_PARAM}=${moduleId}&${FRAGMENT_URL_PARAM}=${fragmentId}}&${COMPOSED_ACTIVITY_URL_PARAM}=${composedActivityId}`);
    };
    return (
        <Edit mutationOptions={{ onSuccess }} actions={<PostEditActions />}>
            <SimpleForm>
            <TextInput source="title" validate={[required()]} fullWidth />
            <TextInput source="desc" />
            <BooleanInput source="group" />
            <SelectInput source="type" choices={[
            { id: 'concrete', name: 'Concreta' },
             { id: 'abstract', name: 'Astratta' }
    ]} />
    <FormDataConsumer>
    {({ formData, ...rest }) => {
        if (formData.type && formData.type == 'concrete' )
        return <ReferenceArrayInput source="concepts" reference="concepts"  queryOptions={{ meta: { domainId } }} />
         else  return  <ReferenceArrayInput source="external-activities" reference="external-activities"  queryOptions={{ meta: { domainId } }} />
    }
                 }

             </FormDataConsumer>
        </SimpleForm>
        </Edit>
    )
}
