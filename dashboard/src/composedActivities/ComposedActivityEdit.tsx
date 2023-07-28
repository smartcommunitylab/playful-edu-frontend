import { Edit, ReferenceArrayInput, SelectInput, ShowButton, SimpleForm, TextInput, TopToolbar, required, useGetRecordId, useRedirect, useStore } from "react-admin"
import { useSearchParams } from "react-router-dom";
import { DOMAIN_URL_PARAM } from "../constants";
const PostEditActions = () => {
    const recordId = useGetRecordId();
    const [searchParams, setSearchParams] = useSearchParams();
    const domainId = searchParams.get(DOMAIN_URL_PARAM);
    const to=`/composed-activities/${recordId}/show?${DOMAIN_URL_PARAM}=${domainId}`;
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
export const ComposedActivityEdit = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const redirect = useRedirect();
  const domainId = searchParams.get(DOMAIN_URL_PARAM);
  const onSuccess = () => {
    redirect(`/composed-activities?${DOMAIN_URL_PARAM}=${domainId}`);
};
return (
    <Edit mutationOptions={{ onSuccess }} actions={<PostEditActions />} transform={(data: any) => ({ ...data, domainId })}>
            <SimpleForm>
            <TextInput source="title" label="resources.composedActivity.title" validate={[required()]} fullWidth />
            <SelectInput source="type" choices={[
    { id: 'singleton', name: 'Singola' },
    { id: 'set', name: 'set' },
    { id: 'list', name: 'list' },
]} />
</SimpleForm>
        </Edit>
    )
}

