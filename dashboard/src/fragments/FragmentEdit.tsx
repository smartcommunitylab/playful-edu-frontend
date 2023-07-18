import { Edit, ReferenceArrayInput, SimpleForm, TextInput, required } from "react-admin"

export const FragmentEdit = () => {
    return (
        <Edit>
            <SimpleForm>
            <TextInput source="title" validate={[required()]} fullWidth />
            <ReferenceArrayInput label="ComposedActivity" reference="composedActivity" source="composedActivity" />
        </SimpleForm>
        </Edit>
    )
}
