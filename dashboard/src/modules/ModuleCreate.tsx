import { Create, DateInput, SimpleForm, TextInput, required, useRedirect, useStore } from "react-admin"
import { SCENARIO_URL_PARAM, DOMAIN_URL_PARAM } from "../constants";
import { useParams } from 'react-router-dom';
import { BackButton } from "@dslab/ra-back-button";

export const ModuleCreate = () => {
    const params = useParams();
    const domainId =params.domainId;
    const learningScenarioId = params.learningScenarioId;
    const redirect = useRedirect();
    const onSuccess = () => {
        redirect(`/modules/d/${domainId}/s/${learningScenarioId}`);
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
