import { BackButton } from "@dslab/ra-back-button"
import { Edit, SimpleForm, TextInput, TopToolbar, required, useTranslate } from "react-admin"


const PostCreateActions = () => (
    <TopToolbar>
        <BackButton />
    </TopToolbar>
);
export const DomainEdit = () => {
    const translate = useTranslate();
    return (
        <><Edit actions={<PostCreateActions />} title={translate("titlePages.domains.edit")}>
            <SimpleForm>
                <TextInput source="title" validate={[required()]} fullWidth />
            </SimpleForm>
        </Edit></>
    )
}
