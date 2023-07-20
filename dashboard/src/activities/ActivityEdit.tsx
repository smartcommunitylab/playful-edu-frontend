import { BooleanInput, Edit, FormDataConsumer, ReferenceArrayInput, SelectInput, SimpleForm, TextInput, required } from "react-admin"
import { useSearchParams } from "react-router-dom";
import { DOMAIN_URL_PARAM } from "../constants";

export const ActivityEdit = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const domainId = searchParams.get(DOMAIN_URL_PARAM);

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
