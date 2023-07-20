import { Edit, SimpleForm, TextInput, required } from "react-admin"
import { DOMAIN_URL_PARAM } from "../constants";
import { useSearchParams } from 'react-router-dom';

export const LearnerEdit = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const domainId = searchParams.get(DOMAIN_URL_PARAM);

    return (
        <Edit transform={(data: any) => ({ ...data, domainId })}>
            <SimpleForm>
            <TextInput source="firstname" validate={[required()]} fullWidth label="resources.learner.firstname" />
            <TextInput source="lastname" multiline={true} label="resources.learner.lastname" />
            <TextInput source="email" label="resources.learner.email"/>
        </SimpleForm>
        </Edit>
    )
}
