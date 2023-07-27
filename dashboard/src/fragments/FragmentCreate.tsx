import { Create, SimpleForm, TextInput, required } from "react-admin"
import { BackButton } from "@smartcommunitylab/ra-back-button";

export const FragmentCreate = () => {
    return (
        <Create redirect="list">
        <BackButton />
 <SimpleForm>
             <TextInput source="title" validate={[required()]} fullWidth />
        </SimpleForm>
    </Create>
    )
}
