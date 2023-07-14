import { Edit, SimpleForm, TextInput, required } from "react-admin"

export const LearningScenarioEdit = () => {
    return (
        <Edit>
            <SimpleForm>
            <TextInput source="title" validate={[required()]} fullWidth />
            <TextInput source="description" />
            <TextInput source="language" />
        </SimpleForm>
        </Edit>
    )
}
