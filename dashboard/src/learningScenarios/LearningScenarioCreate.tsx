import { Create, ReferenceArrayInput, SimpleForm, TextInput, required, useStore } from "react-admin"
import { DOMAIN_KEY } from "../constants";

export const LearningScenarioCreate = () => {
    const [domainId] = useStore(DOMAIN_KEY);
    return (
        <Create redirect="list">
        <SimpleForm>
            <TextInput source="title" validate={[required()]} fullWidth />
            <TextInput source="description" />
            <TextInput source="language" />
            <ReferenceArrayInput source="educators" reference="educators" queryOptions={{ meta: { domainId } }}/>
            <ReferenceArrayInput source="learners" reference="learners" queryOptions={{ meta: { domainId } }}/>
        </SimpleForm>
    </Create>
    )
}
