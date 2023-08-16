import { Create, SimpleForm, TextInput, required, useRedirect, useStore } from "react-admin"
import { DOMAIN_URL_PARAM } from "../constants";
import { useParams } from 'react-router-dom';
import { BackButton } from "@smartcommunitylab/ra-back-button";

export const EducatorCreate = () => {
    const params = useParams();
    const redirect = useRedirect();
    const onSuccess = () => {
        redirect(`/educators/d/${params.domainId}`);
    };
    return (
        <Create mutationOptions={{ onSuccess }} transform={(data: any) => ({ ...data, domainId:params.domainId })}>
        <BackButton />
 <SimpleForm>
            <TextInput source="firstname" validate={[required()]} fullWidth label="resources.educator.firstname" />
            <TextInput source="lastname" multiline={true} label="resources.educator.lastname" />
            <TextInput source="email"  type="email" label="resources.educator.email"/>
            <TextInput source="nickname"  label="resources.educator.nickname"/>

        </SimpleForm>
    </Create>
    )
}
