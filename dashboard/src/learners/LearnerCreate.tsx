import { Create, SimpleForm, TextInput, required, useRedirect, useStore } from "react-admin"
import { DOMAIN_URL_PARAM } from "../constants";
import { useParams } from 'react-router-dom';
import { BackButton } from "@dslab/ra-back-button";

export const LearnerCreate = () => {
    const params = useParams();
    const domainId =params.domainId;
    const redirect = useRedirect();
    const onSuccess = () => {
        redirect(`/learners/d/${domainId}`);
    };
    return (
        <Create mutationOptions={{ onSuccess }} transform={(data: any) => ({ ...data, domainId })}>
        <BackButton />
 <SimpleForm>
        <TextInput source="firstname" validate={[required()]} fullWidth label="resources.learner.firstname" />
            <TextInput source="lastname" multiline={true} label="resources.learner.lastname" />
            <TextInput source="email" type="email" label="resources.learner.email"/>
            <TextInput source="nickname"  label="resources.learner.nickname"/>

        </SimpleForm>
    </Create>
    )
}


