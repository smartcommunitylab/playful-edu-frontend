import { Edit, SimpleForm, TextInput, required } from "react-admin"
import { DOMAIN_URL_PARAM } from "../constants";
import { useSearchParams } from 'react-router-dom';

export const EducatorEdit = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const domainId = searchParams.get(DOMAIN_URL_PARAM);
    return (
        <Edit transform={(data: any) => ({ ...data, domainId })}>
            <SimpleForm>
            <TextInput source="firstname" validate={[required()]} fullWidth label="resources.educator.firstname" />
            <TextInput source="lastname" multiline={true} label="resources.educator.lastname" />
            <TextInput source="email" label="resources.educator.email"/>
        </SimpleForm>
        </Edit>
    )
}
