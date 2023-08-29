import { BackButton } from "@dslab/ra-back-button"
import { Create, SimpleForm, TextInput, required, useTranslate } from "react-admin"

export const DomainCreate = () => {
    const translate = useTranslate();
    return (
        <><Create redirect="list" title={translate("titlePages.domains.create")}>
            <BackButton />
            <SimpleForm>
                <TextInput source="title" validate={[required()]} fullWidth />
            </SimpleForm>
        </Create></>
    )
}
