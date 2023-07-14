import { Create, ReferenceArrayInput, SimpleForm, TextInput, required, useStore } from "react-admin"
import { DOMAIN_KEY } from "../constants";

export const ExternalActivityCreate = () => {
    const [domainId] = useStore(DOMAIN_KEY);
    return (
        <Create redirect="list" transform={(data: any) => ({ ...data, domainId })}>
        <SimpleForm>
             <TextInput source="title" validate={[required()]} fullWidth />
            <TextInput source="desc" />
            <TextInput source="language" />
            <TextInput source="extUrl" />
            <TextInput source="type" />
            <TextInput source="tool" />
            <TextInput source="difficulty" />
            <ReferenceArrayInput source="preconditions" reference="concepts" queryOptions={{ meta: { domainId } }}/>
            <ReferenceArrayInput source="effects" reference="concepts" queryOptions={{ meta: { domainId } }} />
        </SimpleForm>
    </Create>
    )
}