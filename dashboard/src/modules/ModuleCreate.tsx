import { Create, DateInput, SimpleForm, TextInput, required, useRedirect, useStore } from "react-admin"
import { SCENARIO_URL_PARAM, DOMAIN_URL_PARAM } from "../constants";
import { useSearchParams } from 'react-router-dom';
import { BackButton } from "@smartcommunitylab/ra-back-button";

export const ModuleCreate = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const domainId = searchParams.get(DOMAIN_URL_PARAM);
    const learningScenarioId = searchParams.get(SCENARIO_URL_PARAM);
    const redirect = useRedirect();
    const onSuccess = () => {
        redirect(`/modules?${DOMAIN_URL_PARAM}=${domainId}&${SCENARIO_URL_PARAM}=${learningScenarioId}`);
    };
    return (
        <Create mutationOptions={{ onSuccess }} transform={(data: any) => ({ ...data, domainId, learningScenarioId})}>
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
