import { BackButton } from "@smartcommunitylab/ra-back-button"
import { Create, SimpleForm, TextInput, required } from "react-admin"

export const DomainCreate = () => {
    return (
        <><Create redirect="list">
            <BackButton />
            <SimpleForm>
                <TextInput source="title" validate={[required()]} fullWidth />
            </SimpleForm>
        </Create></>
    )
}
