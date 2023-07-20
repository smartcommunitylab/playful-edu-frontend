import { Edit, SimpleForm, TextInput, required } from "react-admin"
import { DOMAIN_URL_PARAM } from "../constants";
import { useSearchParams } from 'react-router-dom';

export const ExternalActivityEdit = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const domainId = searchParams.get(DOMAIN_URL_PARAM);
    return (
        <Edit transform={(data: any) => ({ ...data, domainId })}>
            <SimpleForm>
            <TextInput source="title" validate={[required()]} fullWidth />
            <TextInput source="description" />
            <TextInput source="type" />
            <TextInput source="language" />
            <TextInput source="tool" />
            <TextInput source="difficulty" />
        </SimpleForm>
        </Edit>
    )
}
