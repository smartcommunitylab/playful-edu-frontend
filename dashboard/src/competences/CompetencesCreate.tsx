import { Create, ReferenceArrayInput, SimpleForm, TextInput, required, useStore } from "react-admin"
import { DOMAIN_KEY } from "../constants";

export const CompetencesCreate = () => {
    const [domainId] = useStore(DOMAIN_KEY);
    return (
        <Create redirect="list" transform={(data: any) => ({ ...data, domainId })}>
        <SimpleForm>
        <TextInput source="title" label="resources.competence.title" validate={[required()]} fullWidth />
        <TextInput source="desc" label="resources.competence.description" />
        {/* <TextInput source="type" /> */}
         <ReferenceArrayInput source="concepts" reference="concepts"  queryOptions={{ meta: { domainId } }}/>
        </SimpleForm>
    </Create>
    )
}
