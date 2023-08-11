import { Create, ReferenceArrayInput, SimpleForm, TextInput, required, useRedirect, useStore } from "react-admin"
import { DOMAIN_URL_PARAM } from "../constants";
import { useParams } from 'react-router-dom';
import { BackButton } from "@smartcommunitylab/ra-back-button";

export const ExternalActivityCreate = () => {
    const params = useParams();
    const domainId =params.domainId;
    const redirect = useRedirect();
    const onSuccess = () => {
        redirect(`/external-activities/d/${domainId}`);
    };
    return (
        <Create mutationOptions={{ onSuccess }}  transform={(data: any) => ({ ...data, domainId })}>
        <BackButton />
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
            <ReferenceArrayInput source="preconditions" reference="concepts" queryOptions={{ meta: { domainId } }}/>
            <ReferenceArrayInput source="effects" reference="concepts" queryOptions={{ meta: { domainId } }} />
        </SimpleForm>
    </Create>
    )
}