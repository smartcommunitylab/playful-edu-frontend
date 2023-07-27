import { Create, SimpleForm, TextInput, required, useStore } from "react-admin"
import { DOMAIN_URL_PARAM } from "../constants";
import { useSearchParams } from 'react-router-dom';
import { BackButton } from "@smartcommunitylab/ra-back-button";

export const EducatorCreate = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const domainId = searchParams.get(DOMAIN_URL_PARAM);
    return (
        <Create redirect="list" transform={(data: any) => ({ ...data, domainId })}>
        <BackButton />
 <SimpleForm>
            <TextInput source="firstname" validate={[required()]} fullWidth label="resources.educator.firstname" />
            <TextInput source="lastname" multiline={true} label="resources.educator.lastname" />
            <TextInput source="email" label="resources.educator.email"/>
        </SimpleForm>
    </Create>
    )
}
