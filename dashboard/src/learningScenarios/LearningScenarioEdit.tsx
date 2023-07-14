import { Edit, ReferenceArrayInput, SimpleForm, TextInput, required, useStore } from "react-admin"
import { DOMAIN_KEY } from "../constants";

export const LearningScenarioEdit = () => {
    const [domainId] = useStore(DOMAIN_KEY);
    return (
        <Edit>
            <SimpleForm>
            <TextInput source="title" validate={[required()]} fullWidth />
            <TextInput source="description" />
            <TextInput source="language" />
            <ReferenceArrayInput source="educators" reference="educators" queryOptions={{ meta: { domainId } }}/>
            <ReferenceArrayInput source="learners" reference="learners" queryOptions={{ meta: { domainId } }}/>
        </SimpleForm>
        </Edit>
    )
}
