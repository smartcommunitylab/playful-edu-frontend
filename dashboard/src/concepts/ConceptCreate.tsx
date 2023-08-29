import { Create, SimpleForm, TextInput, required, useRedirect, useStore } from "react-admin"
import { DOMAIN_URL_PARAM } from "../constants";
import { useParams } from 'react-router-dom';
import { BackButton } from "@dslab/ra-back-button";

export const ConceptCreate = () => {
    const params = useParams();
    const domainId =params.domainId;
    const redirect = useRedirect();
    const onSuccess = () => {
        redirect(`/concepts/d/${domainId}`);
    };
    return (
        <Create mutationOptions={{ onSuccess }} transform={(data: any) => ({ ...data, domainId })}>
        <BackButton />
        <SimpleForm>
            <TextInput source="title" validate={[required()]} fullWidth />
        </SimpleForm>
    </Create>
    )
}
