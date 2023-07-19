import { BooleanInput, Edit, FormDataConsumer, ReferenceArrayInput, SelectInput, SimpleForm, TextInput, required, useRecordContext, useStore } from "react-admin"
import { DOMAIN_KEY } from "../constants";

export const ActivityEdit = () => {
    const [domainId] = useStore(DOMAIN_KEY);

    return (
        <Edit>
            <SimpleForm>
            <TextInput source="title" validate={[required()]} fullWidth />
            <TextInput source="desc" />
            <BooleanInput source="group" />
            <SelectInput source="type" choices={[
            { id: 'concrete', name: 'Concreta' },
             { id: 'abstract', name: 'Astratta' }
    ]} />
    <FormDataConsumer>
    {({ formData, ...rest }) => {
        if (formData.type && formData.type == 'concrete' )
        return <ReferenceArrayInput source="concepts" reference="concepts"  queryOptions={{ meta: { domainId } }} />
         else  return  <ReferenceArrayInput source="external-activities" reference="external-activities"  queryOptions={{ meta: { domainId } }} />
    }
                 }

             </FormDataConsumer>
        </SimpleForm>
        </Edit>
    )
}
