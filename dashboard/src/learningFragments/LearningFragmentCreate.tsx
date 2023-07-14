import { Create, SimpleForm, TextInput, required } from "react-admin"

export const LearningFragmentCreate = () => {
    return (
        <Create redirect="list">
        <SimpleForm>
             <TextInput source="title" validate={[required()]} fullWidth />
            <TextInput source="description" />
            <TextInput source="type" />
            <TextInput source="language" />
            <TextInput source="tool" />
            <TextInput source="difficulty" />
        </SimpleForm>
    </Create>
    )
}
