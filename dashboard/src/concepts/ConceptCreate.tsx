import { Create, SimpleForm, TextInput, required, useStore } from "react-admin"
import { DOMAIN_KEY } from "../constants";

export const ConceptCreate = () => {
    const [domainId] = useStore(DOMAIN_KEY);

    return (
        <Create redirect="list"  transform={(data: any) => ({ ...data, domainId })}>
        <SimpleForm>
            <TextInput source="title" validate={[required()]} fullWidth />
        </SimpleForm>
    </Create>
    )
}
