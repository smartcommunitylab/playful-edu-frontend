import { Edit, SimpleForm, TextInput, required } from "react-admin"

export const LearnerEdit = () => {
    return (
        <Edit>
            <SimpleForm>
            <TextInput source="firstname" validate={[required()]} fullWidth label="resources.learner.firstname" />
            <TextInput source="lastname" multiline={true} label="resources.learner.lastname" />
            <TextInput source="email" label="resources.learner.email"/>
        </SimpleForm>
        </Edit>
    )
}
