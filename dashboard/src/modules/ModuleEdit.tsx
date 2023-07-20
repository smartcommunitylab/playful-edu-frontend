import { Edit, SimpleForm, TextInput, required } from "react-admin"
import { useSearchParams } from 'react-router-dom';
import { DOMAIN_URL_PARAM, SCENARIO_URL_PARAM } from "../constants";

export const ModuleEdit = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const domainId = searchParams.get(DOMAIN_URL_PARAM);
    const scenarioId = searchParams.get(SCENARIO_URL_PARAM);

    return (
        <Edit transform={(data: any) => ({ ...data, domainId, scenarioId})}>
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
