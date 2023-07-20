import { Create, SimpleForm, TextInput, required, useStore } from "react-admin"
import { DOMAIN_URL_PARAM } from "../constants";
import { useSearchParams } from 'react-router-dom';

export const ConceptCreate = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const domainId = searchParams.get(DOMAIN_URL_PARAM);
    return (
        <Create redirect="list"  transform={(data: any) => ({ ...data, domainId })}>
        <SimpleForm>
            <TextInput source="title" validate={[required()]} fullWidth />
        </SimpleForm>
    </Create>
    )
}
