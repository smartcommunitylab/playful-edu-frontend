import { BooleanInput, Edit, ReferenceArrayInput, ShowButton, SimpleForm, TextInput, TopToolbar, required, useGetRecordId, useRedirect, useStore } from "react-admin"
import { useSearchParams } from 'react-router-dom';
import { DOMAIN_URL_PARAM } from "../constants";
import { BackButton } from "@smartcommunitylab/ra-back-button";

const PostEditActions = () => {
    const recordId = useGetRecordId();
    const [searchParams, setSearchParams] = useSearchParams();
    const domainId = searchParams.get(DOMAIN_URL_PARAM);
    const to=`/scenarios/${recordId}/show?${DOMAIN_URL_PARAM}=${domainId}`;
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
export const LearningScenarioEdit = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const domainId = searchParams.get(DOMAIN_URL_PARAM);
    const redirect = useRedirect();
    const onSuccess = () => {
        redirect(`/scenarios?${DOMAIN_URL_PARAM}=${domainId}`);
    };
    return (
        <Edit mutationOptions={{ onSuccess }} actions={<PostEditActions />} transform={(data: any) => ({ ...data, domainId })}>
            <SimpleForm>
            <TextInput source="title" validate={[required()]} fullWidth />
            <TextInput source="description" />
            <TextInput source="language" />
            <BooleanInput source="publicScenario" />
            <ReferenceArrayInput source="educators" reference="educators" queryOptions={{ meta: { domainId } }}/>
            <ReferenceArrayInput source="learners" reference="learners" queryOptions={{ meta: { domainId } }}/>
        </SimpleForm>
        </Edit>
    )
}
