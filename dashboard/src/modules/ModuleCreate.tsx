import { Create, DateInput, SimpleForm, TextInput, required, useStore } from "react-admin"
import { SCENARIO_URL_PARAM, DOMAIN_URL_PARAM } from "../constants";
import { useSearchParams } from 'react-router-dom';
import { BackButton } from "@smartcommunitylab/ra-back-button";

export const ModuleCreate = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const domainId = searchParams.get(DOMAIN_URL_PARAM);
    const scenarioId = searchParams.get(SCENARIO_URL_PARAM);

    return (
        <Create redirect="list" transform={(data: any) => ({ ...data, domainId, scenarioId})}>
        <BackButton />
 <SimpleForm>
             <TextInput source="title" validate={[required()]} fullWidth />
            <TextInput source="desc" />
            <TextInput source="level" />
            <DateInput source="dateFrom" />
            <DateInput source="dateTo" />
        </SimpleForm>
    </Create>
    )
}
