import { BooleanInput, Create, ReferenceArrayInput, SelectInput, SimpleForm, TextInput, required, useRecordContext, useStore } from "react-admin"
import { DOMAIN_KEY } from "../constants";

export const ActivityCreate = () => {
    const [domainId] = useStore(DOMAIN_KEY);
    const record = useRecordContext();
    // if (!record)
    //     return null;
    return (
        <Create redirect="list" transform={(data: any) => ({ ...data, domainId })}>
        <SimpleForm>
        <TextInput source="title" validate={[required()]} fullWidth />
        <TextInput source="desc" />
        <BooleanInput source="group" /> 
        <SelectInput source="type" choices={[
            { id: 'concrete', name: 'Concreta' },
             { id: 'abstract', name: 'Astratta' }
    ]} />
 {record.type && record.type == 'concrete' &&
                        <TextInput source="concrete" />
                    }
                     {record.type && record.type == 'abstract' &&
                        <TextInput source="abstract" />
                    }
         </SimpleForm>
    </Create>
    )
}