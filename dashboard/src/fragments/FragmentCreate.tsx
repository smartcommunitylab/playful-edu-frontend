import { Create, SimpleForm, TextInput, required } from "react-admin"

export const FragmentCreate = () => {
    return (
        <Create redirect="list">
        <SimpleForm>
             <TextInput source="title" validate={[required()]} fullWidth />
        </SimpleForm>
    </Create>
    )
}
