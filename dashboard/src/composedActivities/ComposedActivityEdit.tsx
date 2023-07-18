import { Edit, ReferenceArrayInput, SimpleForm, TextInput, required, useStore } from "react-admin"
import { DOMAIN_KEY } from "../constants";

export const ComposedActivityEdit = () => {
    const [domainId] = useStore(DOMAIN_KEY);

    return (
        <Edit transform={(data: any) => ({ ...data, domainId })}>
            <SimpleForm>
            <ReferenceArrayInput source="activity" reference="activity" queryOptions={{ meta: { domainId } }}/>
        </SimpleForm>
        </Edit>
    )
}
