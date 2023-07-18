import { Create, ReferenceArrayInput, SimpleForm, TextInput, required, useStore } from "react-admin"
import { DOMAIN_KEY } from "../constants";

export const ActivityCreate = () => {
    const [domainId] = useStore(DOMAIN_KEY);
    return (
        <Create redirect="list" transform={(data: any) => ({ ...data, domainId })}>
        <SimpleForm>
            <ReferenceArrayInput source="activity" reference="activity" queryOptions={{ meta: { domainId } }}/>
        </SimpleForm>
    </Create>
    )
}