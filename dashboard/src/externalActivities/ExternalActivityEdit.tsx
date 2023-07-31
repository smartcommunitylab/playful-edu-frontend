import { Edit, ReferenceArrayInput, ShowButton, SimpleForm, TextInput, TopToolbar, required, useGetRecordId, useRedirect } from "react-admin"
import { DOMAIN_URL_PARAM } from "../constants";
import { useSearchParams } from 'react-router-dom';


const PostEditActions = () => {
    const recordId = useGetRecordId();
    const [searchParams, setSearchParams] = useSearchParams();
    const domainId = searchParams.get(DOMAIN_URL_PARAM);
    const to=`/external-activities/${recordId}/show?${DOMAIN_URL_PARAM}=${domainId}`;
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


export const ExternalActivityEdit = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const domainId = searchParams.get(DOMAIN_URL_PARAM);
    const redirect = useRedirect();
    const onSuccess = () => {
        redirect(`/external-activities?${DOMAIN_URL_PARAM}=${domainId}`);
    };
    return (
        <Edit mutationOptions={{ onSuccess }} actions={<PostEditActions />} transform={(data: any) => ({ ...data, domainId })}>
            <SimpleForm>
            <TextInput source="title" validate={[required()]} fullWidth />
            <TextInput source="desc" />
            <TextInput source="language" />
            <TextInput source="extId" />
            <TextInput source="extGroupId" />
            <TextInput source="extUrl" />
            <TextInput source="type" />
            <TextInput source="tool" />
            <TextInput source="difficulty" />
            <TextInput source="groupCorrelator" />
            <ReferenceArrayInput source="preconditions" reference="concepts" queryOptions={{ meta: { domainId } }} />
            <ReferenceArrayInput source="effects" reference="concepts" queryOptions={{ meta: { domainId } }}/>
        </SimpleForm>
        </Edit>
    )
}
