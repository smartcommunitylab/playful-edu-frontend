import { Create, ReferenceArrayInput, SelectInput, SimpleForm, TextInput, required, useRedirect, useStore } from "react-admin"
import {  DOMAIN_URL_PARAM } from "../constants";
import { useParams } from "react-router-dom";
import { BackButton } from "@smartcommunitylab/ra-back-button";

export const CompetencesCreate = () => {
    const params = useParams();
    const redirect = useRedirect();
    const domainId=params.domainId;
    const onSuccess = () => {
        redirect(`/competences/d/${domainId}`);
    };
    return (
        <Create mutationOptions={{ onSuccess }} transform={(data: any) => ({ ...data, domainId })}>
        <BackButton />
 <SimpleForm>
        <TextInput source="title" label="resources.competence.title" validate={[required()]} fullWidth />
        <TextInput source="desc" label="resources.competence.description" />
        <SelectInput
          source="type"
          choices={[
            { id: "knowledge", name: "Conoscenza" },
            { id: "knowledge2", name: "Conoscenza2" },
            { id: "knowledge3", name: "Conoscenza3" },
          ]}
        />    
         <ReferenceArrayInput source="concepts" reference="concepts"  queryOptions={{ meta: { domainId } }}/>
        </SimpleForm>
    </Create>
    )
}
