import { BooleanInput, Edit, EditButton, FormDataConsumer, ReferenceArrayInput, SelectInput, ShowButton, SimpleForm, TextInput, TopToolbar, required, useGetRecordId, useRedirect } from "react-admin"
import { useSearchParams } from "react-router-dom";
import { DOMAIN_URL_PARAM } from "../constants";

const PostEditActions = () => {
    const recordId = useGetRecordId();
    const [searchParams, setSearchParams] = useSearchParams();
    const domainId = searchParams.get(DOMAIN_URL_PARAM);
    const to=`/activities/${recordId}/show?${DOMAIN_URL_PARAM}=${domainId}`;
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
    const [searchParams, setSearchParams] = useSearchParams();
    const redirect = useRedirect();
    const domainId = searchParams.get(DOMAIN_URL_PARAM);
    const onSuccess = () => {
        redirect(`/educators?${DOMAIN_URL_PARAM}=${domainId}`);
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
