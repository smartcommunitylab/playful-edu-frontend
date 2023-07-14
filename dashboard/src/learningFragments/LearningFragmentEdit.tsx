import { Edit, SimpleForm, TextInput, required } from "react-admin"

export const LearningFragmentEdit = () => {
    return (
        <Edit>
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
