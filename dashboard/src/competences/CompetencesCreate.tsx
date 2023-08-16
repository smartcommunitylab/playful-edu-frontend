import { Create, ReferenceArrayInput, SelectInput, SimpleForm, TextInput, required, useRedirect, useStore, useTranslate } from "react-admin"
import {  DOMAIN_URL_PARAM } from "../constants";
import { useParams } from "react-router-dom";
import { BackButton } from "@smartcommunitylab/ra-back-button";

export const CompetencesCreate = () => {
    const params = useParams();
    const redirect = useRedirect();
    const translate = useTranslate();
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
            { id: "knowledge", name: translate(
                "resources.competence.knowledgeSelection.knowledge"
              )},
            
          ]}
        />  
         <ReferenceArrayInput source="concepts" reference="concepts"  queryOptions={{ meta: { domainId } }}/>
        </SimpleForm>
    </Create>
    )
}
