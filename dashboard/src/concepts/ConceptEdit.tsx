import { Edit, SimpleForm, TextInput, required, useStore } from "react-admin"
import { DOMAIN_KEY } from "../constants";

export const ConceptEdit = () => {
    const [domainId] = useStore(DOMAIN_KEY);

    return (
        <Edit  transform={(data: any) => ({ ...data, domainId })}>
            <SimpleForm>
            <TextInput source="title" validate={[required()]} fullWidth />
        </SimpleForm>
        </Edit>
    )
}
