import { Edit, SimpleForm, TextInput, required } from "react-admin"

export const EducatorEdit = () => {
    return (
        <Edit>
            <SimpleForm>
            <TextInput source="firstname" validate={[required()]} fullWidth label="resources.educator.firstname" />
            <TextInput source="lastName" multiline={true} label="resources.educator.lastname" />
            <TextInput source="email" label="resources.educator.email"/>
        </SimpleForm>
        </Edit>
    )
}
