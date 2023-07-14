import { Create, DateInput, SimpleForm, TextInput, required, useStore } from "react-admin"
import { SCENARIO_KEY,DOMAIN_KEY } from "../constants";

export const ModuleCreate = () => {
    const [scenarioId] = useStore(SCENARIO_KEY);
    const [domainId] = useStore(DOMAIN_KEY);

    return (
        <Create redirect="list" transform={(data: any) => ({ ...data, domainId,scenarioId })}>
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
