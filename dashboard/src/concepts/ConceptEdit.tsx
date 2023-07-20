import { Edit, SimpleForm, TextInput, required, useStore } from "react-admin"
import { useSearchParams } from 'react-router-dom';
import { DOMAIN_URL_PARAM } from "../constants";

export const ConceptEdit = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const domainId = searchParams.get(DOMAIN_URL_PARAM);
    return (
        <Edit  transform={(data: any) => ({ ...data, domainId })}>
            <SimpleForm>
            <TextInput source="title" validate={[required()]} fullWidth />
        </SimpleForm>
        </Edit>
    )
}
