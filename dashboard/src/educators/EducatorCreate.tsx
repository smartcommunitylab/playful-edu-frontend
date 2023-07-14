import { Create, SimpleForm, TextInput, required, useStore } from "react-admin"
import { DOMAIN_KEY } from "../constants";

export const EducatorCreate = () => {
    const [domainId] = useStore(DOMAIN_KEY);
    return (
        <Create redirect="list" transform={(data: any) => ({ ...data, domainId })}>
        <SimpleForm>
            <TextInput source="firstname" validate={[required()]} fullWidth label="resources.educator.firstname" />
            <TextInput source="lastName" multiline={true} label="resources.educator.lastname" />
            <TextInput source="email" label="resources.educator.email"/>
        </SimpleForm>
    </Create>
    )
}
