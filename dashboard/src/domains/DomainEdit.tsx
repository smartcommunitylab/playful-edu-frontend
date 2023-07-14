import { BackButton } from "@smartcommunitylab/ra-back-button"
import { Edit, SimpleForm, TextInput, TopToolbar, required } from "react-admin"


const PostCreateActions = () => (
    <TopToolbar>
        <BackButton />
    </TopToolbar>
);
export const DomainEdit = () => {
    return (
        <><Edit actions={<PostCreateActions />}>
            <SimpleForm>
                <TextInput source="title" validate={[required()]} fullWidth />
            </SimpleForm>
        </Edit></>
    )
}
