import { Edit, ReferenceArrayInput, ShowButton, SimpleForm, TextInput, TopToolbar, required, useGetRecordId, useRedirect } from "react-admin"
import { DOMAIN_URL_PARAM } from "../constants";
import { useParams } from 'react-router-dom';


const PostEditActions = () => {
    const recordId = useGetRecordId();
    const params = useParams();
    const domainId =params.domainId;
    const to=`/external-activities/d/${domainId}/${recordId}`;
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
    const params = useParams();
    const domainId =params.domainId;
    const redirect = useRedirect();
    const onSuccess = () => {
        redirect(`/external-activities/d/${domainId}`);
    };
    return (
        <Edit mutationOptions={{ onSuccess }} actions={<PostEditActions />} transform={(data: any) => ({ ...data, domainId })} mutationMode="pessimistic">
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
